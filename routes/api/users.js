const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
 
// @route   POST api/users
// @desc    Register route
// @access  Public

router.post('/', [
    check('FirstName', 'FirstName is required')
     .not()
     .isEmpty(),
     check('LastName', 'LastName is required')
     .not()
     .isEmpty(),
    check('Age', 'Age is required')
     .not()
     .isEmpty(),
    check('AddType', 'AddType is required')
     .not()
     .isEmpty(),
    check('PhoneNumber', 'PhoneNumber is required')
     .not()
     .isEmpty(),
    check('Email', 'Please include a valid email').isEmail(),
    //check('password', 'Please enter a password with 6 or more characters').isLength({ min:6 }) 
], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { FirstName, LastName, Age, AddType, PhoneNumber, Skype, Email} = req.body;

    try {
        // See if user exists
        let user = await User.findOne({ Email });

        if (user) {
            res.send(400).json({ errors : [{ msg: 'User already exists'}]});
        }
        // Get user gravatar
        const avatar = gravatar.url(Email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });
        user = new User({
            FirstName,
            LastName,
            Age,
            AddType,
            PhoneNumber,
            Skype,
            Email
        });

        // Encrypt password
        //const salt = await bcrypt.genSalt(10);

        //user.password = await bcrypt.hash(password, salt);

        await user.save();

        // return Jasonwebtoken

        res.send('User registered');    

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}
);

module.exports = router;

