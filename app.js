const express = require('express');
const app = express();

// Basic route to test the server
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
app.get('/error', (req, res, next) => {
    const error = new Error('Something went wrong!');
    error.status = 500;  // Set the error status to 500 (Internal Server Error)
    next(error);  // Pass the error to the next middleware (the error handler)
  });
  app.use((err, req, res, next) => {
    console.error(err.stack);  // Log error details for debugging
    res.status(err.status || 500).json({
      message: err.message,  // Show the error message
      error: process.env.NODE_ENV === 'development' ? err : {}  // Show full error info only in development mode
    });
  });
// 404 - Route not found
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
  });
  
  const morgan = require('morgan');
  app.use(morgan('dev'));  // Logs requests in the console in a concise format
  app.use((err, req, res, next) => {
    console.error(`Error occurred: ${err.message}`);
    console.error(err.stack);  // Log the full stack trace for debugging
    res.status(err.status || 500).json({
      message: err.message,
      error: process.env.NODE_ENV === 'development' ? err : {}  // Full error details in dev mode
    });
  });
  class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.status = 400;  // Bad request status
    }
  }
  process.on('SIGINT', () => {
    console.log('Shutting down gracefully...');
    process.exit(0);
  });
  
      