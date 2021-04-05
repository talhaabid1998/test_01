import {Router} from 'express';
import path from 'path';
import authController from '../Controllers/AuthControllers'
import loginRoute from '../Controllers/login'
import verifyRefreshToken from '../Controllers/verifyRefreshToken'



const router = Router();

router.get('/login', (req, res) =>{
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
    
})

router.get('/signup', (req, res) =>{
    res.sendFile(path.join(__dirname, '..', 'views', 'signup.html'));
})
router.post('/register', authController);
router.post('/login', loginRoute);
router.get('/refresh',verifyRefreshToken)



export default router;