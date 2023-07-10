const { Camer } = require(__dirname + '/../../../db/models/Camer');
const { Fields } = require(__dirname + '/../../../db/Fields');

class apps extends Camer {
}

apps.jsonSchema;
module.exports = {apps};