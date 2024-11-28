@SortingProducts
Feature: Sorting products
    As a user
    I want to sort the product list using the Sort By dropdown
    So that I can view and compare products based on my preferred criteria

    Background: Pre conditions
        Given I navigate to highlifeshop homepage
        And I close the cookie popup
        When I click on the SortBy button

    Scenario: Sort products alphabetically
        And I select "Product A-Z" criteria
        Then The products should be sorted alphabetically

    Scenario Outline: Validate url
        And I select '<criteria>' criteria
        Then Url should contain '<url>'

        Examples:
            | criteria          | url                              |
            | New Arrivals      | ?product_list_order=new          |
            | Product A-Z       | ?product_list_order=product_asc  |
            | Product Z-A       | ?product_list_order=product_desc |
            | Price Low to High | ?product_list_order=price_asc    |
            | Price High to Low | ?product_list_order=price_desc   |