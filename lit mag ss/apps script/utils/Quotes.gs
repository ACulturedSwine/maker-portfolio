async function getapi(url)
{
  const response = await UrlFetchApp.fetch(url);
  var data = JSON.parse(response.getContentText());
  return data;
}

async function quote(){
  const api_url ="https://zenquotes.io/api/quotes/today";
  var data = await getapi(api_url);
  
  // put into sheet
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('STATUS');
  var text = '"'+data[0]['q']+'"\n- '+data[0]['a'];
  sh.getRange('G3').setValue(text);
}
