# Photo Upload App

This project is a simple photo upload application that allows users to upload photos to a MySQL database using XAMPP. The application is built with Node.js and Express, and it utilizes Multer for handling file uploads.

## Project Structure

```
photo-upload-app
├── src
│   ├── app.js                # Entry point of the application
│   ├── routes
│   │   └── photoRoutes.js    # Routes for photo uploads
│   ├── controllers
│   │   └── photoController.js # Logic for handling photo uploads and retrieval
│   ├── db
│   │   └── mysql.js          # MySQL database connection setup
│   └── uploads               # Directory for temporarily storing uploaded photos
├── package.json              # NPM configuration file
├── .env                      # Environment variables for database connection
└── README.md                 # Documentation for the project
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone https://github.com/ado1d/photo-upload-local-server.git
   cd photo-upload-app
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Set up the database:**
   - Ensure you have XAMPP installed and running.
   - Create a new database in MySQL for this application.
   - Update the `.env` file with your database connection details:
     ```
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=your_password
     DB_NAME=your_database_name
     ```

4. **Run the application:**
   ```
   node src/app.js
   ```

5. **Access the application:**
   - Open your web browser and navigate to `http://localhost:3000` (or the port you configured).

## Usage

- To upload a photo, send a POST request to `/upload` with the photo file included in the form data.
- To retrieve a photo, send a GET request to `/photo/:id`, where `:id` is the ID of the photo in the database.

## Additional Information

- Ensure that the `uploads` directory has the appropriate permissions for file uploads.
- You can modify the application to add more features, such as user authentication or additional metadata for uploaded photos.