const { Camer } = require(__dirname + '/../../../db/models/Camer');
const { Fields } = require(__dirname + '/../../../db/Fields');

class testn extends Camer {
}

testn.jsonSchema;
module.exports = {testn};