Feature: Sky News Home

  Background:
    # Test data set up for the user
    Given I am a user in 'London', 'UK'
    # Test set up based on the user's location data
    And I'm on the Sky News Home page

  Scenario: User wants to view the top story
    # Actions convey behaviour, *not* UI interaction
    When I view the top story
    # Assertions are abstracted behind the step def, except for the main purpose
    Then the news article should be shown
