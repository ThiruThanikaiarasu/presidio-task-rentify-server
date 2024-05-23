const express = require('express')
const router = express.Router()

const { check } = require('express-validator')
const { signup, login, addANewProperty, editPropertyDetails, deleteTheProperty, searchTheProperty, searchThePropertyWithFilters } = require('../controllers/userController')
const { verifyUser, verifySeller, verifyBuyer } = require('../middleware/verify')
const upload = require('../middleware/imageUpload')

// Signup route
router.post(
                '/signup',
            
                check('firstName')
                    .not()
                    .isEmpty()
                    .isLength({min: 2})
                    .withMessage('Enter a valid First name'),
                check('lastName')
                    .not()
                    .isEmpty()
                    .isLength({min: 1})
                    .withMessage('Enter a valid Last name'),
                check('email')
                    .isEmail()
                    .withMessage('Enter a valid email')
                    .normalizeEmail(),
                check('password')
                    .not()
                    .isEmpty()
                    .isLength({min: 8})
                    .withMessage('Password length is at least 8 character'),

                signup
)

// Login route
router.post(
                '/login',

                check('email')
                    .isEmail()
                    .withMessage('Enter a valid email')
                    .normalizeEmail(),
                check('password')
                    .not()
                    .isEmpty()
                    .isLength({min: 8})
                    .withMessage('Password length is at least 8 character'),

                login
)

// Seller Adds New property 
router.post(
                '/add',
                
                upload.single('images'),

                verifyUser,
                verifySeller,
                addANewProperty
)

// Seller Edits their property
router.patch(
                '/edit',

                upload.single('images'),
                
                verifyUser,
                // verifySeller,
                editPropertyDetails
)

// Seller Delete their property 
router.delete(
                '/remove',

                verifyUser,
                // verifySeller,
                deleteTheProperty
)

// Buyer Searches the property 
router.get(
                '/property/search', 

                verifyUser,
                // verifyBuyer,
                searchTheProperty
)

router.get(
                '/property/search/advance',

                verifyUser,
                // verifySeller,
                searchThePropertyWithFilters
)

module.exports = router