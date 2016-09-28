import request from 'superagent';
const wpAPI = 'http://blog.calloftheforest.com/wp-json/wp/v2/';
import _get from 'lodash/get';

export  function get (req) {
  return new Promise((resolve,reject) => {
    request.get(wpAPI+ req.url.substr(9)).end(function(err, _res){
      const json = {
        pages: _get(_res, 'headers.x-wp-totalpages'),
        page : _get(req, '.query.page'),
        docs: JSON.parse(_get(_res, 'text'))
      }
      resolve(json);
    });
  });
};