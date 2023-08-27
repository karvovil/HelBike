import express from 'express';
import { Journey } from '../models';

const router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', async (req, res) => {
  try {
    const whereClause =
    req.query.departingStation
      ? { departureStationName: String(req.query.departingStation) }
      : req.query.returningStation
        ? { returnStationName: String(req.query.returningStation) }
        : {} ;

    const { count, rows } = await Journey.findAndCountAll({
      where: whereClause,
      offset: Number(req.query.currentPage) * Number(req.query.rowsPerPage),
      limit: Number(req.query.rowsPerPage),
      order: [[String(req.query.orderBy), String(req.query.orderDirection)]]
    });
    res.send({ count, rows });

  } catch (err) {
    console.log(err);
  }
});

export default router;