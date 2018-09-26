import request from 'superagent';
const APIKEY = process.env.MAILCHIMP_APITOKEN;
const LIST_URL = 'https://us19.api.mailchimp.com/3.0/lists/bec0c373cc/members';

export function post (req) {
    const {email, firstname, surname} = req.body;
    const user = {
    	"email_address": email,
    	"status": "subscribed",
          "merge_fields": {
            "FNAME": firstname,
            "LNAME": surname
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
