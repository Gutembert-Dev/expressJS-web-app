const {Shell} = require(__dirname + '/Shell')
var treeForm     = require(__dirname + '/xml-and-tree-form-hadler')

module.exports = function getClass(req) { // getClass = function(req) {  OR getClass = (req) => { NB: Also implement getReport '/camer/report/<classname.pdf>'
  var obj = req.params
  var name = ''
  var id = ''
  if(obj.hasOwnProperty('id')){
      name = obj.className.toString()
      id = obj.id
      if(id === 'form')
        return treeForm.getForm(name)
      if(id === 'tree') 
        return treeForm.getTree(name)
      id = parseInt(id)
      if(isNaN(id)){
        console.log("Invalid ID: ", obj.id)
        return 'The provided id: "' + obj.id + '" is not a number. Please provide a correct value!'
      }
  }
  else {
      name = obj.className.toString()
  }
  var classNamePath = Shell.getFilesFromModels(name)
  if(classNamePath.length === 0){ // This is for future use when the end user can create his/her own app from frontend.
    var addedFiles = Shell.addFilesWithAddons(name); // the user will be able to add/delete fields, change table name ... from UI. NB: at each save/update, the app service will restart.
    getClass(req);                                  // Use Vue for uder drag and drop at the UI. Also to create forms on the fly: https://alligator.io/vuejs/v-runtime-template/
    // return '\nWrong url: ' + req.baseUrl + req.url + '.\nCan not find "' + name + '" file.'
  }
  else if(classNamePath.length === 1){
      console.log('Path: ', classNamePath[0])
      const cls = require(classNamePath[0].replace('.js', ""))
      name = Object.keys(cls)[0]
      console.log('cls: ', cls, 'name: ', name)
      const className = cls[name]
      return {className, id}
  }
  else{
      return '\nWrong url: ' + req.params.className + '/' + req.params.id + '\nFound more than one "' + name + '"'
  }
}