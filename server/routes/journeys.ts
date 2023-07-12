import express from 'express';
import { Journey } from '../models';

const router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', async (req, res) => {
  console.log('getting journeys from DB');
  try {//TODO validate query params
    const whereClause =
    req.query.departingStation ? {departureStationName: String(req.query.departingStation)}
      : req.query.returningStation ? {returnStationName: String(req.query.returningStation)}
        : {} ;
        
    const { count, rows } = await Journey.findAndCountAll({
      where: whereClause,
      offset: Number(req.query.currentPage) * 100,//TODO is this assuming 100 itmes per page? If so fix it
      limit: Number(req.query.rowsPerPage),
      order: [[String(req.query.orderBy), String(req.query.orderDirection)]]
    });
    res.send({count, rows});

  } catch (err) {
    console.log(err);
  }  
});

export default router;