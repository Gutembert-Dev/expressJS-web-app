const { Camer } = require(__dirname + '/../../../db/models/Camer');
const { Fields } = require(__dirname + '/../../../db/Fields');
const db = require(__dirname + '/../../../db/Database');
// const { Sales } = require('./Sales');

class SaleDetails extends Camer {

    // This many to one relationship mapping is NOT necessary because one to many is compulsory in 'Sales' class. 
    // static get relationMappings() {
    //     return Fields.many2One(Sales, 'saledetails.sales_id', 'sales.id');
    // }

            // NB: If a class has more than one relationMappings, separate them with coma. e.g:
    // static get relationMappings() {
    // 	let sales = Fields.many2One(Sales, 'saledetails.sales_id', 'sales.id').sales; OR let sales_id = Fields.many2One(Sales, 'saledetails.sales_id', 'sales.id').sales;
    // 	let comments = many2One(Comments, 'saledetails.comments_id', 'comments.id').comments;;
    //     return {sales, comments}; 

    // getters and setters
    static getProduct(){
        return this.product;
    }

    static getQuantity(){
        return this.quantity;
    }
    
    static getPrice(){
        return this.price;
    }

    static getTotalPrice(){
        return this.totalPrice = this.price * this.quantity;
    }

    static getSales_id(){
        return this.sales_id;
    }

    static setProduct(product){
        this.product = product;
    }

    static setQuantity(quantity){
        this.quantity = quantity;
    }
    
    static setPrice(price){
        this.price = price;
    }
    static setSales_id(sales_id){
        this.sales_id = sales_id;
    }

    // maybe use methods as for Vue JS
  //   methods: {
  //   addComment: function () {
  //     this.comments.push(this.newComment)
  //     this.newComment = ''
  //   }
  // }   
  // OR:
    static methods(){
        return {
            getTotalPrice: function () {
                this.totalPrice = this.price * this.quantity
           }
        }
    }
    static computed(){
        return {
            totalPrice(){ return this.price * this.quantity }
        }
    }
}

SaleDetails.jsonSchema;

const newSaleDetail = {
	"product": "YamsGUT",
	"quantity": 2,
	"price": 5
};

// db.insert(SaleDetails, newSaleDetail);

module.exports = {SaleDetails};
