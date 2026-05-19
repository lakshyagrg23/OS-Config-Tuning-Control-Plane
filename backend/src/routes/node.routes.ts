import { Router } from 'express';
import * as nodeController from '../controllers/node.controller';
import * as eventController from '../controllers/event.controller';

const router = Router();

router.post('/register', nodeController.registerNode);
router.post('/heartbeat', nodeController.heartbeat);
// Agent constructs event URL as BaseURL+"/events" → /api/nodes/events
router.post('/events', eventController.createEvent);

export default router;