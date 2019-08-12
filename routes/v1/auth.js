const router   =   require('express').Router();
const AuthController =   require('../../api/controllers/AuthController');
// router.get('/', (req,res) => {
//     return res.status(401);
// });
router.post('/login',AuthController.authenticateUser);
router.post('/register',AuthController.registerUser);

module.exports = router;