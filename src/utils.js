import CryptoJS from 'crypto-js';

class Utils {

}

class Security extends Utils {
    /**
     * uuid로 Object를 암호화합니다.
     * @param {*} o
     * @param {*} uuid
     * @param {*} sid
     */
    encryptByUUID(o, uuid, sid) {
        var data = CryptoJS.AES.encrypt(JSON.stringify(o), uuid, {
            format: { // CryptoJSAesJson Object.
                stringify: function (cipherParams) {
                    var j = {ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)};
                    if (cipherParams.iv) j.iv = cipherParams.iv.toString();
                    if (cipherParams.salt) j.s = cipherParams.salt.toString();
                    return JSON.stringify(j);
                },
                parse: function (jsonStr) {
                    var j = JSON.parse(jsonStr);
                    var cipherParams = CryptoJS.lib.CipherParams.create({ciphertext: CryptoJS.enc.Base64.parse(j.ct)});
                    if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv);
                    if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s);
                    return cipherParams;
                }
            }
        });
        data        = JSON.parse(data);
        data['key'] = sid;
        data        = JSON.stringify(data);
        return data;
    }
    /**
     * uuid로 암호화된 String을(를) 복호화합니다.
     * @param {*} s
     * @param {*} uuid
     */
    decryptByUUID(s, uuid) {
        var data = CryptoJS.AES.decrypt(s, uuid, {
            format: { // CryptoJSAesJson Object.
                stringify: function (cipherParams) {
                    var j = {ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)};
                    if (cipherParams.iv) j.iv = cipherParams.iv.toString();
                    if (cipherParams.salt) j.s = cipherParams.salt.toString();
                    return JSON.stringify(j);
                },
                parse: function (jsonStr) {
                    var j = JSON.parse(jsonStr);
                    var cipherParams = CryptoJS.lib.CipherParams.create({ciphertext: CryptoJS.enc.Base64.parse(j.ct)});
                    if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv);
                    if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s);
                    return cipherParams;
                }
            }
        }).toString(CryptoJS.enc.Utf8);
        return data;
    }
}

export { Utils, Security };