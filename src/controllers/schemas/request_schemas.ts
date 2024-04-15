export const registerUserSchema = {
    username: { type: 'string', required: true, example: 'alex' },
    password: { type: 'string', required: true, example: 'password123' },
};

export const loginUserSchema = {
    username: { type: 'string', required: true, example: 'alex' },
    password: { type: 'string', required: true, example: 'password123' },
};

export const createBoardSchema = {
    title: { type: 'string', required: true, example: 'my board 123' },
};

export const updateBoardSchema = {
    title: { type: 'string', required: true, example: 'my board 123' },
};

export const boardSchemaId = {
    id: { type: 'string', required: true, example: '1231' },
};

export const createCategorySchema = {
    name: { type: 'string', required: true, example: 'my category 123' },
    board_id: { type: 'string', required: true, example: '123' },
};

export const updateCategorySchema = {
    name: { type: 'string', required: true, example: 'my category 123' },
};

export const categorySchemaId = {
    id: { type: 'string', required: true, example: '123' },
};

export const getAllCategorySchema = {
    board_id: { type: 'string', required: true, example: '123' },
};

export const createTaskSchema = {
    title: { type: 'string', required: true, example: 'my task 123' },
    description: { type: 'string', required: true, example: 'my task description 123' },
    category_id: { type: 'string', required: true, example: '123' },
    board_id: { type: 'string', required: true, example: '123' },
};

export const updateTaskSchema = {
    title: { type: 'string', required: true, example: 'my task 123' },
    description: { type: 'string', required: true, example: 'my task description 123' },
    category_id: { type: 'string', required: true, example: '123' },
    board_id: { type: 'string', required: true, example: '123' },
};

export const taskSchemaId = {
    id: { type: 'string', required: true, example: '123' },
};

export const getAllTaskSchema = {
    board_id: { type: 'string', required: true, example: '123' },
};
