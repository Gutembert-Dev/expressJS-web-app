const { Model } = require(__dirname + '/index');
const util = require('util');
const fs = require('fs');
const parser = require('xml2json');
const json_diff = require('json-diff');
const {Shell} = require(__dirname + '/../tools/Shell');

class Fields{

    static tableName(classObject){
    	var className = classObject.name.toLowerCase().toString();
    	return className;
    }

    static boolean(isBoolean){
        if(isBoolean == undefined){
    	   return false;
        }
        else if(typeof isBoolean !== undefined && util.isBoolean(isBoolean)){
    	   return isBoolean;
        }
        else{
    	   throw new Error('Invalid boolean argument');
        }
    }

    //Fields
/*integer — table.integer(name)

Adds an integer column.
bigInteger — table.bigInteger(name)

In MySQL or PostgreSQL, adds a bigint column, otherwise adds a normal integer. Note that bigint data is returned as a string in queries because JavaScript may be unable to parse them without loss of precision.
text — table.text(name, [textType])

Adds a text column, with optional textType for MySql text datatype preference. textType may be mediumtext or longtext, otherwise defaults to text.
string — table.string(name, [length])

Adds a string column, with optional length defaulting to 255.
float — table.float(column, [precision], [scale])

Adds a float column, with optional precision (defaults to 8) and scale (defaults to 2).
decimal — table.decimal(column, [precision], [scale])

Adds a decimal column, with optional precision (defaults to 8) and scale (defaults to 2). Specifying NULL as precision creates a decimal column that can store numbers of any precision and scale. (Only supported for Oracle, SQLite, Postgres)
boolean — table.boolean(name)

Adds a boolean column.
date — table.date(name)

Adds a date column.
datetime — table.datetime(name, options={[useTz: boolean], [precision: number]})

Adds a datetime column. By default PostgreSQL creates column with timezone (timestamptz type). This behaviour can be overriden by passing the useTz option (which is by default true for PostgreSQL). MySQL and MSSQL do not have useTz option.

A precision option may be passed:

table.datetime('some_time', { precision: 6 }).defaultTo(knex.fn.now(6))

time — table.time(name, [precision])

Adds a time column, with optional precision for MySQL. Not supported on Amazon Redshift.

In MySQL a precision option may be passed:

table.time('some_time', { precision: 6 })

timestamp — table.timestamp(name, options={[useTz: boolean], [precision: number]})

Adds a timestamp column. By default PostgreSQL creates column with timezone (timestamptz type) and MSSQL does not (datetime2). This behaviour can be overriden by passing the useTz option (which is by default false for MSSQL and true for PostgreSQL). MySQL does not have useTz option.

table.timestamp('created_at').defaultTo(knex.fn.now());

In PostgreSQL and MySQL a precision option may be passed:

table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));

In PostgreSQL and MSSQL a timezone option may be passed:

table.timestamp('created_at', { useTz: true });

timestamps — table.timestamps([useTimestamps], [defaultToNow])
Adds created_at and updated_at columns on the database, setting each to datetime types. When true is passed as the first argument a timestamp type is used instead. Both colums default to being not null and using the current timestamp when true is passed as the second argument. Note that on MySQL the .timestamps() only have seconds precision, to get better precision use the .datetime or .timestamp methods directly with precision.
dropTimestamps — table.dropTimestamps()

Drops the columns created_at and updated_at from the table, which can be created via timestamps.
binary — table.binary(name, [length])

Adds a binary column, with optional length argument for MySQL.
enum / enu — table.enu(col, values, [options])

Adds a enum column, (aliased to enu, as enum is a reserved word in JavaScript). Implemented as unchecked varchar(255) on Amazon Redshift. Note that the second argument is an array of values. Example:

table.enu('column', ['value1', 'value2'])

For Postgres, an additional options argument can be provided to specify whether or not to use Postgres's native TYPE:

table.enu('column', ['value1', 'value2'], { useNative: true, enumName: 'foo_type' })

It will use the values provided to generate the appropriate TYPE. Example:

CREATE TYPE "foo_type" AS ENUM ('value1', 'value2');

To use an existing native type across columns, specify 'existingType' in the options (this assumes the type has already been created):

Note: Since the enum values aren't utilized for a native && existing type, the type being passed in for values is immaterial.

table.enu('column', null, { useNative: true, existingType: true, enumName: 'foo_type' })

If you want to use existing enums from a schema, different from the schema of your current table, specify 'schemaName' in the options:

table.enu('column', null, { useNative: true, existingType: true, enumName: 'foo_type', schemaName: 'public' })

json — table.json(name)

Adds a json column, using the built-in json type in PostgreSQL, MySQL and SQLite, defaulting to a text column in older versions or in unsupported databases.

For PostgreSQL, due to incompatibility between native array and json types, when setting an array (or a value that could be an array) as the value of a json or jsonb column, you should use JSON.stringify() to convert your value to a string prior to passing it to the query builder, e.g.

knex.table('users')
  .where({id: 1})
  .update({json_data: JSON.stringify(mightBeAnArray)});

jsonb — table.jsonb(name)

Adds a jsonb column. Works similar to table.json(), but uses native jsonb type if possible.
uuid — table.uuid(name)

Adds a uuid column - this uses the built-in uuid type in PostgreSQL, and falling back to a char(36) in other databases.
comment — table.comment(value)

Sets the comment for a table.
engine — table.engine(val)

Sets the engine for the database table, only available within a createTable call, and only applicable to MySQL.
charset — table.charset(val)

Sets the charset for the database table, only available within a createTable call, and only applicable to MySQL.
collate — table.collate(val)

Sets the collation for the database table, only available within a createTable call, and only applicable to MySQL.
inherits — table.inherits(val)

Sets the tables that this table inherits, only available within a createTable call, and only applicable to PostgreSQL.
specificType — table.specificType(name, type)

Sets a specific type for the column creation, if you'd like to add a column type that isn't supported here.
index — table.index(columns, [indexName], [indexType])

Adds an index to a table over the given columns. A default index name using the columns is used unless indexName is specified. The indexType can be optionally specified for PostgreSQL and MySQL. Amazon Redshift does not allow creating an index.
dropIndex — table.dropIndex(columns, [indexName])

Drops an index from a table. A default index name using the columns is used unless indexName is specified (in which case columns is ignored). Amazon Redshift does not allow creating an index.
unique — table.unique(columns, [indexName])

Adds an unique index to a table over the given columns. A default index name using the columns is used unless indexName is specified.

knex.schema.alterTable('users', function(t) {
  t.unique('email')
})
knex.schema.alterTable('job', function(t) {
  t.unique(['account_id', 'program_id'])
})

foreign — table.foreign(columns, [foreignKeyName])[.onDelete(statement).onUpdate(statement).withKeyName(foreignKeyName)]

Adds a foreign key constraint to a table for an existing column using table.foreign(column).references(column) or multiple columns using table.foreign(columns).references(columns).inTable(table). A default key name using the columns is used unless foreignKeyName is specified. You can also chain onDelete() and/or onUpdate() to set the reference option (RESTRICT, CASCADE, SET NULL, NO ACTION) for the operation. You can also chain withKeyName() to override default key name that is generated from table and column names (result is identical to specifying second parameter to function foreign()). Note that using foreign() is the same as column.references(column) but it works for existing columns.

knex.schema.table('users', function (table) {
  table.integer('user_id').unsigned()
  table.foreign('user_id').references('Items.user_id_in_items')
})

dropForeign — table.dropForeign(columns, [foreignKeyName])

Drops a foreign key constraint from a table. A default foreign key name using the columns is used unless foreignKeyName is specified (in which case columns is ignored).
dropUnique — table.dropUnique(columns, [indexName])

Drops a unique key constraint from a table. A default unique key name using the columns is used unless indexName is specified (in which case columns is ignored).
dropPrimary — table.dropPrimary([constraintName])

Drops the primary key constraint on a table. Defaults to tablename_pkey unless constraintName is specified.
queryContext — table.queryContext(context)

Allows configuring a context to be passed to the wrapIdentifier hook for formatting table builder identifiers. The context can be any kind of value and will be passed to wrapIdentifier without modification.*/

    static one2Many(toClass, from, to){
        var json = {};
    	var key = toClass.name.toString().toLowerCase();
    	var value = {
              relation: Model.HasManyRelation,
              modelClass: toClass,
              join: {
                  from: from,
                  to: to
                }
            }
        json[key] = value;
        return json;
    }

    static many2One(toClass, from, to){
        var json = {};
        var key = toClass.name.toString().toLowerCase();
        var value = {
              relation: Model.BelongsToOneRelation,
              modelClass: toClass,
              join: {
                  from: from,
                  to: to
                }
            }
        json[key] = value;
        return json;
    }

    // //TODO
    // static many2Many(toClass, from, to){
    //   pets: {
    //     relation: Model.HasManyRelation,
    //     // The related model. This can be either a Model
    //     // subclass constructor or an absolute file path
    //     // to a module that exports one. We use a model
    //     // subclass constructor `Animal` here.
    //     modelClass: Animal,
    //     join: {
    //       from: 'persons.id',
    //       to: 'animals.ownerId'
    //     }
    //   },

    //   movies: {
    //     relation: Model.ManyToManyRelation,
    //     modelClass: Movie,
    //     join: {
    //       from: 'persons.id',
    //       // ManyToMany relation needs the `through` object
    //       // to describe the join table.
    //       through: {
    //         // If you have a model class for the join table
    //         // you need to specify it like this:
    //         // modelClass: PersonMovie,
    //         from: 'persons_movies.personId',
    //         to: 'persons_movies.movieId'
    //       },
    //       to: 'movies.id'
    //     }
    //   },

    //   children: {
    //     relation: Model.HasManyRelation,
    //     modelClass: Person,
    //     join: {
    //       from: 'persons.id',
    //       to: 'persons.parentId'
    //     }
    //   },

    //   parent: {
    //     relation: Model.BelongsToOneRelation,
    //     modelClass: Person,
    //     join: {
    //       from: 'persons.parentId',
    //       to: 'persons.id'
    //     }
    //   }
    // }

    static jsonSchema(classObject){
        var json = {
                camer: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                    }
                }
        };
        var className = classObject.name.toString();
        try{
            var filePath = Shell.getFileFromAddons(className, ".xml");
        }
        catch(e){
            console.log(e.message);
        }
        if(fs.existsSync(filePath)){
            if(this.testMode)
                console.log("XML filePath: ", filePath);
            var xml = fs.readFileSync(filePath, 'utf8');
            json = JSON.parse(parser.toJson(xml));
            if(!json.hasOwnProperty('camer') || !json.camer.hasOwnProperty('properties'))
                return {
                    camer: {
                        type: 'object',
                        properties: {
                            id: { type: 'integer' },
                        }
                    }
                };
            var properties = Object.entries(json.camer.properties);
            var fields = "";
            for(var property of properties){
                fields += "t." + property[1].type.toString() + "('" + property[0].toString() + "');";  // Use field.type, field.name ...
            }
            var tableName = classObject.tableName.toString().toLowerCase();
            var migrationFilePath = "";
            var jsonFilePath = "";
            try{
                migrationFilePath = Shell.getFileFromAddons("migrate" + className, ".js");
            }
            catch(e){
                migrationFilePath = util.format(__dirname + '/migrations/migrate%s.js', className);
            }
            try{
                jsonFilePath = Shell.getFileFromAddons(className, ".json");
            }
            catch(e){
                jsonFilePath = util.format(__dirname + '/jsonSchema/%s.json', className);
            }
            var newJson = json['camer']['properties'];
            newJson["table"] = {type:tableName};
            var addedfields = "";
            var deletedfields = "";
            var from = "";
            var to = "";
            if(!fs.existsSync(migrationFilePath)){
                this.createAndDropTable(classObject, fields);
            }
            if(fs.existsSync(jsonFilePath)){
                var jdiff = json_diff.diff(JSON.parse(fs.readFileSync(jsonFilePath, 'utf8')), newJson);
                if(typeof jdiff !== "undefined"){
                    var diffProperties = Object.entries(jdiff);
                    console.log('Changes: ', diffProperties);
                    for(var diffProperty of diffProperties){
                        if(diffProperty[0].includes('__added')){
                            addedfields += "t." + diffProperty[1].type.toString() + "('" + diffProperty[0].replace('__added', '') + "');";
                        }
                        if(diffProperty[0].includes('__deleted')){
                            deletedfields += "t.dropColumn" + "('" + diffProperty[0].replace('__deleted', '') + "');";
                        }
                        if(diffProperty[0] == "table"){
                            var table = diffProperty[1].type;
                            console.log('Table Name Changes: ', table);
                            from = table.__old;
                            to = table.__new;
                            this.changeTableName(classObject, from, to);
                            this.createAndDropTable(classObject, fields);
                        }
                    }
                    if(!(addedfields == "" && deletedfields == ""))
                        this.createAndDropColumns(classObject, addedfields, deletedfields);                        
                }
            }
            fs.writeFileSync(jsonFilePath, util.format("%j", newJson));
        }
    	return json['camer'];
    }
 
    static createAndDropTable(classObject, fields){
        var filePath = "";
        var migrations = util.format(
        	"exports.up = function(knex, Promise) {\n"
        +        "return knex.schema.createTable('%s', (t) => {\n"
        +			"t.increments('id').primary();\n"
        +			"t.timestamps(true, true);\n"
        +           "%s\n"
    	+		"});\n"
		+	"};\n"
		+	"exports.down = function(knex, Promise) {\n"
    	+		"return knex.schema.dropTable('%s');\n"
		+	"};", classObject.tableName.toLowerCase(), fields, classObject.tableName.toLowerCase()
		);
        if(this.testMode)
		    console.log("Migrations: ", migrations);
        var path = "";
        try{
            path = Shell.getDiectoryFromCamer("migrations");
        }
        catch(e){
            console.log(e.message);
            path = util.format(__dirname + '/migrations');
        }
        if(fs.existsSync(path)){
            filePath = path + '/migrate' + classObject.name.toString() + '.js';
            if(this.testMode)
                console.log("Migrations filePath: ", filePath);
            fs.writeFileSync(filePath, migrations);
        }
        return migrations;
    }

    static createAndDropColumns(classObject, addedfields, deletedfields){
        var filePath = "";
        var migrations = util.format(
            "exports.up = function(knex, Promise) {\n"
        +        "return knex.schema.table('%s', (t) => {\n"
        +           "%s\n"
        +       "});\n"
        +   "};\n"
        +   "exports.down = function(knex, Promise) {\n"
        +       "return knex.schema.table('%s', (t) => {\n"
        +           "%s\n"
        +       "});\n"
        +   "};", classObject.tableName.toLowerCase(), addedfields, classObject.tableName.toLowerCase(), deletedfields
        );
        if(this.testMode)
            console.log("Migrations: ", migrations);
        var path = "";
        try{
            path = Shell.getDiectoryFromCamer("migrations");
        }
        catch(e){
            console.log(e.message);
            path = util.format(__dirname + '/migrations');
        }
        if(fs.existsSync(path)){
            filePath = path + '/migrate' + classObject.name.toString() + 'ColumnChanges.js';
            if(this.testMode)
                console.log("Migrations filePath: ", filePath);
            fs.writeFileSync(filePath, migrations);
        }
        return migrations;
    }

    static changeTableName(classObject, from, to){
        var filePath = "";
        var migrations = util.format(
            "exports.up = function(knex, Promise) {\n"
        +        "return knex.schema.renameTable('%s', '%s');\n"
        +   "};\n"
        +   "exports.down = function(knex, Promise) {\n"
        +       "return;\n"
        +   "};", from, to
        );
        if(this.testMode)
            console.log("Migrations: ", migrations);
        var path = "";
        try{
            path = Shell.getDiectoryFromCamer("migrations");
        }
        catch(e){
            console.log(e.message);
            path = util.format(__dirname + '/migrations');
        }
        if(fs.existsSync(path)){
            filePath = path + '/migrate' + classObject.name.toString() + 'ATableChanges.js';
            if(this.testMode)
                console.log("Migrations filePath: ", filePath);
            fs.writeFileSync(filePath, migrations);
        }
        return migrations;
    }

    static getTestMode(){
        return this.testMode;
    }

    static setTestMode(testMode){
        this.testMode = testMode;
    }
}

module.exports = {Fields};

