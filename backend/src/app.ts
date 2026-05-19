import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import nodeRoutes from './routes/node.routes';
import eventRoutes from './routes/event.routes';
import policyRoutes from './routes/policy.routes';
import { errorHandler } from './middleware/error.middleware';

const app = express();
app.use(cors());
app.use(express.json());

// Request logger — prints every incoming request with origin IP and result
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  res.on('finish', () => {
    const ms = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} from ${ip} → ${res.statusCode} (${ms}ms)`);
  });
  next();
});

app.use('/api/nodes', nodeRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/policies', policyRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use(errorHandler);

export default app;