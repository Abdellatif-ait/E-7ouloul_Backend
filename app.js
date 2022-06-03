const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const cors = require('cors')
require('dotenv').config();
const touristRoute = require('./api/routes/tourist')
const annonceRoute = require('./api/routes/annonce')
const circuitRoute = require('./api/routes/circuit')
const lieuRoute = require('./api/routes/lieu')
const contentRoute = require('./api/routes/content')
const documentationRoute = require('./api/routes/documentation')
const visiteRoute = require('./api/routes/visite')
const postRoute = require('./api/routes/post')
const responsableRoute = require('./api/routes/responsable')

/* MIDDLEWARES */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors({
  origin: '*'
}))


/* ROUTES  */
app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});
app.use('/tourist', touristRoute)
app.use('/responsable', responsableRoute)
app.use('/visite', visiteRoute)
app.use('/lieu', lieuRoute)
app.use('/circuit', circuitRoute)
app.use('/content', contentRoute)
app.use('/post', postRoute)
app.use('/annonce', annonceRoute)
app.use('/documentation', documentationRoute)

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
