import express from 'express';
const router = express.Router();

let notes = []; // In-memory storage

// GET /notes - returns all notes
router.get('/', (req, res) => {
    res.json(notes);
});

// POST /notes - creates a note
router.post('/', (req, res) => {
    const { title, body } = req.body;
    
    // Validate request
    if (!title || !body) {
        return res.status(400).json({ error: "Title and body are required" });
    }

    const newNote = {
        id: Date.now().toString(),
        title,
        body,
        createdAt: new Date().toISOString()
    };
    
    notes.push(newNote);
    res.status(201).json(newNote);
});

// DELETE /notes/:id - deletes a note by id
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const initialLength = notes.length;
    
    notes = notes.filter(note => note.id !== id);
    
    if (notes.length === initialLength) {
        return res.status(404).json({ error: "Note not found" });
    }
    
    res.status(200).json({ message: "Note deleted successfully" });
});

export default router;
