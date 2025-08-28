const User = require('../models/user');
const { hashPassword, checkPassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('test is working')
}

const registerUser = async(req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if name was entered
        if (!name) {
            return res.json({
                error: 'Name is required'
            })
        };
        // Check if password is valid
        if (!password || password.length < 6) {
            return res.json({
                error: 'Password should be at least 6 characters long'
            })
        };
        // Check unique email
        const exist = await User.findOne({email});
        if (exist) {
            return res.json({
                error: 'An account with this email already exists'
            })
        };

        const hashedPassword = await hashPassword(password);

        const user = await User.create({
            name, 
            email, 
            password: hashedPassword
        });

        return res.json(user);
    } catch (error) {
        console.log(error)
    }
};

const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check if either email or password is missing
        if (!email || !password) {
            const missingField = !email ? "email" : "password";
            return res.json({
                error: `${missingField.charAt(0).toUpperCase() + missingField.slice(1)} cannot be blank.`
            });
        }
        
        // Check if user exists and passwords match
        const user = await User.findOne({email})
        const passwordMatch = user && await checkPassword(password, user?.password)

        if (!passwordMatch) {
            return res.json({
                error: 'User not found. Please check if your email and password are correct. '
            })
        }

        if (passwordMatch) {
            jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                }).json(user)
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const getProfile = (req,res) => {
    const {token} = req.cookies
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err;
            res.json(user)
        })
    }
    else {
        res.json(null)
    }
};

const logoutUser = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    }).json('Logged out successfully!')
}


module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    logoutUser
}
