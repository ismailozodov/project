import fs from 'fs'
import path from 'path'
import jwt from '../lib/jwt.js'

const REGISTER = (req, res) => {
    try {
        let data = req.body
            let {
                username,
                password,
                email,
                birth,
                gender
            } = data
            let users = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'users.json'), 'UTF-8')
            users = users ? JSON.parse(users) : []
            let user = users.find(user => user.username === username)
            if (user) {
                res.writeHead(409, {
                    'Content-Type': 'aplication/json'
                })
                res.write(
                    JSON.stringify({
                        status: 409,
                        message: "The user already exists!",
                        token: null
                    })
                )
                return res.end()
            } else {
                let user_id = users.length ? users[users.length - 1].user_id + 1 : 1
                let newUser = {
                    userId:user_id,
                    username,
                    password,
                    birth,
                    gender,
                    email
                }
                if (newUser.username.length < 3 || newUser.username.length > 30) {
                    res.writeHead(409, {
                        'Content-Type': 'aplication/json'
                    })
                    res.write(
                        JSON.stringify({
                            status: 409,
                            message: "Login 3 dan kam yoki 30 dan ko'p!",
                            token: null
                        })
                    )
                } else {
                    users.push(newUser)
                    fs.writeFileSync(path.join(process.cwd(), 'src', 'database', 'users.json'), JSON.stringify(users, null, 4))  
                    res.writeHead(201, {
                        'Content-Type': 'aplication/json'
                    })
                    res.write(
                        JSON.stringify({ 
                            status: 201, 
                            message: "The user has successfully registered!",
                            token: jwt.sign({ userId: user_id })
                        })
                    )   
                }

            return res.end()
            }
    } catch(err) {
        res.status(401).json({ status: 401, message: error })
    }

    
}

const LOGIN = (req, res) => {
        let data = req.body
        let {
            username,
            password
        } = data
        let users = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'users.json'), 'UTF-8')
        users = users ? JSON.parse(users) : []
        let user = users.find(user => user.username === username && user.password === password)
        if (user) {
            res.writeHead(200, {
                'Content-Type': 'aplication/json'
            })
            res.write(
                JSON.stringify({
                    status: 200,
                    message: "The user has successfully logged in!",
                    token: jwt.sign({
                        userid: user.user_id
                    })
                })
            )
            return res.end()
        } else {
            res.writeHead(401, {
                'Content-Type': 'aplication/json'
            })
            res.write(
                JSON.stringify({
                    status: 401,
                    message: "Wrong password or username!",
                    token: null
                })
            )
            return res.end()
        }
}

export {
    REGISTER,
    LOGIN
}