let validation = {
	username (value) {
		if(!(value.length > 3 && value.length < 30)) throw 'The username input must be 3-30 characters!'
		return value 
	},
	email (value) {
        if(!(/[@]/).test(value)) 'The email must include @ letters!'
		if(!(/[.]/).test(value)) 'The email must include . letters!'

		return value
	},
	password (value) {
		if(value.length < 8) throw 'The password length must be more than 8'
		if( !(/[A-Z]/).test(value) ) throw 'The password must include uppercase letters!'
		if( !(/[a-z]/).test(value) ) throw 'The password must include lowercase letters!'
		if( !(/[0-9]/).test(value) ) throw 'The password must include numbers!'
		if( !(/[ `!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?~]/).test(value)) throw 'The password must include special characters!'
		return value
	},
	birth (value){
		
	},
	gender(value) {
		if( !(value == 1 || value == 2) ) throw 'The gender type must be 1 and 2'
		return value
	}
}

export default validation