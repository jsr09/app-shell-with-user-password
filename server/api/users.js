const router = require('express').Router();
const { User } = require('../database/index')

// Get /api/user/profile
router.get('/profile', User.authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Post/api/user/profile

//Put/api/user/profile

//delete/api/user/profile






module.exports = router