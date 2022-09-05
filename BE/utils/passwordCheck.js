const bcrypt = require('bcrypt');
const createError = require('./Error');

const passwordCheck = async (req, res, next)=>{
    // password check todo
    const validPassword = await bcrypt.compare(req.body.password);
    if(!validPassword) next(createError(400, "Invalid Password"));
    else next();
}

module.exports = passwordCheck;