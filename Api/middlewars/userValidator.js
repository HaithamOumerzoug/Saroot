exports.userSignUpValidator = (req,res,next)=>{
    console.log(req.body);

    req.check('name','Name is required !')
        .notEmpty().isLength({max:50}).withMessage('Name must be less then 50 caracter !');

    req.check('email','Email is required !')
        .notEmpty().isEmail().withMessage('Email invalide !');

    req.check('password','Password is required !')
        .notEmpty().isLength({min:6,max:14})
        .withMessage('Password must be between 6 and 14 caracter !');

    req.check('phone','Phone is required !')
        .notEmpty().isLength({min:10,max:14})
        .withMessage('Phone must be between 10 and 14 caracter !');

    req.check('gender','Gender est obligatoire !')
        .notEmpty()

    const errors=req.validationErrors()
    if(errors){
        return res.status(400).send(errors)
    }
    next();
}
exports.userSignInValidator=(req,res,next)=>{
    req.check('email','Email is required !')
        .notEmpty().isEmail().withMessage('Email invalide !');

    req.check('password','Password is required !')
        .notEmpty().isLength({min:6,max:14})
        .withMessage('Password must be between 6 and 14 caracter !');

    const errors=req.validationErrors()
    if(errors){
        return res.status(400).send(errors)
    }
    next();
}