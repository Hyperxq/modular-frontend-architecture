# routing Specification

## Purpose
Handle all client-side navigation. URL is the single source of truth for current slide state.

## Requirements

### Requirement: URL pattern
The system SHALL use /:sectionId/:slideIndex as the URL pattern.

#### Scenario: Root redirect
- GIVEN a user navigates to /
- WHEN the sections array is not empty
- THEN redirect to /overview/1

#### Scenario: Section without index
- GIVEN a user navigates to /:sectionId with no slide index
- THEN redirect to /:sectionId/1

#### Scenario: Invalid section
- GIVEN a user navigates to a sectionId that does not exist
- THEN redirect to /overview/1

#### Scenario: Browser back/forward
- GIVEN a user has navigated through multiple slides
- WHEN they press the browser back button
- THEN navigate to the previous slide in history