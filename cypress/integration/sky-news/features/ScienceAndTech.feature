Feature: Sky News Science & Tech

  Background:
    # Test data set up for the user
    Given I am a user in 'London', 'UK'
    # Test set up based on the user's location data
    And I'm on the Sky News Home page

  Scenario: User wants to view the top story of Science & Tech
    # Actions convey behaviour, *not* UI interaction
    When I go to view the 'Science & Tech' news
    Then the 'Science & Tech' page should be shown
    When I view the top story
    Then the news article should be shown
