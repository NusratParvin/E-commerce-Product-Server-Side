import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './modules/products/product.route';
// const port = 3000;
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/products', ProductRoutes);

app.get('/', (req: Request, res: Response) => {
  const a = 10;

  res.send(a);
  res.send('Ecommerce !');
});

export default app;
