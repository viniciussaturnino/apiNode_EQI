import { Router } from 'express';

import AdvisorController from './app/controllers/AdvisorController';
import ClientController from './app/controllers/ClientController';
import ProposalController from './app/controllers/ProposalController';

const routes = new Router();

routes.post('/advisors', AdvisorController.store);
routes.get('/advisors', AdvisorController.index);

routes.post('/clients', ClientController.store);
routes.get('/clients/:id', ClientController.index);

routes.post('/proposal', ProposalController.store);
routes.get('/proposal', ProposalController.index);

export default routes;
