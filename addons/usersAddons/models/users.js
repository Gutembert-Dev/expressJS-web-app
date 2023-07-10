const { Camer } = require(__dirname + '/../../../db/models/Camer');
const { Fields } = require(__dirname + '/../../../db/Fields');

class users extends Camer {
}

users.jsonSchema;
module.exports = {users};