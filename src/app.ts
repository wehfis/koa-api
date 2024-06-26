import Koa from 'koa';
import { DefaultContext, DefaultState } from 'koa';
import router from './routes';
import bodyParser from 'koa-bodyparser';
import logger from './middlewares/logger_middleware';
import connectToDb from './db/db_connect';
import cors from '@koa/cors';

const app: Koa<DefaultState, DefaultContext> = new Koa();

connectToDb();
app.use(cors()).use(logger()).use(bodyParser()).use(router.routes());

export default app;
