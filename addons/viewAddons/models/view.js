const { Camer } = require(__dirname + '/../../../db/models/Camer');
const { Fields } = require(__dirname + '/../../../db/Fields');

class view extends Camer {
}

view.jsonSchema;
module.exports = {view};