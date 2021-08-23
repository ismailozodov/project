import fs from 'fs'
import path from 'path'

const CATEGORY = (req, res) => {
    try {
        if (!req.headers.token) throw "The token required!"

        let data = req.body
            let { category_name } = data
            let categorys = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'categorys.json'), 'UTF-8')
            categorys = categorys ? JSON.parse(categorys) : []
            let category_id = categorys.length ? categorys[categorys.length-1].categoryId + 1 : 1
            
            let newcategory = { categoryId:category_id,categoryName:category_name }
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

            categorys.push(newcategory)
            fs.writeFileSync(path.join(process.cwd(),'src', 'database','categorys.json'), JSON.stringify(categorys,null,4))

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
    CATEGORY
}