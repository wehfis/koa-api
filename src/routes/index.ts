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

router.post('/board/create', jwt_middleware(), BoardController.createBoard);
router.get('/board/getAll', jwt_middleware(), BoardController.getBoards);
router.get('/board/{id}', jwt_middleware(), BoardController.getBoard);
router.put('/board/update/{id}', jwt_middleware(), BoardController.updateBoard);
router.delete('/board/delete/{id}', jwt_middleware(), BoardController.deleteBoard);

router.post('/category/create', jwt_middleware(), CategoryController.createCategory);
router.get('/category/getAll', jwt_middleware(), CategoryController.getCategories);
router.get('/category/{id}', jwt_middleware(), CategoryController.getCategory);
router.put('/category/update/{id}', jwt_middleware(), CategoryController.updateCategory);
router.delete('/category/delete/{id}', jwt_middleware(), CategoryController.deleteCategory);

router.post('/task/create', jwt_middleware(), TaskController.createTask);
router.get('/task/getAll', jwt_middleware(), TaskController.getTasks);
router.get('/task/{id}', jwt_middleware(), TaskController.getTask);
router.put('/task/update/{id}', jwt_middleware(), TaskController.updateTask);
router.delete('/task/delete/{id}', jwt_middleware(), TaskController.deleteTask);

router.mapDir(path.resolve(__dirname, '../controllers'));

export default router;
