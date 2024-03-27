export const registerUserSchema = {
    username: { type: 'string', required: true, example: 'alex' },
    password: { type: 'string', required: true, example: 'password123' },
};

export const loginUserSchema = {
    username: { type: 'string', required: true, example: 'alex' },
    password: { type: 'string', required: true, example: 'password123' },
};
