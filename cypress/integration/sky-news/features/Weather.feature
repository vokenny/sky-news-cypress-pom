Feature: Sky News Weather

  Background:
    # Test data set up for the user
    Given I am a user in 'London', 'UK'
    # Test set up based on the user's location data
    And I'm on the Sky News Home page

  Scenario: User wants to view their local weather
    # Actions convey behaviour, *not* UI interaction
    When I go to view the weather forecast
    And I view today's forecast
    # Assertions are abstracted behind the step def, except for the main purpose
    Then the local weather forecast should be shown

  Scenario: User wants to view the weather for the next day
    When I go to view the weather forecast
    Then the local weather forecast should be shown
    When I view the weather for the next day
    Then the local weather forecast should be shown for the next day
