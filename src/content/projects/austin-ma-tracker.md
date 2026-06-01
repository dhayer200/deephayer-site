---
title: Austin M&A Tracker
summary: A free-data Austin MSA M&A pipeline that ingests RSS, classifies deals with the Claude CLI, and surfaces them in a SQLite-backed Streamlit dashboard.
year: "2026"
status: shipped
order: 3
stack: [Python, SQLite, Streamlit, Claude CLI, RSS, Typst]
links:
  paper: https://deephayer.com/papers/austin-ma-tracker.pdf
tags: [m-and-a, austin, investment-banking, data]
---

A working M&A deal tracker built from nine RSS feeds plus a regex prefilter plus Claude CLI batch JSON extraction into SQLite, with a Streamlit dashboard for browsing. Built to send to Austin boutique investment banks as the lead artifact in cold outreach.

## Latest

Hand-verified 43 deals across the Austin MSA from August 2024 through May 2026. Quantified the free-data disclosure ceiling at 4 of 43 deals with enterprise value disclosed. The follow-up real estate sub-segment deep-dive lives at [/essays/2026-austin-re-deepdive](/essays/2026-austin-re-deepdive). Tracker essay at [/essays/2026-austin-ma-tracker](/essays/2026-austin-ma-tracker).

## Status

Shipped v1. v2 will add an LLM-extracted multiples normalizer for the deals where industry and revenue are public even though EV is not.
