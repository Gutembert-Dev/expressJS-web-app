const { Camer } = require(__dirname + '/../../../db/models/Camer');
const { Fields } = require(__dirname + '/../../../db/Fields');

class test extends Camer {
}

test.jsonSchema;
module.exports = {test};