Feature: Presentation Navigation
  As a viewer of the microfrontend architecture presentation
  I want to navigate between slides using arrows, keyboard, and sidebar
  So that I can browse all content seamlessly across sections

  # Slide data: intro(3) → architecture(3) → stack(2) → mock(1) = 9 total
  # First slide: /intro/0 — Last slide: /mock/0

  # ─── Page Load ──────────────────────────────────────────────────────

  Scenario: Root redirects to first slide
    When I navigate to the root
    Then the URL should contain "/intro/0"

  Scenario: Direct URL loads correct slide
    Given I am on slide "intro" at index 0
    Then the presentation layout should be visible

  # ─── Layout Structure ──────────────────────────────────────────────

  @layout
  Scenario: Header displays app title
    Given I am on slide "intro" at index 0
    Then the header should be visible
    And the header title should be "MICROFRONTEND ARCHITECTURE"

  @layout
  Scenario: Sidebar renders all section buttons
    Given I am on slide "intro" at index 0
    Then the sidebar should be visible
    And the sidebar should have a button "Overview"
    And the sidebar should have a button "Architecture"
    And the sidebar should have a button "Stack & Tooling"
    And the sidebar should have a button "Mock Mode"

  @layout
  Scenario: Center panel renders slide content
    Given I am on slide "intro" at index 0
    Then the center panel should be visible
    And the slide title should be "The Monolith Problem"

  @layout
  Scenario: Bottom bar displays slide counter
    Given I am on slide "intro" at index 0
    Then the bottom bar should be visible
    And the slide counter should contain "SLIDE 1 / 3"

  @layout
  Scenario: Nav arrows state on first slide
    Given I am on slide "intro" at index 0
    Then the previous button should be visible
    And the next button should be visible
    And the previous button should be disabled
    And the next button should be enabled

  # ─── Slide Navigation via Arrows ───────────────────────────────────

  @navigation @arrows
  Scenario: Next arrow advances to slide 2
    Given I am on slide "intro" at index 0
    When I click the next arrow
    Then the URL should contain "/intro/1"
    And the slide title should be "Structural Analysis"
    And the slide counter should contain "SLIDE 2 / 3"
    And the previous button should be enabled

  @navigation @arrows
  Scenario: Prev arrow goes back after advancing
    Given I am on slide "intro" at index 0
    When I click the next arrow
    And I click the previous arrow
    Then the URL should contain "/intro/0"
    And the slide title should be "The Monolith Problem"

  @navigation @arrows
  Scenario: Next arrow crosses section boundary forward
    Given I am on slide "intro" at index 2
    When I click the next arrow
    Then the URL should contain "/architecture/0"
    And the slide title should be "Module Federation"

  @navigation @arrows
  Scenario: Prev arrow crosses section boundary backwards
    Given I am on slide "architecture" at index 0
    When I click the previous arrow
    Then the URL should contain "/intro/2"
    And the slide title should be "Why Micro-Frontends?"

  # ─── Section Navigation via Sidebar ────────────────────────────────

  @navigation @sidebar
  Scenario: Clicking Architecture navigates to its first slide
    Given I am on slide "intro" at index 0
    When I click the "Architecture" section in the sidebar
    Then the URL should contain "/architecture/0"
    And the slide title should be "Module Federation"

  @navigation @sidebar
  Scenario: Clicking Stack & Tooling navigates to its first slide
    Given I am on slide "intro" at index 0
    When I click the "Stack & Tooling" section in the sidebar
    Then the URL should contain "/stack/0"
    And the slide title should be "Rspack Ecosystem"

  @navigation @sidebar
  Scenario: Active section is highlighted in sidebar
    Given I am on slide "intro" at index 0
    Then the "Overview" sidebar button should have aria-current "true"
    When I click the "Architecture" section in the sidebar
    Then the "Architecture" sidebar button should have aria-current "true"
    And the "Overview" sidebar button should not have aria-current "true"

  # ─── Keyboard Navigation ───────────────────────────────────────────

  @navigation @keyboard
  Scenario: ArrowRight advances slide
    Given I am on slide "intro" at index 0
    When I press ArrowRight
    Then the URL should contain "/intro/1"
    And the slide title should be "Structural Analysis"

  @navigation @keyboard
  Scenario: ArrowLeft goes back
    Given I am on slide "intro" at index 1
    When I press ArrowLeft
    Then the URL should contain "/intro/0"

  @navigation @keyboard
  Scenario: ArrowLeft is no-op on first slide
    Given I am on slide "intro" at index 0
    When I press ArrowLeft
    Then the URL should contain "/intro/0"

  @navigation @keyboard
  Scenario: ArrowRight is no-op on last slide
    Given I am on slide "mock" at index 0
    When I press ArrowRight
    Then the URL should contain "/mock/0"

  @navigation @keyboard
  Scenario: ArrowLeft crosses section boundary backwards
    Given I am on slide "architecture" at index 0
    When I press ArrowLeft
    Then the URL should contain "/intro/2"

  # ─── Last Slide Boundary ───────────────────────────────────────────

  @navigation @boundary
  Scenario: Nav arrows state on last slide
    Given I am on slide "mock" at index 0
    Then the next button should be disabled
    And the previous button should be enabled

  @navigation @boundary
  Scenario: Clicking next is no-op on last slide
    Given I am on slide "mock" at index 0
    When I force click the next arrow
    Then the URL should contain "/mock/0"

  # ─── Route Validation ──────────────────────────────────────────────

  @routes
  Scenario: Invalid slide index redirects to first slide
    When I navigate to slide "intro" at index 999
    Then the URL should contain "/intro/0"

  @routes
  Scenario: Invalid section redirects to first slide
    When I navigate to path "/nonexistent/0"
    Then the URL should contain "/intro/0"

  @routes
  Scenario: Negative slide index redirects to first slide
    When I navigate to path "/intro/-1"
    Then the URL should contain "/intro/0"

  # ─── Browser History ───────────────────────────────────────────────

  @navigation @history
  Scenario: Browser back returns to previous slide
    Given I am on slide "intro" at index 0
    When I click the next arrow
    And I go back in the browser
    Then the URL should contain "/intro/0"

  @navigation @history
  Scenario: Browser forward restores after back
    Given I am on slide "intro" at index 0
    When I click the next arrow
    And I go back in the browser
    And I go forward in the browser
    Then the URL should contain "/intro/1"

  # ─── Visual Integrity ──────────────────────────────────────────────

  @visual
  Scenario: No console errors on load
    Given I am on slide "intro" at index 0
    Then there should be no console errors

  @visual
  Scenario: All major layout sections have non-zero dimensions
    Given I am on slide "intro" at index 0
    Then the header should have non-zero dimensions
    And the sidebar should have non-zero dimensions
    And the center panel should have non-zero dimensions
    And the bottom bar should have non-zero dimensions

  @visual
  Scenario: Nav arrow buttons have non-zero dimensions
    Given I am on slide "intro" at index 0
    Then the previous button should have non-zero dimensions
    And the next button should have non-zero dimensions
