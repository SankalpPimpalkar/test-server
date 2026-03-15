import request from 'supertest';
import app from '../src/app.js';

describe('Notes API', () => {
    
    test('GET /health returns 200 and status ok', async () => {
        const res = await request(app).get('/health');
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ status: 'ok' });
    });

    test('POST /notes creates a note and returns 201', async () => {
        const res = await request(app)
            .post('/api/v1/notes')
            .send({ title: 'Test Note', body: 'This is a test note' });
            
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.title).toBe('Test Note');
        expect(res.body.body).toBe('This is a test note');
        expect(res.body).toHaveProperty('createdAt');
    });

    test('GET /notes returns an array with notes', async () => {
        const res = await request(app).get('/api/v1/notes');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        // It should have at least the note created in the previous test
        expect(res.body.length).toBeGreaterThan(0);
    });

    test('DELETE /notes/:id removes the note', async () => {
        // 1. Create a note to delete
        const createRes = await request(app)
            .post('/api/v1/notes')
            .send({ title: 'Delete Me', body: 'This note will be deleted' });
            
        const idToDelete = createRes.body.id;

        // 2. Delete the note
        const deleteRes = await request(app).delete(`/api/v1/notes/${idToDelete}`);
        expect(deleteRes.status).toBe(200);
        expect(deleteRes.body.message).toMatch(/deleted/i);

        // 3. Verify it's gone from GET response
        const verifyRes = await request(app).get('/api/v1/notes');
        const found = verifyRes.body.find(note => note.id === idToDelete);
        expect(found).toBeUndefined();
    });

    test('DELETE /notes/:id returns 404 for non-existent note', async () => {
        const res = await request(app).delete('/api/v1/notes/non-existent-id-123');
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('error');
    });
});
