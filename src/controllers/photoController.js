// class PhotoController {
//     constructor(db) {
//         this.db = db;
//     }

//     uploadPhoto(req, res) {
//         const photo = req.file;
//         if (!photo) {
//             return res.status(400).send('No file uploaded.');
//         }

//         const photoData = {
//             name: photo.originalname,
//             data: photo.buffer,
//             mimetype: photo.mimetype
//         };

//         this.db.query('INSERT INTO photos SET ?', photoData, (error, results) => {
//             if (error) {
//                 return res.status(500).send('Error saving photo to database.');
//             }
//             res.status(201).send({ id: results.insertId, message: 'Photo uploaded successfully.' });
//         });
//     }

//     getPhoto(req, res) {
//         const photoId = req.params.id;

//         this.db.query('SELECT * FROM photos WHERE id = ?', [photoId], (error, results) => {
//             if (error) {
//                 return res.status(500).send('Error retrieving photo from database.');
//             }
//             if (results.length === 0) {
//                 return res.status(404).send('Photo not found.');
//             }

//             const photo = results[0];
//             res.set('Content-Type', photo.mimetype);
//             res.send(photo.data);
//         });
//     }
// }

// module.exports = PhotoController;