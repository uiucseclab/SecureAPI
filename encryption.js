var crypto = require('crypto');

var key = new Buffer('9D8A25F94ECF7A256BC3959F5BFE57FB', 'hex');

function encrypt(data) {
    var cipher = crypto.createCipher('aes256', key);
    var encrypted = cipher.update(data, 'utf-8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
}

function decrypt(data) {
    var decipher = crypto.createDecipher('aes256', key);
    var decrypted = decipher.update(data, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');

    return decrypted;
}

exports.encrypt = encrypt;
exports.decrypt = decrypt;
