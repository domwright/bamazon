var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "parker",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  loadProducts();
});

function loadProducts() {
  console.log("Selecting All Products...\n");
  connection.query("SELECT * FROM products", function(err, products) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(products);
    var id = [];
    for (var i = 0; i < products.length; i++) {
      id.push(products[i].item_id);

    }

    selectId(id);
  });
}
loadProducts();

// function which prompts the user for what action they should take
function selectId(id) {
  console.log(id);
  inquirer
    .prompt([
      {
      name: "selectid",
      type: "number",
      message: "Select an ID of the product you would like to buy",
      validate: function(value) {
        if (id.includes(value)) {
          return true;
        }
        return false;
      }
    },
    {
      name: "quantity",
      type: "number",
      message: "How many units of this product would you like to buy?",
      validate: function(value) {
        if (isNaN(value) === false && value > 0) {
          return true;
        }
        return false;
      }
    }])
    .then(function(order) {
      console.log(order);
      var quantity = [];
      for (var i = 0; i < products.length; i++) {
        quantity.push(products[i].stock_quantity);
    }
    // If there isn't enough of the chosen product and quantity, let the user know and re-run loadProducts
    if (quantity > products[i].stock_quantity) {
      console.log("\nInsufficient quantity!");
      loadProducts();
    }
  });
}

// Check if your store has enough of the product to meet the customer's request.



//If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.



//However, if your store does have enough of the product, you should fulfill the customer's order.


//This means updating the SQL database to reflect the remaining quantity.
//Once the update goes through, show the customer the total cost of their purchase.
