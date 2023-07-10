const { Camer } = require(__dirname + '/../../../db/models/Camer');
const { Fields } = require(__dirname + '/../../../db/Fields');

class CamerTechGut extends Camer {

    // Public and private field declarations are an experimental feature (stage 3) proposed at TC39, 
    // the JavaScript standards committee. 
    // Support in browsers is limited, but the feature can be used through a build step with systems like Babel.
    
    // static name = "";
    // static isOpen = false;
    // static age = 6;

    // constructor(name, isOpen, age){
    // 	this.name = name;
    // 	this.isOpen = isOpen;
    // 	this.age = age;
    // }

    static getName() {
        return this.name1;
    }

    static get getIsOpen() {
        return this.isOpen;
    }

    static get getAge() {
        return this.age;
    }

    static setName(name) {
        this.name1 = name;
    }

    static set setIsOpen(isOpen) {
        this.isOpen = isOpen;
    }

    static setAge(age) {
        this.age = age;
    }

    static maxAge() {
        return this.age + 5;
    }
}

CamerTechGut.jsonSchema;
// console.log('key: ', Object.getOwnPropertyNames(CamerTechGut));
module.exports = {CamerTechGut};

// CamerTechGut.setName('NG')
// CamerTechGut.setTitle('CT')
// console.log(CamerTechGut.name, ' ', CamerTechGut.getName(), ' ', CamerTechGut.title);

// CamerTechGut.setAge(3);
// console.log(CamerTechGut.name, ' ', CamerTechGut.maxAge(), ' ', CamerTechGut.age);