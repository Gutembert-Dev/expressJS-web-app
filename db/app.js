const {Shell} = require(__dirname + '/../tools/Shell')
const {Fields} = require(__dirname + '/Fields')
Shell.loadModules()

var testMode = false
var env      = 'development'
if(process.argv.length == 3 || process.argv.length == 4){
	if(process.argv.length == 3){
		var val = process.argv[2]
	    if(val === 'test'){
	        testMode = true
	    }else{
	        env = val
	    }
	}
	if(process.argv.length == 4){
		var val = process.argv[2]
	    if(val === 'test'){
	        testMode = true
	    }else{
	        env = val
	    }
	    var val = process.argv[3]
	    if(val === 'test'){
	        testMode = true
	    }else{
	        env = val
	    }
	}
}
Fields.setTestMode(testMode)
const express = require('express')
var cors      = require('cors')

const port = process.env.PORT || 3000

const app = express()
app.use(
		cors(
		    {
		    	origin: "http://localhost:8080"
		    }
		)
	)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Endpoints
app.use('/', require(__dirname + '/api/Camer').router)
app.use('/api', require(__dirname + '/api/Api').router)
app.use('/apps', require(__dirname + '/api/Apps').router)

app.listen(port, () => {
	console.log('Listening on port: ' + port)
})

Shell.migrateDbTables(env)
Shell.removeColumnAndTableMigrationFiles(env)
// Shell.removeFilesWithAddons('report');

module.exports = {app, env}