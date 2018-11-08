
//This class is instantiated with a list(array) of products the user has added to a cart
class ShoppingCart {
    constructor(listOfItems) {
        this.listOfItems = listOfItems;
    }

    addItem(item) {
        this.listOfItems.push(item);
        console.log("After Adding",this.listOfItems);
        this.setTotal();
        updateTotal();
    }

    deleteItem(item) {
        let index = this.listOfItems.indexOf(item);
        this.listOfItems.splice(index, 1);
        this.setTotal();
        updateTotal();
        console.log("After Deleting",this.listOfItems);
    }

    setTotal() {
        this.listOfItems.forEach( product => {
            let total = product.price * product.quantity
            product.total = total;
        })
    }

    calcGrandTotal() {
        let grandTotal = 0;
        this.listOfItems.forEach( product => {
            grandTotal += product.total
        })
        return grandTotal;
    }
}

let myItems = []
const myCart = new ShoppingCart(myItems);

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
const totalPriceText = document.getElementById('grand-total');
const allItemTable = document.getElementById('all-items-table');

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
    //myCart.addItem(newProduct);

    console.log(newProduct);

    let newItemRow = allItemTable.insertRow(allItemTable.rows.length);
    let newidCell = newItemRow.insertCell(0);
    let newdescCell = newItemRow.insertCell(1);
    let newpriceCell = newItemRow.insertCell(2);
    let newqtyCell = newItemRow.insertCell(3);
    let newactionCell = newItemRow.insertCell(4);

    newidCell.innerHTML = newProduct.id;
    newdescCell.innerHTML =newProduct.desc;
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
    let newRow = table.insertRow(table.rows.length);

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

function updateTotal(){
    let totalPrice = myCart.calcGrandTotal();
    totalPriceText.innerHTML = "Grand Total: " + totalPrice;
}

function removeItemFromList(){
    let tableRow = this.parentNode.parentNode;
    tableRow.remove();
}