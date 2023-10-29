genres = ['Short Story Fiction','Poetry','Personal Essay','Other Prose',
  'Photography','Drawing','Painting','Mixed Media','Other'];


function newTemplate(e) {
  if (!e) {
    throw new Error('Please do not run the script in the script editor window. It runs automatically when you edit the spreadsheet.');
  }
  // check if correct sheet, correct cell, is valid url
  else if (e.source.getActiveSheet().getName() === "SETTINGS" && e.range.getA1Notation() == 'A5')
  { 
    template(e.range.getValue());
  }
}

function template(name) {
  sourceId = '1raeCan5_wIXdSa_6F3Ic27QtafpyZ8clgspnMOOyhB0';
  template = name;
  // target = "TEST";
  range = "A1:Z";

  setUp();

  if (name == "Wave"){
    genres.forEach(g => {
      sheetTo = spreadsheetTo.getSheetByName(g);
      wave('A', 'Z', 5);
    });
  }
  else{
    genres.forEach(g => {
      sheetTo = spreadsheetTo.getSheetByName(g);
      normalCopy(range);
    });
  }

  // 4. Delete source_sheet's copy
  spreadsheetTo.deleteSheet(sheetCopy);
}


function setUp(target){
  // 1. Open source sheet
  spreadsheetFrom = SpreadsheetApp.openById(sourceId);
  sheetFrom = spreadsheetFrom.getSheetByName(template);

  // 2. Copy source sheet to target spreadsheet
  spreadsheetTo = SpreadsheetApp.getActiveSpreadsheet();
  sheetCopy = sheetFrom.copyTo(spreadsheetTo);

  // sheetTo = spreadsheetTo.getSheetByName(target);
}
async function normalCopy(rnF, rnT){
  // function overload - rnT as optional, otherwise both from and to have same range
  if (typeof rnT == 'undefined'){
    rnT = rnF;
  }
  
  // 3. Copy range from source_sheet's copy to target_sheet
  let rangeFrom = sheetCopy.getRange(rnF);    
  let rangeTo = sheetTo.getRange(rnT);
  rangeFrom.copyTo(rangeTo, {formatOnly:true});
}

// optimized: wave('A', 'Z', 7);
function wave(startColumn, endColumn, rowInc) {
  // const numRows = range.getNumRows();
  // const numCols = range.getNumColumns();

  maxRow = 150;

  startToCode = startColumn.charCodeAt(0);
  endToCode = endColumn.charCodeAt(0);
  // loop through each ROW (not column) to LAST ROW, looking from left to right
  for (let i = 1; i <= 150; i+=rowInc) {
    iInc = i + rowInc;
    let rnT = startColumn+i+':'+endColumn+iInc;
    normalCopy(startColumn+'1:'+endColumn+'10', rnT);
    // flush so that copyto are not batched but executed every loop
    SpreadsheetApp.flush();
  }
}


function anim(startColumn, endColumn, rowInc) {
  // const numRows = range.getNumRows();
  // const numCols = range.getNumColumns();
  startToCode = startColumn.charCodeAt(0);
  endToCode = endColumn.charCodeAt(0);
  // loop through each ROW (not column), looking from left to right
  for (let i = 1; i <= 10; i+=rowInc) {
    // loop through each abc
    for (let j = startToCode; j <= endToCode; j++) {
      let rnT = String.fromCharCode(j) + i;
      normalCopy(rnT, rnT);
      // flush so that copyto are not batched but executed every loop
      SpreadsheetApp.flush();
    }
  }
}
