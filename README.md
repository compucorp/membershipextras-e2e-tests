# End-2-End Playwright tests for Compuclient

This contrains End-to-End (E2E) tests for Compuclient, which are written with [Playwright](https://playwright.dev/).

## Initial setup and running the tests

To run the tests you will need to:

1- Have access to any local or remote Compuclient site demo site, an example of such site would be a site built using the 
demo branch of Compuclient: https://github.com/compucorp/compuclient/tree/demo

2- Clone this repo, then either:
 A- Create an environment variable called `E2E_SERVER_URL` and set its value to point to the site in point 2 above (including the http:// part). Also create another environment variable called `E2E_SERVER_PORT` and set the value to equal the port of that site.
 B- Or Update the default values in  getServerUrl() and getPort() functions inside  `playwright.config.ts` file inside this repo to match the URL and the port of your site.

 3- cd inside the folder of this repo that you cloned, then run:
   A- ```npm install```
   B- ```npx playwright install-deps```
   C- ```npm i https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz playwright```
   D- ```npm install xlsx-calc```
   E- ```npm install dayjs```

   These are only needed for the first time you are running the tests.

3- To run the tests, enter:
   ```npx playwright test --project=Core_scenario```

   Or:
   ```npx playwright test --project=Core_scenario --headed```
   To run them in headed mode (where the tests will open a browser window and execute the tests on them where you can see what is happening).

   replace `Core_scenario` with the project name you want to run tests for, which might be something like "ASE", "BASW" ..etc depending on the projects supported, the supported
   projects can be found in the playwright.config.ts file under "projects".


## Notes

- At the moment, this repo contains two test files, one is called "data-file-example.spec.ts" and the other is "membership-type-form-validations.spec.ts", the first take advantage
of the Spreadsheet template shared by the QA and in which they would put their test cases, the other just runs some form validation tests that require no input data form the data sheet on
the membership type forms.

The "data-file-example.spec.ts" take advante of the 2 libraries which are:

   1- sheetjs: to read the data from the JS file, a helper class under `helper/xlsx.ts` is created to facilate reading data and doing some common tasks related to test data spreadsheet under that is stored under `data/main.xlsx`. the helper class uses xlsx-calc library to precaculate the data sheet forumals.

   2- dayjs: which is used to operate on date fields, a helper class under `helper/date.ts` is created to help with converting some date formats to something that can be used in tests.


- To add new project, it should be first added to the data sheet by QA, then the project name should be added to the `playwright.config.ts` file under `project` key, once that is done, the project name can be passed to tests through the `--project` option.
