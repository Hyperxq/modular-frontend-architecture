# progress-tracking Specification

## Purpose
Track which slides the user has read and persist that state across sessions.

## Requirements

### Requirement: Mark visited
The system SHALL automatically mark a slide as visited when the user navigates to it.

#### Scenario: Auto-mark on route change
- GIVEN a user navigates to /:sectionId/:slideIndex
- THEN that slide is marked visited in the store

### Requirement: Persist progress
The system SHALL persist visited slides to localStorage.

#### Scenario: Refresh persistence
- GIVEN a user has visited several slides
- WHEN they refresh the page
- THEN visited state is restored from localStorage

### Requirement: Section completion
The system SHALL mark a section as completed when all its slides are visited.

#### Scenario: Section complete color
- GIVEN all slides in a section are visited
- THEN the section name in the sidebar renders in var(--tertiary)