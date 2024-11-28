@SortingProducts
Feature: Sorting products
    As a user
    I want to sort the product list using the Sort By dropdown
    So that I can view and compare products based on my preferred criteria

    Background: Pre conditions
        Given I navigate to highlifeshop homepage
        And I close the cookie popup

    Scenario: Sort products by price in ascending order
        When I click on the SortBy button
        And I select Price criteria
        Then The products should be sorted by price in ascending order
