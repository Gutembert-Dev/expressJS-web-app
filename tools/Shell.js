const {exec}         = require('child_process');
var fs               = require("fs");
var util             = require("util");
var path             = require("path");
var walk             = require("walk");
var environments     = require(__dirname + '/environments');
const {PropertyFile} = require(__dirname + '/PropertyFile');
const capitalize = require(__dirname + '/capitalize');

class Shell{ 

   /**
    * @params command to execute on any Unix server
    * This method will execute a command on any Unix server
    */
    static executeCommand(command){
        exec(command, (error, stdout, stderr) => {
            if(error){
                console.log(`Error: ${error.message}`);
                return;
            }
            if(stderr){
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        })
    }

    /**
    * @params env to choose the migration environment
    * This method will upgrade all migrations on the given environment
    */
    static migrateDbTables(env){
        var latest = 'knex migrate:latest --env ' + env;
        this.executeCommand(latest);
    }
    
    /**
    * @params env to choose the migration environment
    * @params classNameDotjs is the class name with js extention to be downdraded and deleted
    * This method will migrate the given class name with js extention in the given environment
    */
    static migrateDbTable(env, classNameDotjs){ 
        var migrationFilePath = __dirname + '/../db/migrations';
        var migration = `for file in $(ls ${migrationFilePath}); do\
                          filePath="${migrationFilePath}/$file";\
                          case $filePath in\
                            *"${classNameDotjs}") knex migrate:up --env ${env} $file\
                            ;;\
                          esac\
                      done`;
        this.executeCommand(migration);
    }

    /**
    * @params env to choose the migration environment
    * This method will downgrade all migrations on the given environment
    */
    static rollbackDbTables(env){
        var rollback = 'knex migrate:rollback --env ' + env;
        this.executeCommand(rollback);
    }
 
    /**
    * @params env to choose the migration environment
    * @params classNameDotjs is the class name with js extention to be downdraded and deleted
    * This method will downgrade and delete the given migration class name with js extention in the given environment
    */
    static dropDbTable(env, classNameDotjs){
        var migrationFilePath = __dirname + '/../db/migrations';
        var remove = `sleep 3; for file in $(ls ${migrationFilePath}); do\
                          filePath="${migrationFilePath}/$file";\
                          case $filePath in\
                            *"${classNameDotjs}") knex migrate:down --env ${env} $file && rm $filePath\
                            ;;\
                          esac\
                      done`;
        this.executeCommand(remove);
    }

    /**
    * @params env to choose the migration environment
    * This method will give the status of all migrations on the given environment
    */
    static migrationDbStatus(env){
       var command = "knex migrate:status --env " + env;
        this.executeCommand(command);
    }

    /**
    * @params env to choose the migration environment
    * This method will downgrade and delete the matched migration class name with js extention in the given environment
    */
    static removeColumnAndTableMigrationFiles(env){
        var migrationFilePath = __dirname + '/../db/migrations';
        var remove = `sleep 3; for file in $(ls ${migrationFilePath}); do\
                          filePath="${migrationFilePath}/$file";\
                          SUB="Changes.js";\
                          case $filePath in\
                            *"$SUB") knex migrate:down --env ${env} $file && rm $filePath\
                            ;;\
                          esac\
                      done`;
        this.executeCommand(remove);
    }

    // Read: https://expedition.uno/traverse-read-files-in-the-file-system-using-node-js-and-node-walk/
    /**
    * @params targetedFile file name to look for
    * This method will look into Camer directory while excluding node_modules directory and print/return the matched absolute file path.
    * if no match, do nothing.
    */
    static walk(pathToFiles, targetedFile){
        "use strict";
        var options = {
            followLinks: true,
            filters: ["node_modules"]
        }
        var walker = walk.walk(pathToFiles, options);
        walker.on("names", function (root, nodeNamesArray) {
            nodeNamesArray.forEach(file => {
                if(file.includes(targetedFile)){
                    console.log("FilePath: " + root + "; Folder: " + path.basename(root) + "; File: " + file);
                    return path.join(root, file);
                }            
            })
        });
    }

    /**
    * This method will look into Camer directory while excluding node_modules directory and print/return the absolute file path of all files that matched __camer__.
    * if no match, do nothing.
    */
    static findAddons(){
        return this.walk('/home/log/Documents/devs/camer', '__camer__');
    }

    /**
    * This method will look into all addons directories while excluding node_modules directory 
    * and load all modules and apps defined in __camer__.js.
    * if no addons module and app found, load nothing.
    */
    static loadModules(){
        "use strict";
        var options = {
            followLinks: true,
            filters: ["node_modules"]
        }
        var properties = PropertyFile.getProperties(environments);
        properties.get('options.addons.path').split(",").forEach(addon => {
            var walker = walk.walk(addon, options);
            walker.on("names", function (root, nodeNamesArray) {
            nodeNamesArray.forEach(file => {
                if(file === '__camer__.js'){
                    var camerPath = path.join(root, file);
                    if(require(camerPath).hasOwnProperty('models'))
                        require(camerPath).models.forEach(model => {require(model)})
                    if(require(camerPath).hasOwnProperty('app'))
                        require(require(camerPath).app)
                }            
            })
        });
        });       
    }

    /**
    * This method will look into all addons directories while excluding node_modules directory 
    * and show any addon with an application set true in __camer__.js.
    * if no addons and/or application set to true found, show nothing.
    */
    static showApplications(){
        var apps = [];    
        function walkDir(currentPath) {
            var files = fs.readdirSync(currentPath);
            for (var i in files) {
                var curFile = path.join(currentPath, files[i]);
                var list = curFile.split('/')
                var fileName = list[list.length - 1]   
                if (fs.statSync(curFile).isFile() && fileName.toLowerCase() === '__camer__.js') {
                    if(require(curFile).hasOwnProperty('application') && require(curFile).application)
                        apps.push(require(curFile))
                } 
                else if (fs.statSync(curFile).isDirectory() && !curFile.includes('node_modules')) {
                    walkDir(curFile);
                }
            }
        };
        var properties = PropertyFile.getProperties(environments);
        properties.get('options.addons.path').split(",").forEach(addon => {
            walkDir(addon);
        });
        return apps  
    }

    // https://www.codexpedia.com/node-js/node-js-getting-files-from-a-directory-including-sub-directories/
    /**
    * @params targetedFile file name to look for
    * @params fileType file extension to llok for 
    * This method will look into all addons directories while excluding node_modules directory and return the matched absolute file path.
    * if no match, do throw an error exception.
    */
    static getFileFromAddons(targetedFile, fileType) {
        var filesToVerify = [];
        var fileToReturn = "";
        function walkDir(currentPath) {
            var files = fs.readdirSync(currentPath);
            for (var i in files) {
                var curFile = path.join(currentPath, files[i]);
                var list = curFile.split('/')
                var fileName = list[list.length - 1]   
                if (fs.statSync(curFile).isFile() && fileName.toLowerCase() === targetedFile.toLowerCase() + fileType) {
                    fileToReturn = curFile;
                    filesToVerify.push(fileToReturn);
                } 
                else if (fs.statSync(curFile).isDirectory() && !curFile.includes('node_modules')) {
                    walkDir(curFile);
                }
            }
            if(filesToVerify.length > 1){
                throw new Error('\nThere are more than one "' + fileType + '" file with the same name:\n' + filesToVerify.toString() + '\n Please ensure your file name is unique!\n');
            }
        };
        var properties = PropertyFile.getProperties(environments);
        properties.get('options.addons.path').split(",").forEach(addon => {
            walkDir(addon);
        });
        if(fileToReturn === ""){
                throw new Error('\nCould not find "' + targetedFile + fileType + '" file.\n Please ensure your file ' + targetedFile + fileType + ' is created and is unique!\n');
            }
        return fileToReturn; 
    }

    /**
    * @params targetedDir directory name to look for
    * This method will look into Camer directory while excluding node_modules directory and return the matched absolute directory path.
    * if no match, do throw an error exception.
    */
    static getDiectoryFromCamer(targetedDir) {
        var dir = __dirname + "/..";
        var dirsToVerify = [];
        function walkDir(currentPath) {
            var files = fs.readdirSync(currentPath);
            for (var i in files) {
                var curFile = path.join(currentPath, files[i]);      
                if (fs.statSync(curFile).isDirectory() && !curFile.includes('node_modules')) {
                    var list = curFile.split('/')
                    var dirName = list[list.length - 1] 
                    if(dirName === targetedDir){
                        dirsToVerify.push(curFile);
                    }
                    else
                        walkDir(curFile);
                }
            }
            if(dirsToVerify.length > 2){
                throw new Error('\nThere are more than one "' + targetedDir + '" directory with the same name:\n' + dirsToVerify.toString() + '\n Please ensure your "' + targetedDir + '" name is unique!\n');
            }
        };
        walkDir(dir);
        if(dirsToVerify.length == 0){
            throw new Error('\nCould not find "' + targetedDir + '" directory.\n Please ensure your directory ' + targetedDir + ' is created and is unique!\n');
        }
        if(dirsToVerify.length == 1)
            return dirsToVerify[0]; 
        if(dirsToVerify.length == 2)
            return dirsToVerify[1]; 
    }

    /**
    * @params targetedFile name received from the url
    * This method will look into all models in the addons and return the matching models absolute files path.
    */
    static getFilesFromModels(targetedFile) {
        var filesToVerify = [];
        function walkDir(currentPath) {
            var files = fs.readdirSync(currentPath);
            for (var i in files) {
                var curFile = path.join(currentPath, files[i]);
                var list = curFile.split('/')
                var fileName = list[list.length - 1];  
                if (fs.statSync(curFile).isFile() && fileName.toLowerCase() === targetedFile.toLowerCase() + '.js' && list[list.length - 2] === 'models') {
                    filesToVerify.push(curFile);
                } 
                else if (fs.statSync(curFile).isDirectory() && !curFile.includes('node_modules')) {
                    walkDir(curFile);
                }
            }
        };
        var properties = PropertyFile.getProperties(environments);
        properties.get('options.addons.path').split(",").forEach(addon => {
            walkDir(addon);
        });
        if(filesToVerify.length == 0)
            console.log('\nCan not find "' + targetedFile + '" file in models directory.\n Please ensure your file ' + targetedFile + ' is created in models and is unique!\n')
        if(filesToVerify.length > 1)
            console.log('\nThere are more than one "' + targetedFile + '" file with the same name in models:\n' + filesToVerify.toString() + '\n Please ensure your "' + targetedFile + '" name is unique in the models!\n')
        return filesToVerify; 
    }

    /**
    * @params fileName name to add to addons
    * This method will add the fileName in the addons and return the absolute fileName path.
    * if fileName already exists in addons, return a message.
    */
    static addFilesWithAddons(fileName) {
        var filesFromModels = this.getFilesFromModels(fileName);
        var addons = "";
        if(filesFromModels.length >= 1)
            return fileName + " already exists. Please chose a different name."
        else
        {
            try{
                addons = this.getDiectoryFromCamer("addons");
            }
            catch(e){
                console.log(e.message);
            }
            if(!fs.existsSync(addons + '/' + fileName + 'Addons')){
                fs.mkdirSync(addons + '/' + fileName + 'Addons');
                this.createManifest(addons + '/' + fileName + 'Addons' + '/' + '__camer__.js', fileName)
            }
            if(!fs.existsSync(addons + '/' + fileName + 'Addons' + '/' + 'models'))  fs.mkdirSync(addons + '/' + fileName + 'Addons' + '/' + 'models');
            if(!fs.existsSync(addons + '/' + fileName + 'Addons' + '/' + 'views'))  fs.mkdirSync(addons + '/' + fileName + 'Addons' + '/' + 'views');
            if(!fs.existsSync(addons + '/' + fileName + 'Addons' + '/' + 'models' + '/' + fileName + '.js')) this.createModel(addons + '/' + fileName + 'Addons' + '/' + 'models' + '/' + fileName + '.js', fileName);
            if(!fs.existsSync(addons + '/' + fileName + 'Addons' + '/' + 'views' + '/' + fileName + '.xml')) this.createView(addons + '/' + fileName + 'Addons' + '/' + 'views' + '/' + fileName + '.xml');
            require(addons + '/' + fileName + 'Addons' + '/' + 'models' + '/' + fileName);
            this.migrateDbTable(require(__dirname + '/../db/app').env, fileName + '.js');
        }
        console.log("New file created: ", this.getFilesFromModels(fileName))
        return this.getFilesFromModels(fileName); 
    }

    /**
    * @params fileName name to remove whit addons
    * This method will remove the fileName with the addons and return the absolute fileName path.
    * if fileName already does not exist in addons, return a message.
    */
    static removeFilesWithAddons(fileName) { // NB: when removind file/app, do not drop the db! rename it then back up and remove the addon. 
        var filesFromModels = this.getFilesFromModels(fileName);
        var addons = "";
        if(filesFromModels.length == 0)
            return fileName + " The given file does not exist or was already removed. Please chose a correct name."
        else
        {
            try{
                addons = this.getDiectoryFromCamer("addons");
            }
            catch(e){
                console.log(e.message);
            }
            if(fs.existsSync(addons + '/' + fileName + 'Addons')) {
                console.log('This addons was found: "' + addons + '/' + fileName + 'Addons" ' + 'and will be removed.')
                var jsonFile = "";
                try{
                    jsonFile = this.getFileFromAddons(fileName, '.json');
                }
                catch(e)
                {
                    console.log(e.message);
                }
                this.executeCommand('rm -rf ' + jsonFile.trim());
                var addonsPath = addons + '/' + fileName + 'Addons';
                this.executeCommand('rm -rf ' + addonsPath.trim());
                this.dropDbTable(require(__dirname + '/../db/app').env, fileName + '.js');
            }
        }
        console.log("addons removed: ", addons + '/' + fileName + 'Addons')
        return addons + '/' + fileName + 'Addons'; 
    }

    /**
    * @params filePath to write the model
    * @params modelName to create a class name
    * This method will create a model.
    */
    static createModel(filePath, modelName){
        var model = util.format(
            "const { Camer } = require(__dirname + '/../../../db/models/Camer');\n"
            +"const { Fields } = require(__dirname + '/../../../db/Fields');\n\n"
            +"class %s extends Camer {\n"
            +"}\n\n"
            +"%s.jsonSchema;\n"
            +"module.exports = {%s};", modelName, modelName, modelName
        );
        fs.writeFileSync(filePath, model);
        return model;
    }

    /**
    * @params filePath to write the view
    * This method will create a view.
    */
    static createView(filePath){
        var view = util.format(
            '<camer type="object">\n'
            +    '<properties>\n'
            +        '<subtotal type="integer"></subtotal>\n'
            +        "<taxes type='integer'></taxes>\n"
            +        '<total type="integer"></total>\n'
            +        '<name type="string"></name>\n'
            +        '<comment type="string"></comment>\n'
            +    '</properties>\n'
            +    '<form>\n'
            +        '<name type="text"></name>\n'
            +        '<subtotal type="number" label="Sub Total"></subtotal>\n'
            +        "<taxes type='number'></taxes>\n"
            +        '<total type="number" label="Total price"></total>\n'
            +        '<comment type="textarea"></comment>\n'
            +    '</form>\n'
            +    '<tree>\n'
            +        '<id></id>\n'
            +        '<name></name>\n'
            +        '<subtotal label="Sub Total"></subtotal>\n'
            +        "<taxes/>\n"
            +        '<total label="Total price"></total>\n'
            +    '</tree>\n'
            +'</camer>'
        );
        fs.writeFileSync(filePath, view);
        return view;
    }

    /**
    * @params filePath to write the manifest
    * @params modelName to create a model's path in the manifest
    * This method will create a manifest.
    */
    static createManifest(filePath, modelName){
        var manifest = util.format(
            "//////////////////////////////////////////////////////////////////////////////\n"
            + "//\n"
            + "//    CamerTech, Software Solution\n"
            + "//    Copyright (C) 2020-2020 Camer Tech (<www.camer.tech>).\n"
            + "//\n"
            + "//////////////////////////////////////////////////////////////////////////////\n\n"
            + "module.exports = {\n"
            +    'name: "%s management",\n'
            +    'version: "1.0",\n'
            +    'author: "CamerTech SARL",\n'
            +    "category: '',\n"
            +    'description: "",\n'
            +    "website: 'http://www.camer.tech',\n"
            +    "models: [\n"
            +        "__dirname + '/models/%s'\n"
            +    "],\n"
            +    "application: true\n"
            +"}", capitalize(modelName), modelName
        );
        fs.writeFileSync(filePath, manifest);
        return manifest;
    }
    
}

module.exports = {Shell};