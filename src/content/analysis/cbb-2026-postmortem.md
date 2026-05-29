---
title: chalkIQ college basketball — 2025-26 postmortem
date: 2026-05-10
description: What the model got right, what it got wrong, and what I am changing for next season.
tags: [chalkiq, sports, postmortem]
category: sports
project: chalkiq
status: published
---

The 2025-26 college basketball season ended in April. Here is what the chalkIQ model did and what I am rebuilding before next November.

## Headline numbers

- Calibration: 0.78 Brier score on closing-line implied probabilities, 0.74 on chalkIQ probabilities. Modest beat, well inside the noise band.
- CLV: +1.8 percent against opening, -0.3 percent against closing. The model finds the early line but does not beat the market by close.
- ROI to flat staking: +2.1 percent across 1,840 plays. Within the variance band of zero.

## What the model got right

The early-season conference play period. Schools where the roster turnover is high (transfer portal heavy) were systematically mispriced for the first two weeks of conference play. chalkIQ caught most of that.

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
