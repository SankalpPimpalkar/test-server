import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

// __dirname workaround for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Root Endpoint (Serves UI)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health Check Endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: "ok" });
});

// Routes
import notesRouter from './routes/notes.js';

// API Routes
app.use('/api/v1/notes', notesRouter);

export default app;
