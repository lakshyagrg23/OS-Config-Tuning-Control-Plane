import { Router } from 'express';
import * as policyController from '../controllers/policy.controller';

const router = Router();

router.get('/', policyController.getLatestPolicy);

export default router;