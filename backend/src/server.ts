import app from './app';
import { PORT } from './config/env';
import { markStaleNodesOffline } from './services/node.service';

const port = Number(PORT) || 8080;

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});

// Background job: mark nodes offline if they stop heartbeating
// Runs every 15s — nodes flip to 'offline' within ~30-45s of going silent
const stalePollInterval = setInterval(async () => {
  try {
    const count = await markStaleNodesOffline();
    if (count > 0) {
      console.log(`[stale-check] Marked ${count} node(s) as offline`);
    }
  } catch (err) {
    console.error('[stale-check] Error:', err);
  }
}, 15_000);

// Graceful shutdown
function shutdown() {
  clearInterval(stalePollInterval);
  server.close(() => process.exit(0));
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);