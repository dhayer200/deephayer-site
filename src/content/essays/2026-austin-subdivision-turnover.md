---
title: Finding Austin neighborhoods where homeowners actually move
date: 2026-06-09
tags: [real-estate, austin, data, python, census]
description: I built a pipeline to rank every Austin-metro subdivision by how often its residents actually sell and leave — not builders flipping new product, but real homeowner churn. 6,300 subdivisions, two CAD rolls, 33,000 MLS sales, and a Census median age cross-map. Here is what it found.
---

This post is the written-up version of a pipeline I built for my work at Rivet Real Estate. The business question was simple: which Austin-metro subdivisions have the highest rate of homeowners selling and moving on? Not builders selling new inventory — actual resident turnover. The kind that signals motivated sellers, lifestyle transitions, estate activity, and relocation churn.

It turned out that answering that question cleanly required fixing a measurement problem most off-the-shelf tools do not bother to fix.

## The measurement problem

The naive version of turnover is: homes sold in the last six months divided by total homes in the subdivision. That number is poisoned by new construction.

Take a subdivision with 100 existing homes and 50 new ones that a builder just finished. If 15 of those new homes sold in the last six months (new construction moves fast), raw turnover reads 15/150 = 10%. That looks like a hot market. But the original 100 homeowners may have sold nothing. The 10% is entirely builder absorption, not resident churn.

The fix is to filter both sides of the fraction. Count only homes built before 2025 in the denominator. Count only sales of homes built before 2025 in the numerator. The result is a turnover rate that measures how fast the pre-existing neighborhood is cycling, independent of whatever a builder is doing down the street.

This required extracting year-built data from both county appraisal rolls — Travis CAD's `IMP_DET.TXT` (1.9 GB fixed-width file, byte positions 85–89) and Williamson CAD's segment export — and joining it to both the inventory denominator and the sales numerator before computing any rates.

After that filter, 635 subdivisions that looked high-turnover on raw data dropped off the list. New-build absorption accounted for most of the apparent signal in those cases.

## The pipeline

The data comes from three sources:

**Travis and Williamson CAD appraisal rolls** — the denominator. Both counties publish annual property data exports. Parsed to SFR, deduped by parcel ID, normalized subdivision names, extracted year-built per parcel.

**Rentcast MLS API** — the numerator. Sold listings pulled by ZIP code for Travis and Williamson county ZIPs. Each sold listing gets matched back to a CAD subdivision by address, then by fuzzy subdivision name, then flagged unmatched. 62% of 33,000 listings matched cleanly. The unmatched 38% are mostly condos, townhomes, rural parcels with no subdivision, and a long tail of addresses the CAD rolls don't recognize.

**Census geocoder + ACS 2023 5-year** — the age cross-map. Every subdivision gets a centroid from the mean lat/lng of its matched listings. That centroid goes through the Census geocoder to get a Census tract GEOID, and the tract's median age comes from ACS variable B01002_001E. No API key needed for the geocoder; the ACS fetch uses a free Census key and one HTTP call per county.

Matching 6,300 subdivision centroids to Census tracts took about four minutes in parallel with 15 threads. The tract-level median age is an approximation — a large Census tract can contain multiple demographically distinct subdivisions — but it is the best public-data proxy available at this geography without buying a supplemental data license.

![Age heatmap — Austin metro subdivisions colored by Census tract median age (green = young, purple = old)](/images/age-heatmap.png)

## What the rankings show

After applying a 50-home minimum on pre-2025 inventory (small denominators make turnover rates statistically unreliable), the top of the ranked list splits into two patterns:

**Older established neighborhoods with genuine churn.** These are subdivisions built in the 1970s through 1990s where the original homeowners are now in their 60s and 70s. Life transitions — downsizing, estate sales, retirement moves — drive consistent turnover. Six-month pre-2025 rates in the 7–14% range. These are the subdivisions the age cross-map was built to identify.

**Newer subdivisions with small pre-2025 denominators.** A subdivision built mostly in 2022–2023 with 60 pre-2025 homes and 5 sales in six months shows 8.3% turnover, but you are looking at noise from a small sample. The inflation flag catches the worst of these (turnover_delta ≥ 2%, pre-2025 share < 75%), but denominator size is the root problem. The correct filter is pre-2025 homes ≥ 50, not total homes ≥ 50.

The age cross-map found 8 subdivisions that combine high turnover (≥5% 6-month, pre-2025) with a Census tract median age of 55 or older and at least 50 pre-2025 homes. Those 8 are the clearest signal in the dataset: neighborhoods where the population is aging, residents are selling at above-average rates, and the inventory pool is large enough to trust the denominator.

![5%+ turnover pins — 188 subdivisions with pre-2025 6-month turnover at or above 5%](/images/turnover-pins.png)

## The surprise

The inflation flag caught more than expected. Of the ~3,950 subdivisions with 50+ total homes, 635 had new-construction inflation flags — either a large gap between all-homes and pre-2025 turnover, or fewer than 75% of homes being pre-2025 vintage. That is about 16% of the analyzed universe where raw turnover would have misled a target list.

The geographic pattern was predictable: Georgetown, Liberty Hill, Hutto, Kyle, and Buda — the fast-growth outer ring — dominate the flagged list. Central Austin and South Austin subdivisions are almost entirely clean.

![Overlay — age heatmap base with 5%+ turnover pins on top](/images/turnover-age-overlay.png)

## What I would improve

The minimum subdivision size filter needs to switch from total homes to pre-2025 homes. Right now a subdivision with 55 total homes (40 pre-2025, 15 new) passes the filter but has a denominator of 40, which makes a single sale worth 2.5%. That is a fixable one-line change that would clean up the top of the rankings.

I would also add a sold count floor — probably 3 or more sales in the window — because even with a 50-home denominator, 1 or 2 sales is too thin to rank on.

On the Census age side, the tract approximation is the honest limitation. The right data would be ACS block-group estimates, which get you to a tighter geography, but block groups are noisier at the 5-year ACS because of smaller sample sizes. Tract is the right tradeoff for this use case.

A v2 would add permit data from Travis and Williamson county permit APIs to get a forward-looking view of where new construction is still absorbing, so we can flag not just current inflation but upcoming inflation before it hits the CAD roll.

If you work in residential acquisitions, wholesaling, or any market where finding motivated sellers before they list matters, the underlying question this pipeline answers — where are homeowners actually moving on — is worth the engineering. Contact info on [about](/about).
