const router   =    require('express').Router();
const protectedRoutes = require('../../config/checkToken'); 
/** Login, Registration, Forget Password e.t.c. */
router.use('/auth',require('./auth'));

router.get("/profile", protectedRoutes.verifyToken, (req, res, next) => {
    res.render('index', { title: 'Express' });
});
/** Profile */
module.exports = router;