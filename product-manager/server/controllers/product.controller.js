const { response } = require('express');
const { Product } = require('../models/product.model');

// Crear un nuevo producto
module.exports.createProduct = (req, res) => {
    const { title, price, description } = req.body;
    Product.create({ title, price, description })
        .then((product) => console.log("Product created successfully", product))
        .catch((error) => console.log("Something went wrong (createProduct)", error));
}

// Obtener todos los productos
module.exports.getAllProducts = (req, res) => {
    Product.find({})
        .then(products => res.json(products))
        .catch((error) => console.log("Something went wrong (getAllProducts)", error));
}

// Obtener un producto específico por su ID
module.exports.getOneProduct = (req, res) => {
    Product.findById(req.params.id)
        .then(product => res.json(product))
        .catch((error) => console.log("Something went wrong (getOneProduct)", error));
}

// Actualizar un producto
module.exports.updateProduct = (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updatedProduct => res.json(updatedProduct))
        .catch((error) => console.log("Something went wrong (updateProduct)", error));
}

// Eliminar un producto
module.exports.deleteProduct = (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch((error) => console.log("Something went wrong (deleteProduct)", error));
}
