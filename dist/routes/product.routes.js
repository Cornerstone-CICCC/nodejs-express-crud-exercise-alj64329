"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const productRouter = (0, express_1.Router)();
const products = [
    {
        id: '1',
        product_name: "Apple",
        product_description: "Red fruit",
        product_price: 2.99
    },
    {
        id: '2',
        product_name: "Tomato",
        product_description: "Red Veg",
        product_price: 1.99
    }
];
/**
 * @route GET/products
 * @param {Request} req -Express request object
 * @param {Response} res - Express response object
 * @return {void} - Responds with product list
 */
productRouter.get("/", (req, res) => {
    res.status(200).json(products);
});
/**
 * @route POST/products
 * @param {Request} req -Express request object
 * @param {Response} res - Express response object
 * @return {void} - Responds with completion message
 */
productRouter.post("/", (req, res) => {
    const { product_name, product_description, product_price } = req.body;
    const newPro = {
        id: (0, uuid_1.v4)(),
        product_name,
        product_description,
        product_price
    };
    products.push(newPro);
    res.status(202).json(newPro);
});
/**
 * @route PUT/products/:id
 * @param {Request} req -Express request object
 * @param {Response} res - Express response object
 * @return {void} - Responds with completion message
 */
productRouter.put("/:id", (req, res) => {
    var _a, _b, _c;
    const { id } = req.params;
    const findIndex = products.findIndex(t => t.id = id);
    if (findIndex === -1) {
        res.status(404).send("Product not found");
        return;
    }
    const updates = Object.assign(Object.assign({}, products[findIndex]), { product_name: (_a = req.body.product_name) !== null && _a !== void 0 ? _a : products[findIndex].product_name, product_description: (_b = req.body.product_description) !== null && _b !== void 0 ? _b : products[findIndex].product_description, product_price: (_c = req.body.product_price) !== null && _c !== void 0 ? _c : products[findIndex].product_price });
    products[findIndex] = updates;
    res.status(202).json(products[findIndex]);
});
/**
 * @route GET/products/:id
 * @param {Request} req -Express request object containing id
 * @param {Response} res - Express response object
 * @return {void} - Responds with todo item with matching id
 */
productRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    const found = products.find(t => t.id === id);
    if (!found) {
        res.status(404).send("Product Not Found");
        return;
    }
    res.status(200).json(found);
});
/**
 * @route DELETE/products/:id
 * @param {Request} req -Express request object containing id
 * @param {Response} res - Express response object
 * @return {void} - Responds with deletion message
 */
productRouter.delete("/:id", (req, res) => {
    const { id } = req.params;
    const index = products.findIndex(t => t.id === id);
    if (index === -1) {
        res.status(404).send("Product not found");
        return;
    }
    products.splice(index, 1);
    res.status(200).send("Product deleted");
});
exports.default = productRouter;
