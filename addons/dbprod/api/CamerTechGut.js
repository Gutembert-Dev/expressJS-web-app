const camer = require(__dirname + '/../../../db/api/Camer')
const {CamerTechGut} = require(__dirname + '/../models/CamerTechGut')

const router = camer.router;
router.get('/camertechgut', (req, res) => {
	CamerTechGut.query().then(camertechgut => {
		res.json(camertechgut)
	})
})
 
router.get('/camertechgut/:id', (req, res) => {
	let id = parseInt(req.params.id)
	CamerTechGut.query().where('id', id).withGraphFetched('users').then(camertechgut => {
		res.json(camertechgut)
	})
})

router.get('/camertechgutjsonschema', (req, res) => {
		res.json(CamerTechGut.jsonSchema)
})

module.exports = {
    router
}
