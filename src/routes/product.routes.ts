import { Request, Response, Router } from "express";
import { Product } from "../types/product";
import {v4 as uuidv4} from'uuid'

const productRouter =Router()

const products:Product[]=[
    {
        id:'1',
        product_name:"Apple",
        product_description:"Red fruit",
        product_price:2.99
    },
    {
        id:'2',
        product_name:"Tomato",
        product_description:"Red Veg",
        product_price:1.99
    }
]

/**
 * @route GET/products
 * @param {Request} req -Express request object
 * @param {Response} res - Express response object
 * @return {void} - Responds with product list
 */
productRouter.get("/",(req:Request, res:Response)=>{
    res.status(200).json(products)
})

/**
 * @route POST/products
 * @param {Request} req -Express request object
 * @param {Response} res - Express response object
 * @return {void} - Responds with completion message
 */
productRouter.post("/",(req:Request<{},{},Omit<Product,"id">>, res:Response)=>{
    const {product_name, product_description,product_price} =req.body
    const newPro={
        id:uuidv4(),
        product_name,
        product_description,
        product_price
    }
    products.push(newPro)
    res.status(202).json(newPro)
})

/**
 * @route PUT/products/:id
 * @param {Request} req -Express request object
 * @param {Response} res - Express response object
 * @return {void} - Responds with completion message
 */
productRouter.put("/:id",(req:Request<{id:string},{},Partial<Product>>, res:Response)=>{
    const {id}=req.params
    const findIndex = products.findIndex(t=>t.id =id)
    if(findIndex===-1){
        res.status(404).send("Product not found")
        return
    }
    const updates:Product = {
        ...products[findIndex],
        product_name: req.body.product_name??products[findIndex].product_name,
        product_description: req.body.product_description??products[findIndex].product_description,
        product_price: req.body.product_price??products[findIndex].product_price
    }

    products[findIndex] =updates
    res.status(202).json(products[findIndex])
})

/**
 * @route GET/products/:id
 * @param {Request} req -Express request object containing id
 * @param {Response} res - Express response object
 * @return {void} - Responds with todo item with matching id
 */
productRouter.get("/:id",(req:Request, res:Response)=>{
    const {id} = req.params
    const found = products.find(t => t.id === id)

    if(!found){
        res.status(404).send("Product Not Found")
        return
    }
    res.status(200).json(found)
})

/**
 * @route DELETE/products/:id
 * @param {Request} req -Express request object containing id
 * @param {Response} res - Express response object
 * @return {void} - Responds with deletion message
 */
productRouter.delete("/:id", (req:Request, res:Response)=>{
    const {id}= req.params

    const index = products.findIndex(t => t.id ===id)

    if(index ===-1){
        res.status(404).send("Product not found")
        return
    }
    products.splice(index,1)
    res.status(200).send("Product deleted")
})

export default productRouter