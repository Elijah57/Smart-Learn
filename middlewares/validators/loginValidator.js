const { body, validationResult } = require("express-validator")

const validateLoginFormFields = ( )=> [
    body("email")
    .notEmpty().withMessage("Please provide your email")
    .isEmail().withMessage("Invalid Email Addresss")
    ,
    body("password").notEmpty().withMessage("Please provide your password"),

    (req, res, next)=>{
        const errors = validationResult(req);

        if (!errors.isEmpty()){
            return res.status(422).json({error: errors.array()})
        }

        next();
    }
]

module.exports = validateLoginFormFields;