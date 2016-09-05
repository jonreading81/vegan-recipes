import fs from 'fs';

export default function deleteFile(source) {
  return new Promise(function(resolve, reject) {
    fs.unlink(source,function(err){
    if(err) return reject(err);
    resolve();
   });
  });
}