function myFuction(){
  return 1101
}
function doGet(e) { 
  Logger.log( JSON.stringify(e) );  // view parameters
  var result = 'Ok'; // assume success
  if (e.parameter == 'undefined') {
    result = 'No Parameters';
  }
  else {
    console.log(e.parameter)
    var sheet_id = '1vhevRpCGGGUjZ7rHDsCPbpQf9dCs08dYR8NWZE2VyrM'; 		// Spreadsheet ID
    var sheet = SpreadsheetApp.openById(sheet_id).getActiveSheet();		// get Active sheet
    var newRow = sheet.getLastRow() + 1;						
    var rowData = [];
    rowData[1] = new Date(); 											// Timestamp in column A
    for (var param in e.parameter) {
      Logger.log('In for loop, param=' + param);
      var value = stripQuotes(e.parameter[param]);
      Logger.log(param + ':' + e.parameter[param]);
      Logger.log("MY DEBUG"+param)
      switch (param) {

        case "id":
          rowData[0] = sheet.getLastRow() + 1;
          result+=' Written on column ID '
          break;
        case "temp": //Parameter
          rowData[2] = value; //Value in column B
          result += ' Written on column temp ';
          break;
        case "oxygen": //Parameter
          rowData[3] = value; //Value in column C
          result += ' Written on column oxygen ';
          break;
        case "pulse_rate": //Parameter
          rowData[4] = value; //Value in column C
          result += ' Written on column heart rate ';
          break;   
        case "bed_no": //Parameter
          rowData[5] = value; //Value in column C
          result += ' Written on column heart rate ';
          break; 
        default:
          result = "unsupported parameter";
      }
    }
    Logger.log(JSON.stringify(rowData));
    // Write new row below
    var newRange = sheet.getRange(newRow, 1, 1, rowData.length);
    newRange.setValues([rowData]);
  }
  // Return result of operation
  return ContentService.createTextOutput(result);
}
/**
* Remove leading and trailing single or double quotes
*/

function stripQuotes( value ) {
  return value.replace(/^["']|['"]$/g, "");
}
