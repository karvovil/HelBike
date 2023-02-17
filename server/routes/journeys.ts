import express from 'express';
import { Journey } from '../models';

const router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', async (req, res) => {
  console.log('getting journeys from DB');
  try {//TODO validate query params
    const { count, rows } = await Journey.findAndCountAll({
      offset: Number(req.query.currentPage) * 100,
      limit: Number(req.query.rowsPerPage),
      order: [[String(req.query.orderBy), String(req.query.orderDirection)]]
    });
    res.send({count, rows});

  } catch (err) {
    console.log(err);
  }  
});

export default router;