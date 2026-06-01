---
title: "College basketball: 2025-26 model postmortem"
date: 2026-05-10
description: What the model got right, what it got wrong, and what I am changing for next season.
tags: [sports, modeling, postmortem]
category: sports
project: chalkiq
status: published
---

The 2025-26 college basketball season ended in April. Here is what my model did and what I am rebuilding before next November.

## Headline numbers

- Calibration: Brier score 0.189 against actual outcomes (coin-flip baseline 0.250), log loss 0.556 (baseline 0.693). Meaningful improvement over random, evaluated across 1,672 games.
- CLV: mean -1.24% against closing lines, 44.9% beat-close rate across 1,559 tracked games. The model does not beat the closing line on average, consistent with market efficiency.
- Backtest ROI: +43.5% flat staking across 1,076 bets, 75.2% win rate. Walk-forward, in-sample. The live number will be lower.

## What the model got right

The early-season conference play period. Schools where the roster turnover is high (transfer portal heavy) were systematically mispriced for the first two weeks of conference play. The model caught most of that.

Late-game close-and-cover situations were also a small but real edge. The market underprices defensive teams that play slow in close games; the model picks them up.

## What it got wrong

NCAA tournament. The model treats tournament games as the regular season with a different schedule. They are not. The variance is higher, the rest-and-travel patterns are different, and the public bias is enormous. I lost 80 percent of my YTD CLV in the first weekend.

Player-prop integration was also a mistake. I added it midseason. It cannibalized attention from the moneyline work without adding measurable EV. Cutting it.

## What I am rebuilding for next year

- Separate tournament model with its own calibration. No shared assumptions with the regular season.
- Drop player props, at least until the moneyline model has another full season of clean CLV.
- Tighter transfer portal weighting in the early-season prior.
- Better closing-line capture. Right now I am betting too early. Need to either bet sharper books or wait for line consensus.

The rebuild starts in July. I will post weekly updates here once the new model is running in shadow mode.
