const express = require('express')
const router  = express.Router()
var getClass  = require(__dirname + '/../../tools/request-params-handler')


router.get('/:className', (req, res) => {
    const cls = getClass(req)
    if(typeof cls === "undefined")
    	return res.send("Thank you! Please refresh your browser.")
    else if(typeof cls === 'string'){
    	return res.send(cls)
    }
    else{
	    if(cls.className.relationMappings === null){
		    cls.className.query().then(classObject => {
				return res.send(classObject)
			})
	    }
	    else{
	    	Object.keys(cls.className.relationMappings).forEach(className_ids => {
	    		cls.className.query().withGraphFetched(className_ids).then(classObject => {
				    return res.send(classObject)
			    })
	    	})
	    }
	}	
})
 
router.get('/:className/:id', (req, res) => {
    const cls = getClass(req)
    if(typeof cls === "undefined")
    	return res.send("Thank you! Please refresh your browser.")
    else if(typeof cls === 'string'){
    	return res.send(cls)
    }
    else{
	    if(cls.className.relationMappings === null){
		    cls.className.query().where('id', cls.id).then(classObject => {
				return res.send(classObject)
			})
	    }
	    else{
	    	Object.keys(cls.className.relationMappings).forEach(className_ids => {
	    		cls.className.query().where('id', cls.id).withGraphFetched(className_ids).then(classObject => {
				    return res.send(classObject)
			    })
	    	})
	    }
	}
})

router.post('/:className', (req, res) => {
	let json = req.body
    const cls = getClass(req)
    if(typeof cls === "undefined")
    	return res.send("Thank you! Please refresh your browser.")
    else if(typeof cls === 'string'){
    	return res.send(cls)
    }
    else{
	    if(cls.className.relationMappings === null){
		    cls.className.query().insert(json).then(classObject => {
		    	console.log('New ' + cls.className.name + ' Id is: ' + classObject.id)
				return res.send(classObject)
			})
	    }
	    else{
    		cls.className.query().insertGraph(json).then(classObject => {
    			console.log('New ' + cls.className.name + ' Id is: ' + classObject.id)
			    return res.send(classObject)
		    })
	    }
	}
})
 
router.put('/:className', (req, res) => {
	let json = req.body
    const cls = getClass(req)
    if(typeof cls === "undefined")
    	return res.send("Thank you! Please refresh your browser.")
    else if(typeof cls === 'string'){
    	return res.send(cls)
    }
    else{
		cls.className.query().upsertGraph(json, { insertMissing: true }).then(classObject => {
			console.log('Updated ' + cls.className.name + ' Id: ' + classObject.id)
		    if(classObject !== 0){
				return res.send(classObject)
			}
			else{
				return res.sendStatus(404)
			}
	    })
	}
})

router.delete('/:className', (req, res) => {
    const cls = getClass(req)
    if(typeof cls === "undefined")
    	return res.send("Thank you! Please refresh your browser.")
    else if(typeof cls === 'string'){
    	return res.send(cls)
    }
    else{
	    cls.className.query().delete().then(classObject => {
	    	console.log('Deleted All ' + cls.className.name + ': ' + classObject)
			if(classObject !== 0){
				return res.sendStatus(200)
			}
			else{
				return res.sendStatus(404)
			}
		})
	}
})
 
router.delete('/:className/:id', (req, res) => {
    const cls = getClass(req)
    if(typeof cls === "undefined")
    	return res.send("Thank you! Please refresh your browser.")
    else if(typeof cls === 'string'){
    	return res.send(cls)
    }
    else{
	    cls.className.query().delete().where('id', cls.id).then(classObject => {
	    	console.log('Deleted ' + cls.className.name + ': ' + classObject)
			if(classObject !== 0){
		        return res.sendStatus(200)
			}
			else{
				return res.sendStatus(404)
			}
		})
	}
})

module.exports = {
    router
}