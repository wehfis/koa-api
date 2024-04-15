import { SwaggerRouter } from 'koa-swagger-decorator';
import jwt_middleware from '../middlewares/jwt_middleware';
import UserController from '../controllers/UserController';
import path from 'path';
import BoardController from '../controllers/BoardController';
import CategoryController from '../controllers/CategoryController';
import TaskController from '../controllers/TaskController';

const router = new SwaggerRouter();

router.swagger({
    title: 'KOA API',
    description: 'KOA API DOC',
    version: '2.0.0',
});

router.post('/user/register', UserController.registerUser);
router.post('/user/login', UserController.loginUser);
router.get('/user/refresh', UserController.refreshToken);
router.post('/user/logout', jwt_middleware(), UserController.logoutUser);
router.get('/user/me', jwt_middleware(), UserController.getUser);

router.post('/board', jwt_middleware(), BoardController.createBoard);
router.get('/boards', jwt_middleware(), BoardController.getBoards);
router.get('/board/{id}', jwt_middleware(), BoardController.getBoard);
router.put('/board/{id}', jwt_middleware(), BoardController.updateBoard);
router.delete('/board/{id}', jwt_middleware(), BoardController.deleteBoard);

router.post('/category', jwt_middleware(), CategoryController.createCategory);
router.get('/categories/{board_id}', jwt_middleware(), CategoryController.getCategories);
router.get('/category/{id}', jwt_middleware(), CategoryController.getCategory);
router.put('/category/{id}', jwt_middleware(), CategoryController.updateCategory);
router.delete('/category/{id}', jwt_middleware(), CategoryController.deleteCategory);

router.post('/task', jwt_middleware(), TaskController.createTask);
router.get('/tasks/{board_id}', jwt_middleware(), TaskController.getTasks);
router.get('/task/{id}', jwt_middleware(), TaskController.getTask);
router.put('/task/{id}', jwt_middleware(), TaskController.updateTask);
router.delete('/task/{id}', jwt_middleware(), TaskController.deleteTask);

router.mapDir(path.resolve(__dirname, '../controllers'));

export default router;
