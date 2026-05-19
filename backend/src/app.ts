import express from 'express';
import cors from 'cors';
import nodeRoutes from './routes/node.routes';
import eventRoutes from './routes/event.routes';
import policyRoutes from './routes/policy.routes';
import { errorHandler } from './middleware/error.middleware';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/nodes', nodeRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/policies', policyRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use(errorHandler);

export default app;