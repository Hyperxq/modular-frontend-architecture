Feature: Presentation Navigation
  As a viewer of the microfrontend architecture presentation
  I want to navigate between slides using arrows, keyboard, and sidebar
  So that I can browse all content seamlessly across sections

  # Slide data: problem-audience(3) → overview(3) → monorepo(3) → stack(4) → shell(4) → ui-components(4) → module-federation(4) → mock(5) → testing(3) → infrastructure(3) → claude-code(3) → get-started(3) = 42 total
  # First slide: /problem-audience/0 — Last slide: /get-started/2

  # ─── Page Load ──────────────────────────────────────────────────────

  Scenario: Root redirects to first slide
    When I navigate to the root
    Then the URL should contain "/problem-audience/0"

  Scenario: Direct URL loads correct slide
    Given I am on slide "problem-audience" at index 0
    Then the presentation layout should be visible

  # ─── Layout Structure ──────────────────────────────────────────────

  @layout
  Scenario: Header displays app title
    Given I am on slide "problem-audience" at index 0
    Then the header should be visible
    And the header title should be "MICROFRONTEND ARCHITECTURE"

  @layout
  Scenario: Sidebar renders all section buttons
    Given I am on slide "problem-audience" at index 0
    Then the sidebar should be visible
    And the sidebar should have a button "Problem & Audience"
    And the sidebar should have a button "Overview"
    And the sidebar should have a button "Monorepo"
    And the sidebar should have a button "Stack & Tooling"
    And the sidebar should have a button "Shell & Communication"
    And the sidebar should have a button "UI Components"
    And the sidebar should have a button "Module Federation"
    And the sidebar should have a button "Mock Mode"
    And the sidebar should have a button "Testing"
    And the sidebar should have a button "Infrastructure"
    And the sidebar should have a button "Claude Code"
    And the sidebar should have a button "Get Started"

  @layout
  Scenario: Center panel renders slide content
    Given I am on slide "problem-audience" at index 0
    Then the center panel should be visible
    And the slide title should be "The Pain"

  @layout
  Scenario: Bottom bar displays slide counter
    Given I am on slide "problem-audience" at index 0
    Then the bottom bar should be visible
    And the slide counter should contain "SLIDE 1 / 3"

  @layout
  Scenario: Nav arrows state on first slide
    Given I am on slide "problem-audience" at index 0
    Then the previous button should be visible
    And the previous button should be disabled
    And the next button should be visible
    And the next button should be enabled

  # ─── Slide Navigation via Arrows ───────────────────────────────────

  @navigation @arrows
  Scenario: Next arrow advances to slide 2
    Given I am on slide "problem-audience" at index 0
    When I click the next arrow
    Then the URL should contain "/problem-audience/1"
    And the slide title should be "Who This Is For"
    And the slide counter should contain "SLIDE 2 / 3"
    And the previous button should be enabled

  @navigation @arrows
  Scenario: Prev arrow goes back after advancing
    Given I am on slide "problem-audience" at index 0
    When I click the next arrow
    And I click the previous arrow
    Then the URL should contain "/problem-audience/0"
    And the slide title should be "The Pain"

  @navigation @arrows
  Scenario: Next arrow crosses section boundary forward
    Given I am on slide "problem-audience" at index 2
    When I click the next arrow
    Then the URL should contain "/overview/0"
    And the slide title should be "The Big Picture"

  @navigation @arrows
  Scenario: Prev arrow crosses section boundary backwards
    Given I am on slide "overview" at index 0
    When I click the previous arrow
    Then the URL should contain "/problem-audience/2"
    And the slide title should be "The Real World Problem"

  # ─── Section Navigation via Sidebar ────────────────────────────────

  @navigation @sidebar
  Scenario: Clicking Overview navigates to its first slide
    Given I am on slide "problem-audience" at index 0
    When I click the "Overview" section in the sidebar
    Then the URL should contain "/overview/0"
    And the slide title should be "The Big Picture"

  @navigation @sidebar
  Scenario: Clicking Stack & Tooling navigates to its first slide
    Given I am on slide "problem-audience" at index 0
    When I click the "Stack & Tooling" section in the sidebar
    Then the URL should contain "/stack/0"
    And the slide title should be "The Bundler Ecosystem"

  @navigation @sidebar
  Scenario: Clicking Mock Mode navigates to its first slide
    Given I am on slide "problem-audience" at index 0
    When I click the "Mock Mode" section in the sidebar
    Then the URL should contain "/mock/0"
    And the slide title should be "The Problem It Solves"

  @navigation @sidebar
  Scenario: Active section is highlighted in sidebar
    Given I am on slide "problem-audience" at index 0
    Then the "Problem & Audience" sidebar button should have aria-current "step"
    When I click the "Overview" section in the sidebar
    Then the "Overview" sidebar button should have aria-current "step"
    And the "Problem & Audience" sidebar button should not have aria-current "step"

  # ─── Keyboard Navigation ───────────────────────────────────────────

  @navigation @keyboard
  Scenario: ArrowRight advances slide
    Given I am on slide "problem-audience" at index 0
    When I press ArrowRight
    Then the URL should contain "/problem-audience/1"
    And the slide title should be "Who This Is For"

  @navigation @keyboard
  Scenario: ArrowLeft goes back
    Given I am on slide "problem-audience" at index 1
    When I press ArrowLeft
    Then the URL should contain "/problem-audience/0"

  @navigation @keyboard
  Scenario: ArrowLeft is no-op on first slide
    Given I am on slide "problem-audience" at index 0
    When I press ArrowLeft
    Then the URL should contain "/problem-audience/0"

  @navigation @keyboard
  Scenario: ArrowRight is no-op on last slide
    Given I am on slide "get-started" at index 2
    When I press ArrowRight
    Then the URL should contain "/get-started/2"

  @navigation @keyboard
  Scenario: ArrowLeft crosses section boundary backwards
    Given I am on slide "overview" at index 0
    When I press ArrowLeft
    Then the URL should contain "/problem-audience/2"

  # ─── Last Slide Boundary ───────────────────────────────────────────

  @navigation @boundary
  Scenario: Nav arrows state on last slide
    Given I am on slide "get-started" at index 2
    Then the next button should be disabled
    And the previous button should be enabled

  @navigation @boundary
  Scenario: Clicking next is no-op on last slide
    Given I am on slide "get-started" at index 2
    When I force click the next arrow
    Then the URL should contain "/get-started/2"

  # ─── Route Validation ──────────────────────────────────────────────

  @routes
  Scenario: Invalid slide index redirects to first slide
    When I navigate to slide "problem-audience" at index 999
    Then the URL should contain "/problem-audience/0"

  @routes
  Scenario: Invalid section redirects to first slide
    When I navigate to path "/nonexistent/0"
    Then the URL should contain "/problem-audience/0"

  @routes
  Scenario: Negative slide index redirects to first slide
    When I navigate to path "/problem-audience/-1"
    Then the URL should contain "/problem-audience/0"

  # ─── Browser History ───────────────────────────────────────────────

  @navigation @history
  Scenario: Browser back returns to previous slide
    Given I am on slide "problem-audience" at index 0
    When I click the next arrow
    And I go back in the browser
    Then the URL should contain "/problem-audience/0"

  @navigation @history
  Scenario: Browser forward restores after back
    Given I am on slide "problem-audience" at index 0
    When I click the next arrow
    And I go back in the browser
    And I go forward in the browser
    Then the URL should contain "/problem-audience/1"

  # ─── Visual Integrity ──────────────────────────────────────────────

  @visual
  Scenario: No console errors on load
    Given I am on slide "problem-audience" at index 0
    Then there should be no console errors

  @visual
  Scenario: All major layout sections have non-zero dimensions
    Given I am on slide "problem-audience" at index 0
    Then the header should have non-zero dimensions
    And the sidebar should have non-zero dimensions
    And the center panel should have non-zero dimensions
    And the bottom bar should have non-zero dimensions

  @visual
  Scenario: Nav arrow buttons have non-zero dimensions
    Given I am on slide "problem-audience" at index 1
    Then the previous button should have non-zero dimensions
    And the next button should have non-zero dimensions
