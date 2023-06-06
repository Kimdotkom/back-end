const { check, validationResult } = require("express-validator");


exports.registerValidation = () => [
    check('name', 'this field is required !').notEmpty(),
    check('email', 'this field should be valid !').isEmail(),
    check('email', 'this field is required !').notEmpty(),
    check('password', 'this field should be at least 4 carac!').isLength({min : 4}),
]

exports.validator = (req, res, next) => {
    const errors = validationResult(req);
    errors.isEmpty() ? next() : res.status(400).send(errors.array())
}