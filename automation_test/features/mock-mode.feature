Feature: Mock Mode Section
  As a developer viewing the architecture presentation
  I want to see the mock mode demo slide
  So that I can understand how MSW-powered API mocking works

  # These tests run against the default dev server (development.local)
  # where PUBLIC_ENABLE_MOCKING is NOT set — mock toggle is disabled.
  # Full mock toggle E2E requires env-mode "mock" (separate test config).

  @mock
  Scenario: Mock demo slide renders with section label
    Given I am on the mock demo slide
    Then the slide title should be "The Problem It Solves"

  @mock
  Scenario: Mock toggle is disabled without mock env
    Given I am on the mock demo slide
    Then the mock toggle should be present

  @mock
  Scenario: Mock demo content or fallback renders
    Given I am on the mock demo slide
    Then the mock demo area should have content

  @mock
  Scenario: Navigation from mock section goes back to stack
    Given I am on the mock demo slide
    When I click the previous arrow
    Then the URL should contain "/stack/3"
