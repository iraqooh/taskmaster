const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' })

exports.register = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const user = await User.create({ ...req.body, password: hashedPassword })
        const token = createToken(user._id)
        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const valid = user && await bcrypt.compare(req.body.password, user.password);
    if (!valid) throw new Error('Invalid credentials');

    const token = createToken(user._id);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password'); // Exclude the password from the result
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Could not access user profile: ', error });
  }
};

exports.updateProfile = async (req, res) => {
  const userId = req.userId;
  const { name, email, password } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    if (name) user.name = name;
    if (email) user.email = email;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
