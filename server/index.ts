import { Server } from "./server";

// Create and start a server on port ${PORT} (or 3000 by default)
const server = new Server();
server.start(process.env.PORT ?? 3000);
