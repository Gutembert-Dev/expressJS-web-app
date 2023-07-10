const {Shell}  = require(__dirname + '/Shell')
const fs       = require('fs')
var $          = require(__dirname + '/__mocks__/matchMedia').$
const parser   = require('xml2json')
var json2xml   = require('json2xml')
const { compose } = require('underscore')
var parseXML   = require(__dirname + '/xml-parse-from-string')
var capitalize = require(__dirname + '/capitalize')

// For VueJS, use ['v-model'] instead of .name
var forms = {
    getChildForm: function(relation, view) {
        var viewPath
        try{
          viewPath = Shell.getFileFromAddons(view, '.xml')
        }
        catch(e){
            console.log(e)
            return '<div></div>'
        }
        var xml = fs.readFileSync(viewPath, 'utf8')
        var json = JSON.parse(parser.toJson(xml));
        var newXml
        var form = $.parseHTML('<div></div>')
        if(!json.hasOwnProperty('camer') || !json.camer.hasOwnProperty('form'))
            return '<div></div>'
        var jsonForm = json.camer.form
        var fieldsToDisplayOnFormView = []
        for (var keyValue of Object.entries(jsonForm)) {
            var newJsonForm = {}
            if(typeof keyValue[1].type === 'undefined')
                newJsonForm[keyValue[0]] = ""
            else
                newJsonForm[keyValue[0]] = keyValue[1].type.toLowerCase()
            fieldsToDisplayOnFormView.push(newJsonForm)
            var newJson = {}
            keyValue[1]['v-model'] = keyValue[0]
            if(keyValue[1].type.toLowerCase() === 'textarea')
                newJson.textarea = keyValue[1]
            else
                newJson.input = keyValue[1]
            newXml = json2xml(newJson)
            xmlDoc = parseXML(newXml)
            xml2form = this.xmlToForm(relation, xmlDoc)
            $(form).append(xml2form)
        }
        form = $(form).html()
        console.log('form: ', form)
        return JSON.stringify({"form":form, "fieldsToDisplayOnFormView":fieldsToDisplayOnFormView})
    },

    // https://stackoverflow.com/questions/47977106/convert-xml-string-to-html-form-in-javascript
    // For VueJS, use 'v-model' instead of 'name'
    xmlToForm: function(relation, xmlDoc) {
        var framed_html = "<div id='formDiv'>";  
        if (xmlDoc.childNodes && xmlDoc.documentElement.childNodes) {
          var name = ""
          var label = ""
          var hidden = ""
          var tag = ""
          var inputChildren = ""
            for (var i = 0; i < xmlDoc.documentElement.childNodes.length; i++) {
                if(xmlDoc.documentElement.childNodes[i].nodeName === 'v-model'){
                    name = xmlDoc.documentElement.childNodes[i].firstChild.nodeValue
                    name = capitalize(name)
                }

                if(xmlDoc.documentElement.childNodes[i].nodeName === 'label'){
                    label = xmlDoc.documentElement.childNodes[i].firstChild.nodeValue
                }

                if(xmlDoc.documentElement.childNodes[i].nodeName === 'hidden'){
                    hidden = "hidden='" + xmlDoc.documentElement.childNodes[i].firstChild.nodeValue + "'"
                }

                if(xmlDoc.documentElement.childNodes[i].nodeName === 'tag'){
                    tag = xmlDoc.documentElement.childNodes[i].firstChild.nodeValue
                }

                if(relation !== "" && xmlDoc.documentElement.childNodes[i].nodeName === 'v-model')
                    inputChildren += xmlDoc.documentElement.childNodes[i].nodeName + "='" + relation + '[][' + xmlDoc.documentElement.childNodes[i].firstChild.nodeValue + "]'" + " "
                else
                    inputChildren += xmlDoc.documentElement.childNodes[i].nodeName + "='" + xmlDoc.documentElement.childNodes[i].firstChild.nodeValue + "'" + " "
            }
            if(tag === 'many2one' || tag === 'one2many' || tag === 'many2many')
              return framed_html
            if(label !== "")
                framed_html += "<div class='form-group col-sm' align='right'><label " + hidden + ">" + label + "</label>"
            else
              framed_html += "<div class='form-group col-sm' align='right'><label " + hidden + ">" + name + "</label>"
            framed_html += "\t<" + xmlDoc.childNodes[0].nodeName + " " + inputChildren + "/>"
        }
        return framed_html;
    },

    getForm: function(view) {
        return this.getChildForm("", view)
    },

    getTree: function(view){
        var viewPath
        try{
          viewPath = Shell.getFileFromAddons(view, '.xml')
        }
        catch(e){
            console.log(e)
            return '[]'
        }
        var xml = fs.readFileSync(viewPath, 'utf8')
        var json = JSON.parse(parser.toJson(xml))
        var tree = []
        if(!json.hasOwnProperty('camer') || !json.camer.hasOwnProperty('tree'))
            return '[]'
        var jsonTree = json.camer.tree
        for (var keyValue of Object.entries(jsonTree)) {
            var newJson = {}
            if(typeof keyValue[1].label === 'undefined')
                newJson[keyValue[0]] = ""
            else
                newJson[keyValue[0]] = keyValue[1].label
            tree.push(newJson)
        }
        return JSON.stringify(tree)
    }
}

module.exports = forms