var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async'); 
var creds = require('../data/google.json');

export function post(data, request) {
  data.date = new Date();
  data.ip = (request.headers['x-forwarded-for'] || '').split(',')[0] || request.connection.remoteAddress;
  return new Promise((resolve,reject) => {
    var doc = new GoogleSpreadsheet(request.params.id);
    var sheet;
    async.series([
      function setAuth(step) {
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
