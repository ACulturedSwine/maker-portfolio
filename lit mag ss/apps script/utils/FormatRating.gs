genres = ['Short Story Fiction','Poetry','Personal Essay','Other Prose',
  'Photography','Drawing','Painting','Mixed Media','Other'];

ratingRange = 'M2:Q';

function formatRatingLoop() {
  // (?<=[1-5]).*?(?=[a-zA-Z])
  ss = SpreadsheetApp.getActiveSpreadsheet();
  SpreadsheetApp.getUi().alert('Currently disabled because genre sheets are under construction. Check back later!');

  /*
  genres.forEach(g => {
    console.log('started genre');
    sh = ss.getSheetByName(g);
    rns = sh.getRange('M2:Q');

    forEachRangeCell(rns, checkBlank, (cell) => {
      // fun lil color change of cell to show that it's being edited
      oldColor = cell.getBackground();
      cell.setBackground('yellow');

      val = cell.getValue();
      cell.setValue(formatRating(cell.getValue()));

      // reset to old color after done!
      cell.setBackground(oldColor);
    })
    console.log('finished genre');
  });
  */
}

function formatRating(val){
  // not sure why just replacing with using the regex expression by itself doesn't work, so i'll just do this instead...
  regex = /(?<=[1-5]).*?(?=[a-zA-Z])/;
  trash = val.match(regex);
  newVal = val.replace(trash, ': ');
  return newVal;
}

function checkBlank(val){
  if (val.trim() == ""){
    // invalid cell
    return false;
  }
  else{
    // valid cell
    return true;
  }
}

function forEachRangeCell(range, valid, f) {
  const numRows = range.getNumRows();
  const numCols = range.getNumColumns();
  // loop through each ROW (not column), looking from left to right
  for (let i = 1; i <= numRows; i++) {
    for (let j = 1; j <= numCols; j++) {
      const cell = range.getCell(i, j);
      if (valid(cell.getValue())){
        f(cell);
      }
      else{
        // break out of row if blank rating (but still check through other rows)
        // console.log(cell.getA1Notation());
        break;
      }
    }
  }
}
