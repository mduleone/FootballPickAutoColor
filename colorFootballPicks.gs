function colorCells() {
     Logger.clear();
     var ss = SpreadsheetApp.getActiveSpreadsheet();
     var sheet = ss.getSheets()[0];
     var range = sheet.getRange(41, 13, 16, 3);
     SpreadsheetApp.setActiveRange(range);
     var values = range.getValues();
     var cell = "";
     for (var row in values) {
          for (var col in values[row]) {
               var newRow = 41 + +row;
               var newCol = 13 + +col;
               cell = sheet.getRange(newRow, newCol, 1, 1).getA1Notation();
               colorCell(cell);
          }
     }
}

function colorCell(A1Not){
     var ss = SpreadsheetApp.getActiveSpreadsheet();
     var sheet = ss.getSheets()[0];
     Logger.log(A1Not);
     var dataRange = sheet.getRange(A1Not);
     //var dataRange = A1Not;
     var homeTeam = sheet.getRange(dataRange.getRowIndex(),11, 1, 1).getValue();
     var awayTeam = sheet.getRange(dataRange.getRowIndex(),12, 1, 1).getValue();
     var pick = dataRange.getValue();

     if(pick === ""){
          dataRange.setBackgroundRGB(255, 255, 255);
     }else if(pick == homeTeam){
          dataRange.setBackground("#8e7cc3");
     }else if(pick == awayTeam){
          dataRange.setBackground("#ffe599");
     }else{
     dataRange.setBackgroundRGB(255, 255, 255);
     }
     SpreadsheetApp.flush();
}

function onEdit(event){
     var sheet = SpreadsheetApp.getActiveSheet();
     var r = event.source.getActiveRange().getRowIndex();
     var c = event.source.getActiveRange().getColumnIndex();
     var cell = sheet.getRange(r,c).getA1Notation();
     //var cell = sheet.getRange(r,c);
     if (r >= 41 && r <= 56 && c >= 13 && c <= 15) {
          colorCell(cell);
     }
}

function onOpen(){
     colorCells();
}
