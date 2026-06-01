---
title: Austin and Texas housing, 20 year history and 5 year forecast
date: 2026-05-29
tags: [real-estate, austin, texas, forecasting]
description: "A LASSO model on 20 years of Austin housing data, three rate-path scenarios out to 2031, and what each one means for homebuyers, small investors, and institutional allocators."
---

This post is the short version of a paper I wrote because I was about to send cold emails to a long list of Austin commercial real estate firms and family offices and I did not want to send them my opinion on the housing market without doing the work first. The full PDF lives [here](/papers/austin-housing-forecast.pdf).

## What I wanted to know

Three questions, in order:

1. What has actually happened to Austin home prices over the last 20 years, and how does that compare to the rest of Texas and the national index?
2. What does a reasonable statistical model say about the next five years?
3. What should that imply for an actual decision: buying a house, buying a small rental, or allocating institutional capital?

The third question is the one most of the public commentary skips. A forecast that does not tell you what to do with it is a forecast that lets the writer off the hook. I wanted to write the version that does not.

## What 20 years of data show

From 2005 to 2026 the Austin FHFA housing price index rose 3.2x. Texas as a whole rose 2.7x. The national Case-Shiller index rose 2.0x. Three regime shifts are visible in the series.

First, 2008. Austin declined less than the national average and recovered faster. The reason is unglamorous: Texas never had the speculative inventory build of Arizona, Nevada, or Florida, so it had less to give back.

Second, 2020. The pandemic-migration wave pushed Austin to the largest year-over-year HPI gain in its recorded history. This is the period that distorts every chart and every memory. It was not normal and is not a reasonable planning baseline.

Third, 2022. The first sustained year-over-year decline since 2009. Austin softened more than the rest of Texas because Austin had risen more than the rest of Texas. The mechanism was not a demand collapse but a payment shock: 7% mortgages priced out the marginal buyer at the price tiers that had been driving the index higher.

Houston, DFW, and San Antonio tell the same macro story in muted form. Houston tracks the national index more closely than Austin does, because its permissive land use absorbs population shocks into quantity rather than price. Austin's tighter land use pushes the same shocks into price. This matters for the forecast.

## What the model says

The model is a LASSO regression on 15 standardized features built from FRED macro series and Zillow lags. The target is quarter-over-quarter percent change in the Austin FHFA HPI. The reason for LASSO over OLS is honesty: with this many candidate features and this few observations, OLS will fit the noise. LASSO forces sparsity and lets the data choose which features matter.

Only three features survive the cross-validated regularization:

- The lag-1 Austin HPI quarterly change (positive). Prices have momentum on quarterly horizons.
- The national Case-Shiller year-over-year change (positive). National trend pulls Austin partly along.
- The 30 year mortgage rate level (negative). Higher rates compress prices.

The features that drop out are also informative. Real disposable income growth, housing starts, building permits, Austin unemployment, and Texas state HPI all fall away. That is partly a statement about LASSO's preference for sparsity, but it is mostly a statement that, at quarterly horizons, the Austin cycle is dominated by its own momentum, the national housing trend, and the mortgage rate level.

Out-of-sample R² from walk-forward cross validation is 0.25. Directional accuracy is 69% across 45 holdout quarters. The R² is modest. The directional accuracy is the more useful number for actual decisions: knowing whether the next quarter is up or down is most of what a buyer needs.

## Three rate-path scenarios

I rolled the model forward 20 quarters under three scenarios that bracket the range of plausible Fed policy outcomes:

- **Base case.** 30 year mortgage drifts to 6.0%, fed funds to 3.25%, unemployment stable. Austin HPI annualizes 2.7% (cumulative +14.0%).
- **Rates stay high.** 30 year mortgage stays at 7.0%, fed funds 4.5%+, unemployment ticks up. Austin HPI annualizes 1.9% (cumulative +9.9%).
- **Rates cut.** 30 year mortgage falls to 5.0%, fed funds 2.0%, unemployment stable. Austin HPI annualizes 3.4% (cumulative +18.2%).

The fan is narrower than people expect. The reason is that the autoregressive term and the Austin unemployment term both anchor the forecast to recent conditions, and recent conditions are flat-to-slightly-positive. The model has to see a big macro move to forecast a big housing move.

## What to actually do

### If you are buying a house

The base case is positive but unremarkable. If you are buying now, the asymmetric trade is rate optionality: refi if the rates-cut scenario materializes, hold otherwise. Do not stretch the budget on the assumption of rapid appreciation. 2020 to 2022 was the exception, not the rule.

### If you are a small private investor

The flat-to-slightly-positive base case is the wrong environment for appreciation bets. It is the right environment for cash flow. Submarkets with stable rent growth and modest price levels (parts of the eastern crescent, selected San Antonio submarkets, north Houston) offer better risk-adjusted returns than chasing the Austin index. Wholesaling gets harder, not easier: less volatility means fewer distressed sellers and tighter acquisition spreads.

### If you are a family office or institutional allocator

The interesting trade is the convergence between Austin and the rest of Texas. The Austin / Houston Zillow ratio has compressed from a 2022 peak of 1.84 to a current 1.40, a 44 percentage point compression. If the structural Austin premium is intact, this is a setup for selective Austin buying. If the premium has permanently compressed, Houston and Dallas are the better risk-adjusted plays. The decision rests on two observables: net migration into Austin reaccelerating in 2026-2027, and the major tech employers maintaining their Austin headcount commitments. Both are trackable in close to real time.

## What I would do differently next time

A few things I would change in a v2:

- Add submarket-level Austin data. The FHFA series is metro-wide; a serious investor cares about a zip-code-level view.
- Pull rent data alongside price data. The interesting investment question is not just appreciation but cash flow.
- Test a second model class (VAR or ARIMA) and see whether the surviving features are stable across specifications. That is the cheapest robustness check available.

If you read this far and you work in Austin real estate, family office, or boutique IB, I would love to talk about it. My contact info is on the [about](/about) page.
