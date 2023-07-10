var PropertiesReader = require('properties-reader');

class PropertyFile{ 

    static getProperties(filePath){
        var properties = new PropertiesReader(filePath); 
        return properties;
    }
}

module.exports = {PropertyFile};