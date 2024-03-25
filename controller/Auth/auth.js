const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
  const { name, email, phone, pass, proff } = req.body;
  let hashedPass;

  try {
    const existingUser = await User.findOne({email: email})

    if (existingUser) {
      const error = new Error('User Already Exist');
      error.status = 422;
      throw error;
    }

    if (pass) {
      hashedPass = await bcrypt.hash(pass, 12);
    }

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

exports.login = async (req, res, next) => {
  const { email, pass } = req.body;
  let loadedUser;

  try {
    const user = await User.findOne({ email: email });
    
    if (!user) {
      const error = new Error('User Not Found');
      error.status = 404;
      throw error;
    }
    
    loadedUser = user;
    const hashedPass = await bcrypt.compare(pass, loadedUser.password);

    if (!hashedPass) {
      const error = new Error('Password Error');
      error.status = 422;
      throw error;
    }

    const token = await JWT.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString(),
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({ message: 'User Logged In', userId: loadedUser._id.toString(), token });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};
