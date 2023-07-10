const { Camer } = require(__dirname + '/../../../db/models/Camer');
const { Fields } = require(__dirname + '/../../../db/Fields');

class custom extends Camer {
}

custom.jsonSchema;
module.exports = {custom};