columnLetter = 'I';

function shortenLink(e) {
  if (!e) {
    throw new Error('Please do not run the script in the script editor window. It runs automatically when you edit the spreadsheet.');
  }
  // check if correct sheet, correct cell, is valid url
  else if (e.source.getActiveSheet().getName() === "MASTER LIST" && e.range.getA1Notation().startsWith(columnLetter))
  { 
    // if link is not edited already (need to do this since onedit detects clicking on link for some reason)
    let oldLink = e.range.getValue();
    // SpreadsheetApp.getUi().alert(isValidUrl(oldLink));
    if (!oldLink.startsWith("=HYPERLINK")){
      let formula = `=HYPERLINK("${oldLink}", "link")`;
      e.range.setValue(formula);
    }
  }
}

function isValidUrl(value) {
  try {
    var response = UrlFetchApp.fetch(value);
    return true;
  } catch (_) {
    return false;  
  }
}

/*
    // not sure why checking if valid doesn't work (worked for test?), look at later 
    if (isValidUrl(e.range.getValue())){
      let oldLink = e.range.getValue();
      let formula = `=HYPERLINK("${oldLink}", "link")`;
      e.range.setValue(formula);
    }
    else{
      // e.range.setValue('INVALID LINK');
    }
    */


/*
// test:
sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('MASTER LIST');
testRange = sh.getRange('I3');
value = testRange.getValue();

console.log(value);
console.log(typeof value);
console.log(isValidUrl(value));

console.log(testRange.getValue());
if (isValidUrl(testRange.getValue())){
  let oldLink = testRange.getValue();
  let formula = `=HYPERLINK("${oldLink}", "link")`;
  testRange.setValue(formula);
}
else{
  // e.range.setValue('INVALID LINK');
}
*/
