
//This class is instantiated with a list(array) of products the user has added to a cart
class ShoppingCart {
    constructor(listOfItems) {
        this.listOfItems = listOfItems; //Holds all the items that have been added to the shopping car
    }

    addItem(item) {
        this.listOfItems.push(item);
        this.setTotal(); //Calculates the total of the product that was just added
        updateTotalText(); //Updates the DOM to show the total pprice of items currently in the cart
    }

    deleteItem(item) {
        let index = this.listOfItems.indexOf(item);
        /*Removes the product from the listOfItems array which st
        ores all the items in the shopping cart */
        this.listOfItems.splice(index, 1); //
        this.setTotal(); //Calculates the total of the product that was just removed
        updateTotalText();
    }

    setTotal() {
        //Calculates the price of items that have been added
        this.listOfItems.forEach( product => {
            let total = product.price * product.quantity
            product.total = total;
        })
    }

    calcGrandTotal() {
        //Calculates the total of all the items in the shopping cart
        let grandTotal = 0;
        this.listOfItems.forEach( product => {
            grandTotal += product.total
        })
        return grandTotal;
    }
}

//This represents a product in the store
class Product {
    constructor(id, desc, price, quantity) {
        this.id = id;
        this.desc = desc;
        this.price = price;
        this.quantity = quantity;
    }
}

let myItems = []
//Creates an empty shopping cart
const myCart = new ShoppingCart(myItems);

//Event handling
const addProductBtn = document.getElementById('addProduct');
const allProducts = document.getElementById('allProducts');
const shoppingCart = document.getElementById('shoppingCart').getElementsByTagName('tbody')[0];
const totalPriceText = document.getElementById('grandTotal');


//User inputs
const productId = document.getElementById('Id');
const productDesc = document.getElementById('Description');
const productQty = document.getElementById('Quantity');
const productPrice = document.getElementById('Price');

addProductBtn.addEventListener('click', (event) =>{
    event.preventDefault();

    let productIdVal = productId.value;
    let productDescVal = productDesc.value;
    let productQtyVal = productQty.value;
    let productPriceVal = productPrice.value;

    if(productIdVal == "" || productDescVal == "" || productQtyVal == "" || productPriceVal == ""){
        alert("Please fill all the input fields");
        return;
    }

    let newProduct = new Product(productIdVal, productDescVal, productPriceVal, productQtyVal);

    //Insert the product into the all products table
    let newProductRow = allProducts.insertRow(allProducts.rows.length);

    //Creating the table row cells
    let newProductIdCell = newProductRow.insertCell(0);
    let newProductDescCell = newProductRow.insertCell(1);
    let newpriceCell = newProductRow.insertCell(2);
    let newqtyCell = newProductRow.insertCell(3);
    let newactionCell = newProductRow.insertCell(4);

    newProductIdCell.innerHTML = newProduct.id;
    newProductDescCell.innerHTML =newProduct.desc;
    newpriceCell.innerHTML = newProduct.price;
    newqtyCell.innerHTML = newProduct.quantity;

    let remove_btn = document.createElement('button');
    remove_btn.innerHTML = "REMOVE";
    remove_btn.addEventListener('click', removeItemFromList)
    let addToCartBtn = document.createElement('button');
    addToCartBtn.innerHTML = "ADD TO CART";
    addToCartBtn.addEventListener('click', (event) =>{
        //Add to shopping cart
        //Populate table
        myCart.addItem(newProduct);
    let newRow = shoppingCart.insertRow(shoppingCart.rows.length);

    let idCell = newRow.insertCell(0);
    let descCell = newRow.insertCell(1);
    let priceCell = newRow.insertCell(2);
    let qtyCell = newRow.insertCell(3);
    let actionCell = newRow.insertCell(4);

    idCell.innerHTML = newProduct.id;
    descCell.innerHTML =newProduct.desc;
    priceCell.innerHTML = newProduct.price;
    qtyCell.innerHTML = newProduct.quantity;

    let delete_btn = document.createElement('button');
    delete_btn.innerHTML = 'DELETE';
    delete_btn.classList.add('btn');
    delete_btn.classList.add('btn-danger');

    delete_btn.addEventListener('click', deleteProduct)
    actionCell.appendChild(delete_btn);
    })

    newactionCell.appendChild(remove_btn);
    newactionCell.appendChild(addToCartBtn);

})

function deleteProduct(){
    let tableRow = this.parentNode.parentNode;
    let tableCells = tableRow.getElementsByTagName('td');
    let productId = tableCells[0].innerText;
    let productDesc = tableCells[1].innerText;
    let productPrice = tableCells[2].innerText;
    let productQty = tableCells[3].innerText;

    let productToDelete = new Product(productId, productDesc, productPrice, productQty);
    myCart.deleteItem(productToDelete);
    console.log(productToDelete);
    tableRow.remove();
}

function updateTotalText(){
    //This updates the total text in the DOM to show the total price of items in the shopping cart
    let totalPrice = myCart.calcGrandTotal();
    totalPriceText.innerHTML = "Grand Total: " + totalPrice;
}

function removeItemFromList(){
    let tableRow = this.parentNode.parentNode;
    tableRow.remove();
}