const { Camer } = require(__dirname + '/../../../db/models/Camer');
const { Fields } = require(__dirname + '/../../../db/Fields');

class bb extends Camer {
}

bb.jsonSchema;
module.exports = {bb};