const fs = require('fs');
const express = require('express');

const app = express();
// Middleware required to receive post data.
app.use(express.json());
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

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
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
