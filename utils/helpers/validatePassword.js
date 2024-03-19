const validatePassword = (password, res) => {
    if (password === null) return res.status(400).json({message: "Please Provide a password"});

    if (password.length < 6) return res.status(400).json({message: "Password should be at least 6 characters"});

    if (password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/) === null) return res.status(400).json({message: "Password must contain at least one number, one lowercase and one uppercase letter"});

    return String(password);
  };


 module.exports = validatePassword;


//     check("password").notEmpty().withMessage("Please provide a password")
//     .isLength({min: 6}).withMessage('Password should be at least 6 characters.')
//     .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)
//     .withMessage("Password must contain at least one number, one lowercase and one uppercase letter"),
