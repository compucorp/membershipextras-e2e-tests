const fs = require("fs");
const { webkit } = require('playwright'); // import desired browser
(async () => {
  /* (1) Load the target page */
  const browser = await webkit.launch(); // launch desired browser
  const page = await browser.newPage();
  page.on("console", msg => console.log("PAGE LOG:", msg.text()));
  await page.setViewportSize({width: 1920, height: 1080}); // different name :(
  await page.goto('https://sheetjs.com/demos/table');

  /* (2) Load the standalone SheetJS build from the CDN */
  await page.addScriptTag({ url: 'https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js' });

  /* (3) Run the snippet in browser and return data */
  const bin = await page.evaluate(() => {
    /* NOTE: this function will be evaluated in the browser context.
       `page`, `fs` and the browser engine are not available.
       `XLSX` will be available thanks to step 2 */

    /* find first table */
    var table = document.body.getElementsByTagName('table')[0];

    /* call table_to_book on first table */
    var wb = XLSX.utils.table_to_book(table);

    /* generate XLSB and return binary string */
    return XLSX.write(wb, {type: "binary", bookType: "xlsb"});
  });

  /* (4) write data to file */
  fs.writeFileSync("SheetJSPlaywright.xlsb", bin, { encoding: "binary" });

  await browser.close();
})();
