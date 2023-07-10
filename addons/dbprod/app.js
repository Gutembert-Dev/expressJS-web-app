const app = require(__dirname + '/../../db/app').app

// Endpoints
app.use('/dbpro', require(__dirname + '/api/CamerTechGut').router)
app.use('/dbpro', require(__dirname + '/api/Sales').router)
app.use('/dbpro', require(__dirname + '/api/SaleDetails').router)