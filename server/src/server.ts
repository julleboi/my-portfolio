import express from 'express';

const PORT = process.env.PORT || 8000;
const app = express();

// Routes
app.get('/', (req, res) => {
  res.send('Hi');
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});