import fs from 'fs'
import path from 'path'

const GETCATEGORY = (req, res) => {
    let category = fs.readFileSync(path.join(process.cwd(),'src','database','categorys.json'), 'UTF-8')
    let subCategory = fs.readFileSync(path.join(process.cwd(),'src','database','subcategorys.json'), 'UTF-8')
    let categoryJsonParse = JSON.parse(category)
    let subCategoryJsonParse = JSON.parse(subCategory)

    for(let i of categoryJsonParse) {
        let arr = []
        for(let g of subCategoryJsonParse) {
            if(i.category_id == g.category_id) {
                let obj = {
                    subCategoryId: g.sub_category_id,
                    subCategoryName: g.sub_category_name
                }
                arr.push(obj)
            }
        }
        i.subCategory = arr

    }

    res.send(categoryJsonParse)
}

const GETSUBCATEGORY = (req, res) => {
    let subCategory = fs.readFileSync(path.join(process.cwd(),'src','database','subcategorys.json'), 'UTF-8')
    let products = fs.readFileSync(path.join(process.cwd(),'src','database','products.json'), 'UTF-8')
    let subCategoryJsonParse = JSON.parse(subCategory)
    let productsJsonParse = JSON.parse(products)

    for(let i of subCategoryJsonParse) {
        let arr = []
        for(let g of productsJsonParse) {
            console.log(g);
            if(i.sub_category_id == g.sub_category_id) {
                let obj = {
                    productId: g.product_id,
					productName: g.product_name,
					model: g.model,
					price: g.price,
					color: g.color
                }
                arr.push(obj)
            }
        }
        i.products = arr
    }
    res.send(subCategoryJsonParse)

}

const GET1 = (req, res) => {
    let subCategory = fs.readFileSync(path.join(process.cwd(),'src','database','subcategorys.json'), 'UTF-8')
    let products = fs.readFileSync(path.join(process.cwd(),'src','database','products.json'), 'UTF-8')
    let subCategoryJsonParse = JSON.parse(subCategory)
    let productsJsonParse = JSON.parse(products)
    let { subcategoryId } = req.query
    	let product = subCategoryJsonParse.filter( elem => elem.subCategoryId == subcategoryId )
        for(let i of product) {
            let arr = []
            for(let g of productsJsonParse) {
                if(i.subCategoryId == g.subCategoryId) {
                    let obj = {
                        productId: g.productId,
                        productName: g.productName,
                        model: g.model,
                        price: g.price,
                        color: g.color
                    }
                    arr.push(obj)
                }
            }
            i.products = arr
        }
    	return res.json( product || { message: 'not found!' } )

    // res.send(subCategoryJsonParse)
}





// app.get('/posts/:post_id', (req, res) => {
// 	let { post_id } = req.params
// 	let post = postJsonParse.find( elem => elem.post_id == post_id )
// 	return res.json( post || { message: 'not found!' } )
// })

// app.get('/posts/users/:user_id', (req, res) => {
// 	let { user_id } = req.params
// 	let posts = postJsonParse.find( elem => elem.user_id == user_id )
// 	return res.json( posts || { message: 'not found!' } )
// } )


export {
    GETCATEGORY,
    GETSUBCATEGORY,
    GET1
}