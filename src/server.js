import express from 'express'
import path from 'path'
import { PORT,host } from './config.js'
import fs from 'fs'
import { REGISTER, LOGIN } from './modules/authController.js'
import { PRODUCT } from './modules/productController.js'
import { CATEGORY } from './modules/cotegoryController.js'
import { SUBCATEGORY } from './modules/subcategoryController.js'
import { GETCATEGORY,GETSUBCATEGORY,GET1 } from './modules/getController.js'
import registerValidation from './middlewares/registerValidation.js'
import loginValidation from './middlewares/loginValidation.js'

const app = express()
app.use(express.json() )
app.use(express.static(path.join(process.cwd(),'src','database')))

app.get('/category',GETCATEGORY)
app.get('/subcategory',GETSUBCATEGORY)
app.get('/products',GET1)

app.post('/register',registerValidation, REGISTER )
app.post('/login',loginValidation, LOGIN )
app.post('/product', PRODUCT )
app.post('/category', CATEGORY )
app.post('/subcategory', SUBCATEGORY )

app.listen( PORT , () => console.log('http://' + host + ':' + PORT) )