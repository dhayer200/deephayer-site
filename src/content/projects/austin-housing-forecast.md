---
title: Austin Housing Five-Year Forecast
summary: A LASSO model on 20 years of Austin and Texas housing data with three rate-path scenarios out to 2031.
year: "2026"
status: shipped
order: 1
stack: [Python, pandas, scikit-learn, FRED API, Zillow ZHVI, Typst]
links:
  paper: https://deephayer.com/papers/austin-housing-forecast.pdf
tags: [real-estate, austin, texas, forecasting, lasso]
---

A 20-year history and 5-year forecast of Austin and Texas housing prices, built to send to Austin commercial real estate firms and family offices before cold outreach. LASSO regression with walk-forward cross-validation on 85 quarters of FRED macro data and Zillow ZHVI submarket indices, with three rate-path scenarios over a 20-quarter horizon.

## Latest

Caught and corrected an autoregressive leakage that dropped out-of-sample R squared from 0.75 to 0.25. The corrected model has 69 percent directional accuracy on holdout. Companion essay at [/essays/2026-austin-housing-deep-dive](/essays/2026-austin-housing-deep-dive).

## Status

Shipped. The honest finding is that no single point estimate matters as much as the scenario fan: in the rates-stay-high case, real Austin prices are flat to down 5 percent through 2031; in the rates-cut case, up 15 to 20 percent. The conversation should be about how each scenario flows through housing, not whether the Fed cuts.
