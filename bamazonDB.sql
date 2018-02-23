CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products
(
    item_id INTEGER NOT NULL
    AUTO_INCREMENT,
    product_name VARCHAR
    (100) NOT NULL,
    department_name VARCHAR
    (100) NOT NULL,
    price DECIMAL
    (10,2) default 0,
    stock_quantity INTEGER default 0,
    PRIMARY KEY
    (item_id)
);
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Fire TV", "ELECTRONICS", 69.99, 10000),
        ("Oakley Team USA Crowbar Goggles", "SPORTS and OUTDOORS", 155.00, 50),
        ("Tom Ford Black Orchid", "BEAUTY and PERSONAL CARE", 99.96, 75),
        ("PES 2018", "APPS and GAMES", 39.99, 200),
        ("FIFA 18", "APPS and GAMES", 59.99, 350),
        ("Gucci Canvas Baseball Hat", "CLOTHING, SHOES and JEWELRY", 325.00, 35),
        ("Microsoft Surface Book", "ELECTRONICS", 810.00, 55),
        ("CCENT/CCNA ICND1 100-105 Official Cert Guide", "BOOKS", 23.07, 125),
        ("Gucci Guccissima Leather Sneaker", "CLOTHING, SHOES and JEWELRY", 588.00, 25),
        ("Echo Dot", "ELECTRONICS", 49.99, 11000);