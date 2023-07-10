const { Camer } = require(__dirname + '/../../../db/models/Camer');
const { Fields } = require(__dirname + '/../../../db/Fields');

class api extends Camer {
}

api.jsonSchema;
module.exports = {api};