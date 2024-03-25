const User = require('../../models/user');
const bcrypt = require('bcryptjs');

exports.addUser = async (req, res, next) => {
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

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.aggregate([
      {
        $project: {
          name: 1,
          email: 1,
          phone: 1,
          profession: 1,
        },
      },
    ]);

    if (!users) {
      const error = new Error('Users Not Found');
      error.status = 404;
      throw error;
    }
    res.status(200).json({ message: 'User Fetched', users });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      const error = new Error('User Not Found');
      error.status = 404;
      throw error;
    }
    res.status(200).json({ message: 'User Fetched', user });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, pass, phone, proff } = req.body;

    const user = await User.findById(id);

    if (!user) {
      const error = new Error('User Not Found');
      error.status = 404;
      throw error;
    }
    user.email = email;
    user.phone = phone;
    user.password = pass;
    user.name = name;
    user.profession = proff;

    const updatedUser = await user.save();

    if (!updatedUser) {
      const error = new Error('User Not Updated');
      error.status = 422;
      throw error;
    }

    res.status(200).json({ message: 'User Updated', user });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userDeleted = await User.findByIdAndDelete(id);

    if (!userDeleted) {
      const error = new Error('User Not Deleted');
      error.status = 404;
      throw error;
    }

    res.status(200).json({ message: 'User Deleted', deleted: true });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};
