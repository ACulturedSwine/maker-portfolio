// global
var sheet = null;
var colors = {
  light_red_3:"#f4cccc",
  light_orange_3:"#fce5cd",
  light_yellow_3:"#fff2cc",
  light_green_3:"#d9ead3",
  light_cyan_3:"#d0e0e3",
  light_cornflower_blue_3:"#c9daf8",
  light_blue_3:"#cfe2f3",
  light_purple_3:"#d9d2e9",
}

function formatMySpreadsheet() {
  // Set genre tabs 
  genres = ['Short Story Fiction','Poetry','Personal Essay','Other Prose',
  'Photography','Drawing','Painting','Mixed Media','Other'];
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // Loop through genres, add stuff to each one
  for (i = 0, length = genres.length; i < length; i++){
    sheet = ss.getSheetByName(genres[i]);

    // add query script and protect that cell
    addScriptCell();

    // Ratings (columns MNOPQ) add headings, color
    /*
    editColumn('M', '1st rating', 'red');
    editColumn('N', '2nd rating', 'orange');
    editColumn('O', '3rd rating', 'yellow');
    editColumn('P', '4th rating', 'green');
    editColumn('Q', '5th rating', 'blue');
    */

    // hide columns 1-5 (name to year)
    // sheet.hideColumns(1, 6);

    // sheet.getRange('R1').setValue('Average');
  }
}

function addScriptCell(){
    sheet.getRange('A1').setValue(`=QUERY('MASTER LIST'!A:J, "SELECT * WHERE H = '${genres[i]}'")`);
    /*
    var protection = sheet.getRange('A1').protect().setDescription("Don't edit this cell! Query script here!");
    // Ensure the current user is an editor before removing others. Otherwise, if the user's edit
    // permission comes from a group, the script throws an exception upon removing the group.
    var me = Session.getEffectiveUser();
    protection.addEditor(me);
    protection.removeEditors(protection.getEditors());
    if (protection.canDomainEdit()) {
      protection.setDomainEdit(false);
    }
    */
}


function editColumn(columnLetter, heading, color) {
  // add heading
  sheet.getRange(`${columnLetter}1`).setValue(heading);
  // add color
  sheet.getRange(`${columnLetter}1:${columnLetter}100`).setBackground(colors[`light_${color}_3`]);
}
