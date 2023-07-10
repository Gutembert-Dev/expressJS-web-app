const camer = require(__dirname + '/../../../db/api/Camer') 
const {SaleDetails} = require(__dirname + '/../models/SaleDetails')

const router = camer.router;
router.get('/saledetails', (req, res) => {
	console.log('I am in One API in addons')
	SaleDetails.query().then(allSaledetails => {
		return res.send(allSaledetails)
	})
})
 
router.get('/saledetails/:id', (req, res) => {
	let id = parseInt(req.params.id)
	SaleDetails.query().where('id', id).then(saledetails => {
		return res.send(saledetails)
	})
})

router.post('/saledetails', (req, res) => {
	let json = req.body
	SaleDetails.query().insert(json).then(newSaleDetails => {
		console.log('New Sale Details Id is: ' + newSaleDetails.id)
		return res.send(newSaleDetails)
	})
})

router.put('/saledetails', (req, res) => {
	let json = req.body
	let id = json.id
	SaleDetails.query().patch(json).where('id', id).then(updatedSaleDetails => {
		console.log('Updated Sale Details: ' + updatedSaleDetails)
		return res.send(json)
	})
})

router.delete('/saledetails', (req, res) => {
	SaleDetails.query().delete().then(deletedAllSaleDetails => {
		console.log('New Deleted All Sale Details: ' + deletedAllSaleDetails)
		if(deletedAllSaleDetails != 0){
			return res.sendStatus(200)
		}
		else{
			return res.sendStatus(404)
		}
	})
})

router.delete('/saledetails/:id', (req, res) => {
	let id = parseInt(req.params.id)
	SaleDetails.query().delete().where('id', id).then(deletedSaleDetails => {
		console.log('New Deleted Sale Details: ' + deletedSaleDetails)
		if(deletedSaleDetails == 1){
		    return res.sendStatus(200)
		}
		else{
			return res.sendStatus(404)
		}
	})
})

router.get('/saledetailsjsonschema', (req, res) => {
	res.json(SaleDetails.jsonSchema)
})

module.exports = {
    router
}
