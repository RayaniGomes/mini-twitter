import { api } from './api';
import type { LoginFormInputs, RegisterFormInputs } from '../schemas/authSchema';

export const loginUser = (data: LoginFormInputs) => api.post('/auth/login', data);
export const registerUser = (data: RegisterFormInputs) => api.post('/auth/register', data);
