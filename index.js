const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const contactRoutes = require('./routes/contactRoutes');
const app = express();
dotenv.config();

app.use(cors({
  origin: '*' // Allows all origins
}));


app.use(bodyParser.json());

// Contact form route
app.use('/api/contact', contactRoutes);

// Default route 
app.use('/', (req, res, next) => {
  res.json({
    message: 'Welcome to the GCA Backend API!'
  })
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
