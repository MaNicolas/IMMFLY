# IMMFLY technical test

## Setup project:
git clone **https://github.com/MaNicolas/IMMFLY.git**

Once in the root folder, open a terminal and type: 
**npm init**

## To run a test:
npm run cucumber 'tag'

You'll find all tags marked as '@tags' above features and scenario in src\features\sort_products.feature files.

List of all available tags:
regression | sortingProducts | smoke

## Reports:
After running a test, you'll find a HTML file in reports folder.
Simply right click it, reveal in explorer and open it with any browser.
(I added this folder in my .gitignore file. You'll have to run at least 1 test to see a report).