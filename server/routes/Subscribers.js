const express = require('express');
const wrap = require('express-async-wrapper');
const passport = require('passport');
//const notify = require('../utils/Notify');

const {
  viewAll,
  createSubscriber,
  deleteSubscriber
} = require('../controllers/Subscribers.controller');

const router = express.Router();

router.get('/', wrap(viewAll));

router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  wrap(createSubscriber)
);

router.delete('/:firebaseToken', wrap(deleteSubscriber));

// router.get('/testNotify', async (req, res) => {
//   const data = {
//     title: 'Test Notif',
//     body: 'Test body',
//     link: '/Test',
//     actionTitle: 'sss',
//     img:
//       'https://cdn.pixabay.com/photo/2016/03/31/14/37/check-mark-1292787__340.png'
//   };
//   await notify([1], data);
//   return res.json({ data: 'ok' });
// });

module.exports = router;
