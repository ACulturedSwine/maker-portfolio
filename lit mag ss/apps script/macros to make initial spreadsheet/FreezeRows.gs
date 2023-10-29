function freeze() {
  ss = SpreadsheetApp.getActiveSpreadsheet();

  genres = ['Short Story Fiction','Poetry','Personal Essay','Other Prose',
  'Photography','Drawing','Painting','Mixed Media','Other'];

  // for every genre sheet
  for (let i = 0, length = genres.length; i < length; i++){
    sh = ss.getSheetByName(genres[i]);

    // freeze first row
    sh.setFrozenRows(1);
    // freeze columns A-L (1-12)
    sh.setFrozenColumns(12);
  }
}
