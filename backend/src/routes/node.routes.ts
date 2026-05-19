import { Router } from 'express';
import * as nodeController from '../controllers/node.controller';

const router = Router();

router.post('/register', nodeController.registerNode);
router.post('/heartbeat', nodeController.heartbeat);

export default router;