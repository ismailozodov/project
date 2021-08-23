import fs from 'fs'
import path from 'path'

const SUBCATEGORY = (req, res) => {
    try {
        if (!req.headers.token) throw "The token required!"

        let data = req.body
            let { sub_category_name,category_id } = data
            let sub_categorys = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'subcategorys.json'), 'UTF-8')
            sub_categorys = sub_categorys ? JSON.parse(sub_categorys) : []
            let sub_category_id = sub_categorys.length ? sub_categorys[sub_categorys.length-1].sub_category_id + 1:1
            
            let newsub_category = { subCategoryId:sub_category_id,subCategoryName:sub_category_name,categoryId:category_id }
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

            sub_categorys.push(newsub_category)
            fs.writeFileSync(path.join(process.cwd(),'src', 'database','subcategorys.json'), JSON.stringify(sub_categorys,null,4))

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
    SUBCATEGORY
}