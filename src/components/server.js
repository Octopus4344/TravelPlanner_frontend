const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

// Endpoint do zapisywania danych w pliku .json
app.post('/save-trip', (req, res) => {
    const tripData = req.body;
    fs.writeFileSync('trip_data.json', JSON.stringify(tripData, null, 2));
    res.status(200).send('Trip data saved to file');
});

// Endpoint do tworzenia wycieczek
app.post('/api/itineraries', (req, res) => {
    const tripData = req.body;
    // Tutaj możesz dodać logikę zapisu do bazy danych
    res.status(201).json(tripData);
});

// Endpoint do dodawania miejsc do wycieczki
app.post('/api/itineraries/:id/add-places', (req, res) => {
    const tripId = req.params.id;
    const places = req.body.places;
    // Tutaj możesz dodać logikę dodawania miejsc do wycieczki o danym tripId
    res.status(201).json(places);
});

// Endpoint dla strony głównej - odpowiedź powitalna
app.get('/', (req, res) => {
    res.send('Witaj! Twoje API działa poprawnie.');
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
