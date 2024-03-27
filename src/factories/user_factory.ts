import { UserService } from '../services/UserService';

function userServiceFactory() {
    return new UserService();
}

export const userService = userServiceFactory();
