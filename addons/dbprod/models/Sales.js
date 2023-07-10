const { Camer } = require(__dirname + '/../../../db/models/Camer');
const { Fields } = require(__dirname + '/../../../db/Fields');
const { SaleDetails } = require('./SaleDetails');
const db = require(__dirname + '/../../../db/Database');

class Sales extends Camer {

    static get relationMappings() {
        return Fields.one2Many(SaleDetails, 'sales.id', 'saledetails.sales_id');
    }

        // NB: If a class has more than one relationMappings, separate them with coma. e.g:
    // static get relationMappings() {
    // 	let saledetails = Fields.one2Many(SaleDetails, 'sales.id', 'saledetails.sales_id').saledetails; OR let saledetails_ids = Fields.one2Many(SaleDetails, 'sales.id', 'saledetails.sales_id').saledetails;
    // 	let comments = Fields.one2Many(Comments, 'sales.id', 'comments.sales_id').comments;
    //     return {saledetails, comments}; 
               
    // }

    // getters and setters
    static getSubtotal(){
    	this.subtotal = 0;
    	this.saledetails.forEach(saledetail => {
    		this.subtotal += saledetail.price * saledetail.quantity;
    	})
    	return this.subtotal;
    } 

    static getTaxes(){
    	return this.taxes;
    } 

    static getTotal(){
    	this.total = this.subtotal + this.subtotal*this.taxes/100;
    	return this.total;
    }

    static setTaxes(taxes){
    	this.taxes = taxes;
    } 
}

Sales.jsonSchema;

const newSale = {
	// name: "NG",
	// id:2,
	subtotal: 60,
	taxes: 13,
	total: 70,
	// property saledetails because that's how we
	// call it in the relationMappings
	saledetails: [
	    {
	        product: "Milk21",
	        quantity: 10,
	        price: 4
	    },
	    {
	        product: "Banana21",
	        quantity: 2,
	        price: 3
	    }
	]
};
const newSaleDetail = {
	"product": "Yams",
	"quantity": 2,
	"price": 52
};
// db.insert(Sales, newSale);
// db.insert(SaleDetails, newSaleDetail);
// db.update(Sales, newSale);
// db.update(SaleDetails, [2, newSaleDetail]);
// db.remove(Sales, [3]);
// db.remove(SaleDetails, [10]);
// db.fetch(Sales, []);
// db.fetch(SaleDetails, [1]);
// db.execute(Sales, "query(trx).select('*')");
// db.execute(Sales, "query(trx).where( 'id', 1)");
// db.execute(Sales, "query(trx).delete().where('id', 1)");
Sales.saledetails = [{
	        product: 'Milk21',
	        quantity: 10,
	        price: 4
	    },
	    {
	        product: 'Banana21',
	        quantity: 2,
	        price: 3
	    }]
// Sales.setTaxes(15);
// console.log('Saledetails :', Sales.saledetails);
// console.log('Subtotal:', Sales.getSubtotal());
// console.log('Taxes :', Sales.getTaxes());
// console.log('Total :', Sales.getTotal());

module.exports = {Sales};
