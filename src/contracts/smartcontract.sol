// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductManagement {
    struct Product {
        string name;
        uint256 price;
        uint256 quantity;
        string[] size;
        string[] color;
        string desc;
    }

    mapping(uint256 => Product) public products;
    uint256 public productCount;

    event ProductAdded(uint256 indexed id);
    event ProductUpdated(uint256 indexed id);
    event ProductDeleted(uint256 indexed id);

    function addProduct(
        string memory name,
        uint256 price,
        uint256 quantity,
        string[] memory size,
        string[] memory color,
        string memory desc
    ) public {
        uint256 id = productCount;
        productCount++;
        products[id] = Product(name, price, quantity, size, color, desc);
        emit ProductAdded(id);
    }

    function updateProduct(
        uint256 id,
        string memory name,
        uint256 price,
        uint256 quantity,
        string[] memory size,
        string[] memory color,
        string memory desc
    ) public {
        require(id < productCount, "Invalid product ID"); // Sửa lỗi so sánh
        Product storage product = products[id];
        product.name = name;
        product.price = price;
        product.quantity = quantity;
        product.size = size;
        product.color = color;
        product.desc = desc;
        emit ProductUpdated(id);
    }

    function deleteProduct(uint256 id) public {
        require(id < productCount, "Invalid product ID"); // Sửa lỗi so sánh
        delete products[id];
        emit ProductDeleted(id);
    }

    function getProduct(uint256 id)
        public
        view
        returns (
            string memory name,
            uint256 price,
            uint256 quantity,
            string[] memory size,
            string[] memory color,
            string memory desc
        )
    {
        require(id < productCount, "Invalid product ID"); // Sửa lỗi so sánh
        Product storage product = products[id];
        return (
            product.name,
            product.price,
            product.quantity,
            product.size,
            product.color,
            product.desc
        );
    }

    function getProductById(uint256 id)
    public
    view
    returns (
        string memory name,
        uint256 price,
        uint256 quantity,
        string[] memory size,
        string[] memory color,
        string memory desc
    )
    {
    require(id < productCount, "Invalid product ID");
    Product storage product = products[id];
    return (
        product.name,
        product.price,
        product.quantity,
        product.size,
        product.color,
        product.desc
    );
}
}
