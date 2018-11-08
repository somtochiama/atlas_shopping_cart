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
  

//     addToCart() {
//         myShop1.addItem(this)
//     }

//     deleteItem() {
//         //I used a dummy variable to indicate the list of products that 
//         //should contain all the classes instantiated when a products is created
//         let index = listOfProducts.indexOf(this);
//         listOfProducts.splice(index, 1);
      
//     }

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
    let newProductPriceCell = newProductRow.insertCell(2);
    let newProductQtyCell = newProductRow.insertCell(3);
    let newProductActionsCell = newProductRow.insertCell(4);

    newProductIdCell.innerHTML = newProduct.id;
    newProductDescCell.innerHTML =newProduct.desc;
    newProductPriceCell.innerHTML = newProduct.price;
    newProductQtyCell.innerHTML = newProduct.quantity;

    //Creates the remove and add to cart button
    let removeProductBtn = document.createElement('button');
    removeProductBtn.innerHTML = "REMOVE";
    removeProductBtn.classList.add('btn');
    removeProductBtn.classList.add('btn-danger');
    removeProductBtn.classList.add('removeBtn');

    removeProductBtn.addEventListener('click', removeProductFromStore)

    let addToCartBtn = document.createElement('button');
    addToCartBtn.innerHTML = "ADD TO CART";
    addToCartBtn.classList.add('btn');
    addToCartBtn.classList.add('btn-primary');
    addToCartBtn.addEventListener('click', (event) =>{
        //Add product to shopping cart
        myCart.addItem(newProduct);

        //Inserts a new row into the shopping cart table
        let newRow = shoppingCart.insertRow(shoppingCart.rows.length);

        //Creates cells for the newly created row
        let idCell = newRow.insertCell(0);
        let descCell = newRow.insertCell(1);
        let priceCell = newRow.insertCell(2);
        let qtyCell = newRow.insertCell(3);
        let actionCell = newRow.insertCell(4);

        idCell.innerHTML = newProduct.id;
        descCell.innerHTML =newProduct.desc;
        priceCell.innerHTML = newProduct.price;
        qtyCell.innerHTML = newProduct.quantity;

        let deleteFromCartBtn = document.createElement('button');
        deleteFromCartBtn.innerHTML = 'DELETE';
        deleteFromCartBtn.classList.add('btn');
        deleteFromCartBtn.classList.add('btn-danger');

        deleteFromCartBtn.addEventListener('click', deleteProductFromCart)
        actionCell.appendChild(deleteFromCartBtn);
    });

    //Appends the buttons to the actions cell
    newProductActionsCell.appendChild(removeProductBtn);
    newProductActionsCell.appendChild(addToCartBtn);

})

function deleteProductFromCart(){
    //Get the row that was clicked
    let tableRow = this.parentNode.parentNode;

    //Get the cells of the table row that was clicked
    let tableCells = tableRow.getElementsByTagName('td');

    let productToDeleteId = tableCells[0].innerText;
    let productToDeleteDesc = tableCells[1].innerText;
    let productToDeletePrice = tableCells[2].innerText;
    let productToDeleteQty = tableCells[3].innerText;

    let productToDelete = new Product(productToDeleteId, productToDeleteDesc,
         productToDeletePrice, productToDeleteQty);
    
    //Delete the item from the shopping cart
    myCart.deleteItem(productToDelete);
    tableRow.remove(); //Remove the row from the DOM
}

function updateTotalText(){
    /*This updates the total text in the DOM to show the total 
    price of items in the shopping cart*/
    let totalPrice = myCart.calcGrandTotal();
    totalPriceText.innerHTML = "Grand Total: " + totalPrice;
}

function removeProductFromStore(){
    let tableRow = this.parentNode.parentNode;
    tableRow.remove();
}


//     console.log(newProduct);

    //Populate table
//     let row = table.insertRow(table.rows.length);
//     let cell = row.insertCell(0);
//     let cell2 = row.insertCell(1);
//     let cell3 = row.insertCell(2);
//     let cell4 = row.insertCell(3);

//     cell.innerHTML = newProduct.id;
//     cell2.innerHTML =newProduct.desc;
//     cell3.innerHTML = newProduct.price;
//     cell4.innerHTML = newProduct.quantity;
// })