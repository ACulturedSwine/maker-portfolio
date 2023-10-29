function setupIfNoTriggers() {
  let allTriggers = ScriptApp.getProjectTriggers();
  
  if(allTriggers.length === 0 || !allTriggers){
    createTriggers();
    triggerQueryFormulas();
    SpreadsheetApp.getUi().alert("Setup complete.");
  }
  else {
    SpreadsheetApp.getUi().alert("Triggers are already activated!");
  }
}

function triggerQueryFormulas() {
  genres = ['Short Story Fiction','Poetry','Personal Essay','Other Prose',
  'Photography','Drawing','Painting','Mixed Media','Other'];

  genres.forEach(g => {
    ss = SpreadsheetApp.getActiveSpreadsheet();
    sh = ss.getSheetByName(g);
    sh.getRange("A1").setFormula(`=QUERY('MASTER LIST'!A:H, "SELECT * WHERE H = '${g}'", 1)`);
    sh.getRange("U1").setFormula(`=QUERY('MASTER LIST'!H:K, "SELECT J, K WHERE H = '${g}'", 1)`);
  });
}

function deactivateTriggers(){
  let allTriggers = ScriptApp.getProjectTriggers();

  if (allTriggers.length === 0) {
    SpreadsheetApp.getUi().alert("Triggers are already deleted/deactivated!");
  }
  else {
      let response = SpreadsheetApp.getUi().alert('Confirm', 'Are you sure you want to delete the triggers? This may cause the spreadsheet to lose some of its functionality, although you can always add them back in "Setup Triggers!"', SpreadsheetApp.getUi().ButtonSet.YES_NO);

    // Process the user's response.
    if (response == SpreadsheetApp.getUi().Button.YES) {
      Logger.log('Deactivating triggers...');
      allTriggers.forEach(function(trigger){
        try{
          ScriptApp.deleteTrigger(trigger);
        } catch(e) {
          throw e.message;
        };

        Utilities.sleep(1000); // Used to pause the script temporarily for the specified milliseconds. Otherwise, you may experience the too many service ...
      });

      SpreadsheetApp.getUi().alert('Triggers deleted. You can always add them back in "Setup Triggers"!');
    }
  }
};

function createTriggers() {
  ScriptApp.newTrigger('quote')
      .timeBased()
      .atHour(7)
      .everyDays(1)
      .create();
  ScriptApp.newTrigger('triggerInvalidLink')
    .forSpreadsheet(SpreadsheetApp.getActive())
      .onEdit()
      .create();
  ScriptApp.newTrigger('newTemplate')
      .forSpreadsheet(SpreadsheetApp.getActive())
      .onEdit()
      .create();
  ScriptApp.newTrigger('hideInfo')
      .forSpreadsheet(SpreadsheetApp.getActive())
      .onEdit()
      .create();
}
