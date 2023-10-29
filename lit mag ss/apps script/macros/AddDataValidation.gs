// add data validation, deprecated since validation wasn't really necessary but could be useful in the future
function addDataValidationRule() {
  ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // set all the rating columns to this
  genres = ['Short Story Fiction','Poetry','Personal Essay','Other Prose',
  'Photography','Drawing','Painting','Mixed Media','Other'];

  for (let x = 0, length = genres.length; x < length; x++){
    // loop through genres
    var sh = ss.getSheetByName(genres[x]);
    
    // loop through column (M-Q), row (2-100)
    for (let i = 'M'.charCodeAt(); i <= 'Q'.charCodeAt(); i++) {
      for (let j = 2; j <= 100; j++){
        // get cell and range
        range = `${String.fromCharCode(i)}${j}`;
        cell = sh.getRange(range);

        // create new rule (rating: description)
        var rule = SpreadsheetApp.newDataValidation()
          .requireFormulaSatisfied(`=REGEXMATCH(${range},"[1-5]: [\s\S]*")`)
          .setAllowInvalid(true)
          .setHelpText('Format like so -> Rating: description (ex: 5: wow AMAzIng WrIting)')
          .build();
     
        // add rule
        cell.setDataValidation(rule);
      }
    }
  }
}
