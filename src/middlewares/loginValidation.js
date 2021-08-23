import validation from '../lib/validation.js'

export default function (req, res, next) {
	try {
		let { username, password } = req.body
		if(!username || !validation.username(username)) throw 'The username is required!'
		if(!password || !validation.password(password)) throw 'The password is required!'
		
		req.user = user
		next()
	} catch(error) {
		res.status(401).json({ status: 401, message: error })
	}
}