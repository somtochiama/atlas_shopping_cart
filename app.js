class ShoppingCart {
    constructor(listOfItems) {
        this.listOfItems = listOfItems;
    }

    addItem(item) {
        this.listOfItems.push(item);
    }

    deleteItem(item) {
        let index = this.listOfItems.indexOf(item);
        this.listOfItems.splice(index, 1);
    }

    setTotal() {
        this.listOfItems.forEach( product => {
            let total = product.price * product.quantity
            product.total = total;
        })
    }

    calcGrandTotal() {
        this.listOfItems.forEach( product => {
            let grandTotal = 0;
            grandTotal += product.total
        })
        return grandTotal;
    }
}

myItems = []
myCart = new ShoppingCart(myItems);

myItems = [
    {
        name:"bag",
        price: "20",
        quantity: "100"
    },
    {
        name:"quantum",
        price: "10",
        quantity: "50"      
    }
]


class Product {
    constructor(id, desc, price, quantity) {
        this.id = id;
        this.desc = desc;
        this.price = price;
        this.quantity = quantity;
    }

    addToCart() {
        myShop1.addItem(this)
    }

    deleteItem() {
        //I used a dummy variable to indicate the list of products that 
        //should contain all the classes instantiated when a products is created
        let index = listOfProducts.indexOf(this);
        listOfProducts.splice(index, 1);
    } 
}