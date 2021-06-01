exports.offerValidator = (req,res,next)=>{

    req.check('title','titre is required !')
        .notEmpty().isLength({max:30}).withMessage('title must be less then 30 caracter !');

    req.check('description','description is required !')
        .notEmpty().isLength({min:5}).withMessage('description must be more then 5 caracter !');

    req.check('price','Price is required !')
        .notEmpty()
        .withMessage('Prix is required !');

    req.check('numb_room','numb_room: is required !')
        .notEmpty()
        .withMessage(' numb_room: is required !');

    const errors=req.validationErrors()
    if(errors){
        return res.status(400).send(errors)
    }
    next();
}