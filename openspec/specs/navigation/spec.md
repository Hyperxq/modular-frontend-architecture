# navigation Specification

## Purpose
Allow users to move between slides and sections via arrows, keyboard, sidebar, and bottom bar dots.

## Requirements

### Requirement: Next navigation
The system SHALL advance to the next slide or first slide of the next section.

#### Scenario: Next within section
- GIVEN the current slide is not the last in the section
- WHEN the user presses Next
- THEN navigate to /:sectionId/:slideIndex+1

#### Scenario: Next across section
- GIVEN the current slide is the last in the section
- AND there is a next section
- WHEN the user presses Next
- THEN navigate to /nextSection/1

#### Scenario: Next disabled
- GIVEN the current slide is the last slide of the last section
- THEN the Next arrow is disabled and non-interactive

### Requirement: Keyboard navigation
The system SHALL support ArrowRight and ArrowLeft keys.

#### Scenario: Arrow right
- GIVEN the user presses ArrowRight
- THEN execute Next logic

#### Scenario: Arrow left
- GIVEN the user presses ArrowLeft
- THEN execute Previous logic