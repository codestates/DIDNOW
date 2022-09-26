const bcrypt = require('bcrypt');
const Holder = require('../models/Holder');
const Issuer = require('../models/Issuer');
const Verifier = require('../models/Verifier');
const createError = require('./Error');

const passwordCheck = async (req, res, next)=>{
    // password check todo
    let user = {};
    switch (req.user.type) {
        case "issuer":
          user = await Issuer.findById(req.user.id);
          break;
  
        case "holder":
          user = await Holder.findById(req.user.id);
          break;
  
        case "verifier":
          user = await Verifier.findById(req.user.id);
          break;
  
        default:
          user = {};
      }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) next(createError(400, "Invalid Password"));
    else next();
}

module.exports = passwordCheck;