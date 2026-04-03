# data-model Specification

## Purpose
Define the single source of truth for all slide content.

## Requirements

### Requirement: Single source of truth
The system SHALL derive all section names, slide counts, routes, and dots
dynamically from the sections array in src/data/slides.ts.
Nothing about sections or slides shall be hardcoded elsewhere.

### Requirement: Empty state
The system SHALL handle an empty sections array gracefully.
It SHALL NOT crash. It SHALL render a blank state.

### Requirement: Slide index is 1-based
The system SHALL use 1-based slide indexes in URLs and in the data model.