//////////////////////////////////////////////////////////////////////////////
//
//    CamerTech, Software Solution
//    Copyright (C) 2020-2020 Camer Tech (<www.camer.tech>).
//
//////////////////////////////////////////////////////////////////////////////

module.exports = {
    name: "Product management",
    version: "1.0",
    author: "CamerTech SARL",
    category: 'Generic Modules/Product',
    description: "Product module that covers:\
    General products\
    eCommerce",
    website: 'http://www.camer.tech',
    depends: ["db"],
    models: [
	__dirname + '/models/products'
	],
    images : [
        __dirname + '/images/icon.png'
    ],
    application: true
}