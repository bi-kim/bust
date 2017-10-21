var request = require("request");

class CK {
    sendData(opt, res) {
        request({
            "Host":"bus.ck.ac.kr",
            "Origin":"http://bus.ck.ac.kr",
            "user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3225.0 Safari/537.36",
            "Content-Type":"application/x-www-form-urlencoded",
            "accept-language":"en-US,en;q=0.8",
            "Cookie":"sid_test=" + opt.sid,
            uri:opt.url,
            method:"POST",
            formData:{ "data" : opt.req.body.datas }
        }, (error, response, body) => {
            res.send(200, body);
        });
    }
    getUUIDandSID(opt, res) {
        request({
            headers: {
                "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3225.0 Safari/537.36",
                'Content-Type': 'application/x-www-form-urlencoded',
                "accept-language": "en-US,en;q=0.8"
            },
            uri: opt.url,
            method: 'GET'
        }, function (error, response, body) {
            var sid = body.match(/var sid='.*?';/)[0];
            var uuid = body.match(/var UUID='.*?';/)[0];
            sid = sid.replace("var sid='", '').replace("\';", '');
            uuid = uuid.replace("var UUID='", '').replace("\';", '');
            res.json(200, {sid: sid, uuid: uuid});
        });
    }
}
module.exports = CK;