const express = require('express');
const mysql = require('mysql');
const app = express();

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'weather'
});

// Middleware for parsing JSON in request body
app.use(express.json());

// Retrieve all user locations
app.get('/api/locations', (req, res) => {
  // Retrieve all locations from the database
  const getLocationsQuery = 'SELECT * FROM locations';
  db.query(getLocationsQuery, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    res.status(200).json(result);
  });
});

// Add a new location for the user
app.post('/api/locations', (req, res) => {
  const location = req.body;

  // Insert the new location into the database
  const insertLocationQuery = 'INSERT INTO locations SET ?';
  db.query(insertLocationQuery, location, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    location.id = result.insertId;
    res.status(201).json(location);
  });
});

// Retrieve details of a specific location
app.get('/api/locations/:location_id', (req, res) => {
  const locationId = req.params.location_id;

  // Find the location by id in the database
  const getLocationQuery = 'SELECT * FROM locations WHERE id = ?';
  db.query(getLocationQuery, [locationId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'Location not found' });
    }

    const location = result[0];
    res.status(200).json(location);
  });
});

// Update details of a specific location
app.put('/api/locations/:location_id', (req, res) => {
  const locationId = req.params.location_id;
  const updatedLocation = req.body;

  // Update the location in the database
  const updateLocationQuery = 'UPDATE locations SET ? WHERE id = ?';
  db.query(updateLocationQuery, [updatedLocation, locationId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Location not found' });
    }

    res.status(200).json(updatedLocation);
  });
});

// Delete a specific location
app.delete('/api/locations/:location_id', (req, res) => {
  const locationId = req.params.location_id;

  // Delete the location from the database
  const deleteLocationQuery = 'DELETE FROM locations WHERE id = ?';
  db.query(deleteLocationQuery, [locationId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Location not found' });
    }

    res.status(200).json({ message: 'Location deleted successfully' });
  });
});

// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

// MySQL database connection establishment
db.connect(err => {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log('Connected to MySQL database');
});
