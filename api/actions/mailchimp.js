import request from 'superagent';
const APIKEY = process.env.MAILCHIMP_APITOKEN;

export function post (req) {
    const {email, name, listId} = req.body;
    const LIST_URL = `https://us19.api.mailchimp.com/3.0/lists/${listId}/members`;
    const user = {
    	"email_address": email,
    	"status": "subscribed",
          "merge_fields": {
            "FNAME": name,
        }
    };
    return new Promise((resolve,reject) => {
        request.post(LIST_URL)
        .set('Content-Type', 'application/json;charset=utf-8')
        .set('Authorization', 'apikey ' + APIKEY)
        .send(user)
        .end((err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    });
};
