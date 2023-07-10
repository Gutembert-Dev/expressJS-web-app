const camer = require(__dirname + '/../../../db/api/Camer')
const {Sales} = require(__dirname + '/../models/Sales')

const router = camer.router;
router.get('/sales', (req, res) => {
	console.log("In Sales API")
	Sales.query().withGraphFetched('saledetails').then(sales => {
		return res.send(sales)
	})
})
 
router.get('/sales/:id', (req, res) => {
	let id = parseInt(req.params.id)
	Sales.query().where('id', id).withGraphFetched('saledetails').then(sales => {
		return res.send(sales)
	})
})

router.post('/sales', (req, res) => {
	let json = req.body
	Sales.query().insertGraph(json).then(newSales => {
		console.log('New Sale Id is: ' + newSales.id)
		return res.send(newSales)
	})
})

router.put('/sales', (req, res) => {
	let json = req.body
	Sales.query().upsertGraph(json).then(updatedSales => {
		console.log('Updated Sales: ' + updatedSales)
		return res.send(json)
	})
})

router.delete('/sales', (req, res) => {
	Sales.query().delete().then(deletedAllSales => {
		console.log('Deleted All Sales: ' + deletedAllSales)
		if(deletedAllSales != 0){
			return res.sendStatus(200)
		}
		else{
			return res.sendStatus(404)
		}
	})
})

router.delete('/sales/:id', (req, res) => {
	let id = parseInt(req.params.id)
	Sales.query().delete().where('id', id).then(deletedSales => {
		console.log('Deleted Sales: ' + deletedSales)
		if(deletedSales == 1){
		    return res.sendStatus(200)
		}
		else{
			return res.sendStatus(404)
		}
	})
})

router.get('/salesjsonschema', (req, res) => {
		res.json(Sales.jsonSchema)
})

module.exports = {
    router
}
