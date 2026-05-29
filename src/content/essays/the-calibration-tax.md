---
title: The calibration tax
date: 2026-05-20
description: Why most "edges" in sports models evaporate at the closing line, and what to spend your effort on instead.
tags: [math, modeling, sports]
status: published
project: chalkiq
---

The first model I ever shipped beat the market in backtest by four percent ROI. It looked great. It did not beat the market when I ran it against real closing lines for the next two weeks, because the four percent edge was never real.

The mistake was not in the model. The mistake was in the score. I was measuring the model against the *opening* line, then comparing to a hypothetical bet placed at the opening line, then assuming I could capture the same edge at the closing line — which is the line that actually clears.

In sports markets the closing line is the consensus of every informed participant: the books, the sharps who move the line, and the late information that gets injected after the open. The closing line is the right benchmark precisely because it is the line you cannot beat without information no one else has.

Once I scored against closing, the four percent vanished. So did most of the features I had been adding. They were beating an opening line that had moved against me by the time I got to bet it.

## The tax everyone pays

There is a tax built into every honest sports model. Call it the calibration tax. It is the gap between the edge you measure in backtest and the edge you actually realize. The tax has three components:

1. **Closing line drift.** The market moves against you between when you decide and when you bet. If your signal is in the early line, this tax is high. If your signal is sharper than the market by closing, the tax is low or negative.
2. **Vig.** The bookmaker takes a cut. On a typical NBA moneyline this is two to four percent.
3. **Variance.** A real two percent edge looks like a five percent edge in a 200-bet sample on the good weeks and a minus three percent edge on the bad ones. Your bankroll has to survive the bad weeks.

Calibration is the only honest defense. A model that says "60%" needs to be right 60% of the time over a large enough sample. If it is right 55% of the time, the model is broken even if it beats the opening line, because you will give back the gap to closing in the long run.

## What this means for the work

Most of the marginal effort I have put into [chalkIQ](/projects/chalkiq) over the last year has gone into calibration, not new features. New features look like progress. Calibration looks like cleaning. But calibration is the work. Every time I add a feature without re-calibrating, I am painting over a problem.

The rule I now follow: the next thing I add has to either improve the calibration curve on the existing model or be a feature whose signal survives a fresh calibration. Everything else is a story I am telling myself.
