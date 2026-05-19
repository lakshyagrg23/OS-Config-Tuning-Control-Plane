import app from './app';
import { PORT } from './config/env';

const port = Number(PORT) || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});