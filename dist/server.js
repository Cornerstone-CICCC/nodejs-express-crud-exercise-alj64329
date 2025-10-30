"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const welcome_middleware_1 = require("./middleware/welcome.middleware");
const product_routes_1 = __importDefault(require("./routes/product.routes"));
dotenv_1.default.config();
//create server
const app = (0, express_1.default)();
//middleware
app.use(express_1.default.json());
app.use(welcome_middleware_1.welcome);
//Route
app.use("/products", product_routes_1.default);
//Fallback
app.use((req, res, next) => {
    res.status(404).send("Invalid code");
});
//start 
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
