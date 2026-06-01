---
title: A Powerwall on ERCOT, four years in
date: 2026-05-29
tags: [energy, ercot, batteries, optimization]
description: "Four years of ERCOT day-ahead prices, a Powerwall-class battery, two dispatch strategies. Perfect-foresight optimization beats a sort-the-prices heuristic by 3 to 7 percent. The surprise is how small that gap is, and what it implies about where the real money lives."
---

This post is the short version of [a paper](/papers/ercot-battery-backtest.pdf) I wrote because I wanted to understand how a residential battery actually makes money on ERCOT before I cold-emailed [Base Power](https://basepowercompany.com) about an internship.

## The setup

ERCOT is the most volatile and most actively traded electricity market in the United States. It has more wind and solar than almost any other grid in the world, no formal capacity market, and a recurring habit of extreme price events: Winter Storm Uri in 2021, the Heat Dome in 2023, and a string of near-misses since. That volatility is what makes the residential battery thesis interesting in principle.

Base Power is the most visible Texas-based bet on that thesis. They install batteries in homes, aggregate the fleet into a virtual power plant, and earn from energy arbitrage, ancillary service awards, and capacity availability payments. I wanted to isolate the simplest of those revenue lines, energy arbitrage on the day-ahead market, and see what one Powerwall actually earns under two strategies:

1. **Perfect-foresight LP.** Solve a linear program over each day's prices for the optimal charge and discharge schedule. This is the theoretical upper bound.
2. **Naive heuristic.** Charge during the three cheapest hours of the day, discharge during the three most expensive. No math beyond sorting.

The data is four years of hourly day-ahead settlement point prices (2022 through 2025) across five ERCOT load zones, including LZ_AEN for Austin Energy customers.

## What I found

Across four years and five zones, the LP earns between \$474 and \$583 per battery per year on average. 2023 was the standout year by a factor of two to three (Houston, Austin, Dallas, San Antonio all printed \$800-plus per Powerwall) because the summer heat dome generated repeated \$1,000+ per MWh hours. 2024 and 2025 settled back into a more boring \$240-\$440 range as weather normalized and reserve margins improved.

Across zones, LZ_WEST (West Texas wind country) topped the list slightly, with LZ_AEN a close second. The geographic story is wind. West Texas is where most ERCOT wind capacity lives, and wind's intermittency combined with congestion to load centers makes hour-to-hour price swings larger out there. Larger swings mean more arbitrage spread.

## The surprise

The headline finding is not in the absolute numbers. It is in the gap between the LP and the heuristic.

The naive heuristic captures 93 to 97 percent of the LP's revenue. Every zone. Every year. In 2023, when prices were highest, the gap narrowed to under 1 percent because the extreme spikes made the right hours obvious. In the calmer 2024-2025 years it widened slightly, but never above 7 percent.

This is uncomfortable if you came in expecting that running a fancy optimization model would matter on the day-ahead market. The reason it does not is structural. The day-ahead market clears at 13:30 the day before delivery. By the time you are dispatching, tomorrow's hourly price vector is already known. The problem of "which hours should I charge and discharge tomorrow" is nearly-solved by sorting that vector. There is no hidden information to forecast. The LP has access to nothing the heuristic does not.

## So where is the value?

Three places, none of which a single Powerwall on the day-ahead market can capture.

1. **Real-time market dispatch.** ERCOT also settles every 5 minutes in real time. Those prices are much more volatile than day-ahead, and they are not known when you dispatch. There the forecasting and optimization problem is genuinely hard, and the gap between a smart controller and a naive rule is much larger than 7 percent.

2. **Ancillary services.** ERCOT pays separately for capacity reserved to respond to contingencies (ECRS, RRS, Non-Spin). Awarded batteries earn capacity payments whether or not they deploy. As of 2025, AS revenue is the dominant share of revenue for utility-scale BESS in ERCOT, and it is a real piece of the residential aggregation pie too.

3. **Aggregation.** A single Powerwall is too small to clear most ERCOT market thresholds. The interesting unit is thousands of homes treated as a single dispatchable resource, which is exactly the structure a company like Base Power operates.

The honest read is that day-ahead arbitrage on a single residential battery is a marginal business: \$500 a year against a \$10,000-\$11,500 installed cost is a 20-year payback. That is the floor of the residential battery thesis. The ceiling is much higher, and it sits in real-time dispatch, AS markets, and the math of running a fleet.

## What I would do next

A v2 of this paper would add three things:

- Real-time 5-minute price backtest with a rolling-forecast controller. This is where the actual forecasting value should show up.
- ECRS and RRS award modeling. Treat the battery as bidding into both energy and reserves and let the market clear.
- Capacity fade and round-trip efficiency drift over a multi-year horizon. Real Powerwalls lose 1 to 2 percent of usable capacity per year. Pretending they do not is dishonest at the 10-year time scale operators actually care about.

If you work in residential battery aggregation, BESS operations, or ERCOT market structure, I would love to talk about any of this. Contact info on [about](/about).
