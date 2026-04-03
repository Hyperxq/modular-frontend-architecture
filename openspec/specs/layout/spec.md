# layout Specification

## Purpose
Define the fixed 3-column viewport layout that all slides render within.

## Requirements

### Requirement: Fixed viewport
The system SHALL render within a fixed 100vw x 100vh viewport with no scrolling.

### Requirement: No-line rule
The system SHALL separate layout regions using background color shifts only.
No 1px solid borders are permitted between layout columns.

### Requirement: No rounded corners
The system SHALL use border-radius: 0 on all elements.
Circles are not permitted except for avatar elements (none exist in this app).

### Requirement: Minimum width
The system SHALL support a minimum viewport width of 1440px.
No mobile or responsive layout is required. 