const { Model } = require(__dirname + '/../index');
const { Fields } = require(__dirname + '/../Fields')

class Camer extends Model {
    static get tableName() {
        return Fields.tableName(this);
      
    }

    static get jsonSchema() {
        return Fields.jsonSchema(this);
    }

    static getTitle() {
        return this.title;
    }

    static setTitle(title) {
        this.title = title;
    }
}

Camer.jsonSchema;

module.exports = {Camer};
