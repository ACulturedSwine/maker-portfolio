genres = ['Short Story Fiction','Poetry','Personal Essay','Other Prose',
  'Photography','Drawing','Painting','Mixed Media','Other'];

function hideInfo(e) {
  console.log(e.source.getActiveSheet().getName());
  console.log(e.range.getA1Notation());

  if (!e) {
    throw new Error('Please do not run the script in the script editor window. It runs automatically when you edit the spreadsheet.');
  }
  else if (e.source.getActiveSheet().getName() === "SETTINGS"){
      if (e.range.getA1Notation() === 'B1') {
        toggleHideSensitiveInfo(e.range.getValue());
      }
      else if (e.range.getA1Notation() === 'B2') {
        toggleHideProcessingInfo(e.range.getValue());
      }
  }
}

function toggleHideSensitiveInfo(val){
  // columns to hide/show sensitive info: 1 to 6

  ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // if checkbox true, then hide
  if (val === true){
    ss.getSheetByName('MASTER LIST').hideColumns(1, 6);

    genres.forEach(g => {
      ss.getSheetByName(g).hideColumns(1, 10); // hide A to J (A = 1st column, 10 = num columns to hide)
    });
  }
  // else, show
  else {
    masterlistSH = ss.getSheetByName('MASTER LIST');
    masterlistSH.unhideColumn(masterlistSH.getRange('A1:F1'));
    genres.forEach(g => {
      sh = ss.getSheetByName(g);
      sh.unhideColumn(sh.getRange('A1:J1')); 
    });
  }
}

function toggleHideProcessingInfo(val){
  // columns to hide/show processing info: 1 to 6

  ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // if checkbox true, then hide
  if (val === true){
    genres.forEach(g => {
      ss.getSheetByName(g).hideColumns(20, 7); // hide T to Z (T = 20th column, 7 = num columns to hide)
    });
  }
  // else, show
  else {
    genres.forEach(g => {
      sh = ss.getSheetByName(g);
      sh.unhideColumn(sh.getRange('T1:Z1'));
    });
  }
}

