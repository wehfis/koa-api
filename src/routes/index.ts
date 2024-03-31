import { SwaggerRouter } from 'koa-swagger-decorator';
import jwt_middleware from '../middlewares/jwt_middleware';
import UserController from '../controllers/UserController';
import path from 'path';

const router = new SwaggerRouter();

router.swagger({
    title: 'KOA API',
    description: 'KOA API DOC',
    version: '2.0.0',
});

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.post('/logout', jwt_middleware(), UserController.logoutUser);
router.get('/me', jwt_middleware(), UserController.getUser);
router.get('/refresh', UserController.refreshToken);

router.mapDir(path.resolve(__dirname, '../controllers'));

export default router;
