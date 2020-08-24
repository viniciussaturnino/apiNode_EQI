import { Router } from 'express';

import AdvisorController from './app/controllers/AdvisorController';
import ClientController from './app/controllers/ClientController';

const routes = new Router();

routes.post('/advisors', AdvisorController.store);
routes.get('/advisors', AdvisorController.index);

routes.post('/clients', ClientController.store);
routes.get('/clients/:id', ClientController.index);

export default routes;
