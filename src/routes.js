import { Router } from 'express';

import AdvisorController from './app/controllers/AdvisorController';

const routes = new Router();

routes.post('/advisors', AdvisorController.store);
routes.get('/advisors', AdvisorController.index);

export default routes;
