const { Camer } = require(__dirname + '/../../../db/models/Camer');
const { Fields } = require(__dirname + '/../../../db/Fields');

class home extends Camer {
}

home.jsonSchema;
module.exports = {home};