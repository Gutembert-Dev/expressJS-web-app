const { Camer } = require(__dirname + '/../../../db/models/Camer');
const { Fields } = require(__dirname + '/../../../db/Fields');

class gu extends Camer {
}

gu.jsonSchema;
module.exports = {gu};