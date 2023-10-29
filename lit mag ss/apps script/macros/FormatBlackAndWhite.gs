function format() {
  genres = ['Short Story Fiction','Poetry','Personal Essay','Other Prose',
  'Photography','Drawing','Painting','Mixed Media','Other'];

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Loop through genres, add stuff to each one
  for (let i = 0, length = genres.length; i < length; i++){
    sh = ss.getSheetByName(genres[i]);
    let ranges = ['A1:L100', 'M1:Q1', 'R1', 'S1:Z100'];
    makeBlackAndWhite(ranges);
  }
}

// TO MAKE BLACK AND WHITE: A100-L100 (left), M1-Q1, R1 (ratings bar plus average bar), S1-Z100 (right)
function makeBlackAndWhite(rangeList){
  for (let i = 0, length = rangeList.length; i < length; i++){
    range = sh.getRange(rangeList[i]);
    range.setBackground('black');
    range.setFontColor('white');
  }
}
