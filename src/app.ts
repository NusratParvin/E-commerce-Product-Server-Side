import express, { Application, Request, Response } from 'express';
import cors from 'cors';
// const port = 3000;
const app: Application = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  const a = 10;

  res.send(a);
  res.send('Ecommerce!');
});

export default app;
