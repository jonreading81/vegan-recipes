var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async'); 

export function post(data) {
  return new Promise((resolve,reject) => {
    var doc = new GoogleSpreadsheet('1CpGwyOkyYG1aCEowexoPtOOwbzxXoOqDblp00ZSkNjc');
    var sheet;
    async.series([
      function setAuth(step) {
         var creds = require('../data/google.json');
        doc.useServiceAccountAuth(creds, function(err){
        if(err) reject(err);
          step();
        });
      },
      function getInfoAndWorksheets(step) {
        doc.getInfo(function(err, info) {
          if(err) reject(err);
          sheet = info.worksheets[0];
          step();
        });
      },
      function addRow(step){
        sheet.addRow(data, step);
      },
      function finish(step){
        resolve(data);
        step(data);
      }
    ]);
  });

}