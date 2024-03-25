const User = require('../../models/user');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res, next) => {
    const { name, email, phone, pass, proff } = req.body;
    let hashedPass;
  
    if (pass) {
      hashedPass = await bcrypt.hash(pass, 12);
    }
  
    try {
      const user = new User({
        name: name,
        email: email,
        password: hashedPass,
        phone: phone,
        profession: proff,
      });
  
      const createdUser = await user.save();
      if (!createdUser) {
        const error = new Error('User Registration Failed');
        error.status = 422;
        throw error;
      }
      res.status(200).json({ message: 'User Registered', user });
    } catch (err) {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    }
  };