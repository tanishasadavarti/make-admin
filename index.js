const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const { heroRoutes } = require('./routes');
const logger = require('./middlewares/logger.middleware');

const app = express();

app.use(express.json()); 
const PORT = 8080;

app.use(bodyParser.json());
app.use(logger);

// Routes
app.use(heroRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
