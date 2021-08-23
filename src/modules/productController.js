import fs from 'fs'
import path from 'path'

const PRODUCT = (req, res) => {
    try {
        if (!req.headers.token) throw "The token required!"

        let data = req.body
            let { product_name,sub_category_id, model, color, price } = data
            let products = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'products.json'), 'UTF-8')
            products = products ? JSON.parse(products) : []
            let product_id = products.length ? products[products.length-1].product_id + 1:1
            
            let newproduct = { productId:product_id,productName:product_name,subCategoryId:sub_category_id,model,color,price }
            try {
                    res.writeHead(201, {
                        'Content-Type': 'application/json'
                    })
                    res.write(
                        JSON.stringify({
                            status: 201,
                            message: 'Success!',
                        })
                    )
    
                 res.writeHead(500, {
                    'Content-Type': 'application/json'
                });
                res.write(
                    JSON.stringify({
                        status: 500,
                        message: 'error'
                    })
                )
            } catch (err) {
                console.log(err);
            }

            products.push(newproduct)
            fs.writeFileSync(path.join(process.cwd(),'src', 'database','products.json'), JSON.stringify(products,null,4))

            return res.end()
    } catch (error) {
        res.writeHead(500, {
            'Content-Type': 'application/json'
        });
        res.write(
            JSON.stringify({
                status: 500,
                message: error
            })
        )
        return res.end()
    } 
}     

export {
    PRODUCT
}