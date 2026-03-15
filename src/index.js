import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT || 5050;

// Use express and handle port conflicts
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`\n[Error] Port ${PORT} is already in use by another application.`);
        console.error(`Please try running with a different port, e.g.: PORT=3005 npm run dev\n`);
        process.exit(1);
    } else {
        throw err;
    }
});
