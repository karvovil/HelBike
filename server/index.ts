import express from 'express';

const app = express();
app.use(express.json());

const PORT = 3001;

app.get('/hello', (_req, res) => {
  console.log('someone visited');
  res.send('world');
});

app.listen(PORT, () => {
  console.log(`Server launched on port ${PORT}`);
});