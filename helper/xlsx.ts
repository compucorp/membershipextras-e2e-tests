export class XlsxTestDataHelper {

  static xlsx = require('xlsx');
  static file = XlsxTestDataHelper.xlsx.readFile('./data/main.xlsx');
 
  /**
   * Checks if the test to run is valid for the project we are running
   * the tests for.
   * 
   * @param projectName 
   * @param testId 
   * @returns 
   */
  static isValidProject(projectName, testId) {
    var testData = null;
    var data = XlsxTestDataHelper.xlsx.utils.sheet_to_json(XlsxTestDataHelper.file.Sheets['Master']);
    data.forEach((row) => {
      if (row['Scenario_ID'] == testId && row[projectName] == 'Yes') {
        testData = row;
      }
   });

    if (testData == null) {
      return false;
    }

    return true;
  }

  /**
   * Reads the specified sheet data for the 
   * test that is running.
   * 
   * @param sheetName 
   * @param testId 
   * @returns 
   */
  static readSheetData(sheetName, testId) {
    var membershipTestData = [];
    var data = XlsxTestDataHelper.xlsx.utils.sheet_to_json(XlsxTestDataHelper.file.Sheets[sheetName]);
    data.forEach((row) => {
      if (row['Scenario_ID'] == testId) {
        membershipTestData.push(row);
      }
    });

    return membershipTestData;
  }

  /**
   * Converts and returns a mapped value from the sheet 
   * (which are values that are surrounded by '~`) according to
   * its value from the DataMapping sheet.
   * 
   * @param fieldName 
   * @param projectName 
   * @returns 
   */
  static getMappedValue(fieldName, projectName) {
    let value = '';
    var mappingSheetData = XlsxTestDataHelper.xlsx.utils.sheet_to_json(XlsxTestDataHelper.file.Sheets['DataMapping']);
    for(let row of mappingSheetData) {
      if (('~' + row['Lookup Field Name'] + '~') == fieldName) {
        value = row[projectName];
        break;
      }
    }

    return value;
  }

}
