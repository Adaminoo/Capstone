const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorMiddleware');

dotenv.config();

const app = express();

app.use(express.static(path.resolve(__dirname, "../client/dist")));

app.use(express.json());

// Auuth Routes
app.use('/api', authRoutes);

// Error Thingy
app.use(errorHandler);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
