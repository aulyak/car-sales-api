const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// app.get('/', (request, response) => {
//   response.json({info: 'Node.js, Express, and Postgres API'});
// });

app.get('/car-sales-info/', db.getAllCarSaleInfo);
app.get('/car-sales-info/:id', db.getCarSaleInfoById);
app.put('/car-sales/:id', db.updateCarSaleById);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});