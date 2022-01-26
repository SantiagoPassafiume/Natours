const fs = require('fs');
const express = require('express');

const app = express();
const port = 3000;

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// #########################################
//  ROUTES
// #########################################

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours: tours,
    },
  });
});

app.post('/', (req, res) => {
  res.send('You can post to this endpoint...');
});

// #########################################
// START LISTENING FOR INCOMING REQUESTS
// #########################################
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
// #########################################
