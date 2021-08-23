import validation from '../lib/validation.js'


export default function (req, res, next) {
	try {
		let { username, password, birth, email, gender } = req.body
		if(!username || !validation.username(username)) throw 'The username is required!'
		if(!password || !validation.password(password)) throw 'The password is required!'
		if(!birth) throw 'The birth is required!'
		if(!email  || !validation.email(email))   throw 'The email is required!'
		if(!gender   || !validation.gender(gender))     throw 'The gender is required!'
		next()
	} catch(error) {
		console.log(error);
		res.status(401).json({ status: 401, message: error })
	}
}