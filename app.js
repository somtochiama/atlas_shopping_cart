class ShoppingCart {
    constructor(listOfItems) {
        this.listOfItems = listOfItems;
    }

    addItem(item) {
        this.listOfItems.push(item);
        //update table
    }

    deleteItem(item) {
        let index = this.listOfItems.indexOf(item);
        this.listOfItems.splice(index, 1);
        //remove item from table
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

//Event handling
const addToCartBtn = document.getElementById('add_to_cart');
const table = document.getElementById('shopping-cart-table').getElementsByTagName('tbody')[0];

//User inputs
const productId = document.getElementById('Id');
const productDesc = document.getElementById('Description');
const productQty = document.getElementById('Quantity');
const productPrice = document.getElementById('Price');

addToCartBtn.addEventListener('click', (event) =>{
    event.preventDefault();
    console.log('Button has been clicked');

    let productIdVal = productId.value;
    let productDescVal = productDesc.value;
    let productQtyVal = productQty.value;
    let productPriceVal = productPrice.value;

    if(productIdVal == "" || productDescVal == "" || productQtyVal == "" || productPriceVal == ""){
        alert("YPlease fill all the input fields");
        return;
    }

    let newProduct = new Product(productIdVal, productDescVal, productPriceVal, productQtyVal);

    console.log(newProduct);

    //Populate table
    let row = table.insertRow(table.rows.length);
    let cell = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);

    cell.innerHTML = newProduct.id;
    cell2.innerHTML =newProduct.desc;
    cell3.innerHTML = newProduct.price;
    cell4.innerHTML = newProduct.quantity;
})