const bcrypt = require('bcrypt');
bcrypt.compare('1111', '1111').then(res=>debug && console.log(res))