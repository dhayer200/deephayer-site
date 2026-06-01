---
title: ERCOT Battery Storage Backtest
summary: Four years of ERCOT day-ahead prices, a Powerwall-class battery, and a perfect-foresight LP versus a simple sort-based heuristic.
year: "2026"
status: shipped
order: 2
stack: [Python, scipy HiGHS, pandas, ERCOT public data, Typst]
links:
  paper: https://deephayer.com/papers/ercot-battery-backtest.pdf
tags: [energy, ercot, batteries, optimization, lp]
---

A backtest of a Powerwall-class residential battery across five ERCOT load zones from 2022 through 2025. Compares a perfect-foresight linear program (scipy HiGHS) against a sort-based dispatch heuristic on the day-ahead market.

## Latest

The heuristic captures 93 to 97 percent of LP revenue on DAM across all five zones and all four years. The 3 to 7 percent gap is the entire economic value of perfect price forecasting on this market, which is much smaller than I expected. The real edge lives in real-time and ancillary services, not day-ahead. Companion essay at [/essays/2026-ercot-battery-backtest](/essays/2026-ercot-battery-backtest).

## Status

Shipped. The honest finding is that on ERCOT DAM, a battery operator does not need a forecasting model; they need an execution model.
