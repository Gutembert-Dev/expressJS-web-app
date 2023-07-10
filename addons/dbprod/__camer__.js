//////////////////////////////////////////////////////////////////////////////
//
//    CamerTech, Software Solution
//    Copyright (C) 2020-2020 Camer Tech (<www.camer.tech>).
//
//////////////////////////////////////////////////////////////////////////////
module.exports = {
    mainApp: "sales",
    name: "Sales management",
    version: "1.0",
    author: "CamerTech SARL",
    category: 'Generic Modules/Sales',
    description: "Sales module that covers:\
    General sales\
    Sale details",
    website: 'http://www.camer.tech',
    init_xml: [],
    depends: ["db"],
    update_xml: [
        'views/Sales.xml',
        'views/SaleDetails.xml',
    ],
    app: __dirname + '/app.js',
    models: [
        __dirname + '/models/SaleDetails',
        __dirname + '/models/Sales',
        __dirname + '/models/CamerTechGut'
    ],
    images : [
        __dirname + '/images/icon.png',
        __dirname + '/images/bank_statement.jpeg'
    ],
    application: true
}
// vim:expandtab:smartindent:tabstop=4:softtabstop=4:shiftwidth=4:
