import {Router} from 'express';
import path from 'path';
import verifyAccessToken from '../middlewares/verifyAccessToken';

const router = Router()

router.get('/protected', verifyAccessToken, (req, res) =>{
    
    console.log();
    res.sendFile(path.join(__dirname, '..', 'views', 'Home.html'));
    
})

export default router;