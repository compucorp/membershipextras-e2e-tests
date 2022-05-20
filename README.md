# Membership Extras Product Suite E2E tests

This contrains End-to-End (E2E) tests for memberships test suite, which are written with [Playwright](https://playwright.dev/).

To run the tests you will need to:

1- Have access to any local or remote Compuclient site with all Membershipextras product suite extensions installed, such as [uk.co.compucorp.data.membershipextrasdata](https://github.com/compucorp/uk.co.compucorp.data.membershipextrasdata) and Manual Direct debit extension, an example of such site would be a site built using the 
demo branch of Compuclient: https://github.com/compucorp/compuclient/tree/demo

3- Clone this repo, then either:
 A- Create an environment variable called `E2E_SERVER_URL` and set its value to point to the site in point 2 above (including the http:// part). Also create another environment variable called `E2E_SERVER_PORT` and set the value to equal the port of that site.
 B- Or Update the default values in  getServerUrl() and getPort() functions inside  `playwright.config.ts` file inside this repo to match the URL and the port of your site.

 4- cd inside the folder of this repo that you cloned, then run:
   A- ```npm install```
   B- ```npx playwright install-deps```

   This step is onlyneeded for the first time you are running the tests.

5- To run the tests, run:
   ```npx playwright test```

   Or:
   ```npx playwright test --headed```
   To run them in headed mode (where the tests will open a browser window and execute the tests on them where you can see what is happening).
 