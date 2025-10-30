import dotenv from 'dotenv'
import express,{NextFunction, Request, Response} from 'express'
import { welcome } from './middleware/welcome.middleware'
import productRouter from './routes/product.routes'
dotenv.config()

//create server
const app = express()

//middleware
app.use(express.json())
app.use(welcome)

//Route
app.use("/products",productRouter)

//Fallback
app.use((req:Request, res:Response, next:NextFunction)=>{
    res.status(404).send("Invalid code")
})

//start 
const PORT = process.env.PORT || 4000
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})