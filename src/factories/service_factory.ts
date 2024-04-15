import { UserService } from '../services/UserService';
import { BoardService } from '../services/BoardService';
import { CategoryService } from '../services/CategoryService';
import { TaskService } from '../services/TaskService';

function serviceFactory() {
    return {
        user: new UserService(),
        board: new BoardService(),
        category: new CategoryService(),
        task: new TaskService(),
    }
}

export const services = serviceFactory();
