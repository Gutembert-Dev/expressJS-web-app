const { Camer } = require(__dirname + '/../../../db/models/Camer');
const { Fields } = require(__dirname + '/../../../db/Fields');

class newApp extends Camer {
}

newApp.jsonSchema;
module.exports = {newApp};