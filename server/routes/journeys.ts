import express from 'express';
import { Journey } from '../models';

const router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', async (req, res) => {
  try {
    const { count, rows } = await Journey.findAndCountAll({
      offset: Number(req.query.currentPage) * 100,
      limit: 100
    });
    res.send({count, rows});

  } catch (err) {
    console.log(err);
  }  
});

export default router;