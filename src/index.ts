import { exec } from "child_process";

import dotenv from 'dotenv';
dotenv.config({path: './env/.env'});

//Setting retry value from environment variables
const retryValue = process.env.RETRY || '0';

//Setting parallel thread from environment variables
const parallelValue = process.env.PARALLELTHREAD || '2';

//Define a common command string for running cucumber tests
const common = `./src/features/*.feature \
--require-module ts-node/register \
--require ./src/step-definitions/**/**/*.ts \
--require ./src/utils/cucumber-timeout.ts \
--format html:./reports/report.html \
--retry ${retryValue} \
--parallel ${parallelValue} \
--tags "not @ignore"`;

//Define an interface for the profiles object
interface ProfileCommands {
  [key: string]: string;
}

//Define a command strings for different test profiles
const profiles: ProfileCommands = {
  smoke: `${common} --tags "@smoke"`,
  regression: `${common} --tags "@regression"`,
  sortingProducts: `${common} --tags "@sortingProducts"`,
};

//Get the third command-line argument and assign it to the profile
const profile = process.argv[2];

//Construct the command string based on the selected profile
//command is the full command to run the tests for the selected profile
let command = `npx cucumber-js ${
  profiles[profile as "smoke" | "regression" | "sortingProducts"]
}`;

//Print the constructed command
console.log(command);

//Execute the command
exec(command, { encoding: "utf-8" }, (error: Error | null, stdout: string) => {
    //Log the output of the command
    console.log(stdout);

    //Check if there was an error during execution
    if(error)
    {
        //Throw a new error with a simple message
        throw new Error('⚠️ 💥 Some automation test(s) have failed! - Please review. ⚠️ 💥');
    }
});