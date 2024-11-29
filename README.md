# IMMFLY technical test

## Setup project:
Create a folder where you want to store the project (You can name the folder anything you like)
Open the path in a Terminal (on Windows, simply type 'cmd' in the address bar)
Once the command prompt window opened, follow these steps:

git clone **https://github.com/MaNicolas/IMMFLY.git**
cd IMMFLY
npm i --save-dev
code . (You can use any IDE, this command is for VS Code)

## Hierarchy:
The project is organized as follow:
- scenarios are store in the src\features\sort_products.feature file
- steps definition in src\step-definitions
- page objects in src\page-objects

## To run a test:
npm run cucumber 'tag'

You'll find all tags marked as '@tags' above features and scenario in src\features\sort_products.feature files.

List of all available tags:
regression | sortingProducts | smoke

## Reports:
After running a test, you'll find a HTML file in reports folder.
Simply right click it, reveal in explorer and open it with any browser.
(I added this folder in my .gitignore file. You'll have to run at least 1 test to see a report).