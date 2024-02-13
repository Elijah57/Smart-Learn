const {body, validationResult } = require("express-validator");


const validateRegisterFormFields = ( )=> [
    body("firstname").notEmpty().withMessage("Please provide your firstname "),

    body("lastname").notEmpty().withMessage("Please provide your lastname "),

    body('email')
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Invalid email address.')
    .normalizeEmail(),

    body("password").notEmpty().withMessage("Please provide a password")
    .isLength({min: 6}).withMessage('Password should be at least 6 characters.')
    .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)
    .withMessage("Password must contain at least one number, one lowercase and one uppercase letter"),

    body("password2").custom((value, {req})=>{
        if(value !== req.body.password){
            throw new Error("Password confirmation does not match")
        }
    }),

    (req, res, next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({error: errors.array()})
        }
        next();
    }
];

module.exports = validateRegisterFormFields