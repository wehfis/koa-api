import { validate } from 'class-validator';

export async function validateWrapper(payload: Object): Promise<boolean> {
  const errors = await validate(payload);
  if (errors.length > 0) 
    return Promise.reject(Error(errors.toString()));
  return Promise.resolve(true);
}
