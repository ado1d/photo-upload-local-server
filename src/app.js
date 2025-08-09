const express = require('express');
const path = require('path');
const db = require('./db/mysql');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    db.query('SELECT id, name FROM photos', (err, results) => {
        if (err) {
            console.error('DB error:', err); 
            return res.status(500).send('DB error');
        }
        res.render('index', { photos: results });
    });
});
function splitBuffer(buffer, boundary) {
    let parts = [];
    let start = 0;

    while (true) {
        let end = buffer.indexOf(boundary, start);
        if (end === -1) break;
        parts.push(buffer.slice(start, end));
        start = end + boundary.length;
    }

    return parts.map(p => p.slice(2)); 
}


app.post('/upload', (req, res) => {
    let chunks = [];

    req.on('data', chunk => {
        chunks.push(chunk);
    });

    req.on('end', () => {
        const bodyBuffer = Buffer.concat(chunks);
        const contentType = req.headers['content-type'];
        const boundaryMatch = contentType.match(/boundary=(.+)$/);

        if (!boundaryMatch) {
            return res.status(400).send('Missing boundary');
        }

        const boundary = Buffer.from('--' + boundaryMatch[1]);

       
        const parts = splitBuffer(bodyBuffer, boundary);

        let fileName = '';
        let mimeType = '';
        let fileBuffer = null;

        for (const part of parts) {
            const sep = Buffer.from('\r\n\r\n');
            const headerEnd = part.indexOf(sep);
            if (headerEnd === -1) continue;

            const headerPart = part.slice(0, headerEnd).toString();
            const bodyPart = part.slice(headerEnd + sep.length, part.length - 2); 

            const dispositionMatch = headerPart.match(/name="photo"; filename="(.+?)"/);
            if (dispositionMatch) {
                fileName = dispositionMatch[1];

                const mimeMatch = headerPart.match(/Content-Type: (.+)/);
                mimeType = mimeMatch ? mimeMatch[1].trim() : 'application/octet-stream';

                fileBuffer = bodyPart; 
            }
        }

        if (!fileBuffer || !fileName || !mimeType) {
            return res.status(400).send('Invalid file upload');
        }

        db.query(
            'INSERT INTO photos (name, data, mimetype) VALUES (?, ?, ?)',
            [fileName, fileBuffer, mimeType],
            (err) => {
                if (err) {
                    console.error('Upload error:', err); 
                    return res.status(500).send('Upload error');
                }
                res.redirect('/');
            }
        );
    });
});


app.get('/photo/:id', (req, res) => {
    db.query('SELECT data, mimetype FROM photos WHERE id = ?', [req.params.id], (err, results) => {
        if (err || results.length === 0) return res.status(404).send('Not found');
        res.set('Content-Type', results[0].mimetype);
        res.send(results[0].data);
    });
});

app.listen(3000, () => console.log('Server started on http://localhost:3000'));
