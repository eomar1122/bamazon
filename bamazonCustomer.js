var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');


var connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'bamazon'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('connected as id: ' + connection.threadId)
    showAll();
});

//===============================
// FUNCTIONS
//===============================

// Show all items with their information in products table
function showAll() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err
        var productobjsArr = [];
        res.forEach(function (productObj) {
            var productArr = [];
            for (var key in productObj) {
                productArr.push(productObj[key]);
            }
            productobjsArr.push(productArr);
        });

        var table = new Table({
            head: ['Product ID', 'Product Name', 'Department Name', 'Price', 'Stock Quantity']
        });

        productobjsArr.forEach(function (produsts) {
            table.push(produsts);
        })

        console.log("\n");
        console.log(table.toString());
        console.log("\n");

        placeOrder();
    });
}

// Place an order function by asking user to enter some information
function placeOrder() {
    inquirer.prompt([
        {
            name: 'pickedId',
            message: 'Please enter the ID for the item you would like to purshase?',
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true
                }
                return 'Please enter a valid product ID!'
            }
        },
        {
            name: 'pickedQuantity',
            message: 'How many of this product would you like to order?',
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true
                }
                return 'Please enter a number'
            }
        }
    ]).then(function (userInput) {
        // Read from the products table with specific ID
        connection.query('SELECT * FROM products WHERE item_id = ?', [userInput.pickedId], function (err, res) {
            if (userInput.pickedQuantity > res[0].stock_quantity) {
                console.log(`-----------------------------------`);
                console.log(`\nInsufficient quantity!\n`);
                console.log(`Sorry we are not able to finish your order! Please try again\n`);
                console.log(`-----------------------------------\n`);
                // Call new order function
                newOrder();
            }
            else {
                var total = res[0].price * userInput.pickedQuantity;
                console.log(`-----------------------------------`);
                console.log(`\nThanks for your order\n`);
                console.log(`Your total: $${total}\n`);
                console.log(`-----------------------------------\n`);

                // Update the item quantity 
                connection.query('UPDATE products SET ? Where ?', [{
                    stock_quantity: res[0].stock_quantity - userInput.pickedQuantity
                }, {
                    item_id: userInput.pickedId
                }], function (err, res) { });
                // Call new order function
                newOrder();
            }
        })

    }, function (err, res) { })
};

// New order function
function newOrder() {
    inquirer.prompt([{
        type: 'confirm',
        name: 'choice',
        message: 'Would you like to purshase something else?'
    }]).then(function (userInput) {
        if (userInput.choice) {
            showAll();
        }
        else {
            console.log('\nThank you for shopping with us!\n');
            connection.end();
        }
    })
};

