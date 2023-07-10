const { Camer } = require(__dirname + '/../../../db/models/Camer');
const { Fields } = require(__dirname + '/../../../db/Fields');

class nganpet extends Camer {
}

nganpet.jsonSchema;
module.exports = {nganpet};