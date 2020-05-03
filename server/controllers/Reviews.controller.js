const { send, sendError } = require('../utils/send');
const {
  createValidation,
  editValidation
} = require('../validations/Reviews.validation');
const {
  ROLES: { HOSPITAL }
} = require('../constants/enums');
const Review = require('../models/review.model');
const Account = require('../models/account.model');
const User = require('../models/user.model');

const { validation, entityNotFound } = require('../constants/StatusCodes');
const {
  viewValidation,
  idValidation
} = require('../validations/Common.validations');
const { notify } = require('../utils/Notify');
const { userReview } = require('../constants/notifications');

const viewHospitalReviews = async (req, res) => {
  const { error } = idValidation(req.params, 'hospitalID');
  if (error) return sendError(res, validation, error.details[0].message);
  const { error: paginationError } = viewValidation(req.body);
  if (paginationError)
    return sendError(res, validation, paginationError.details[0].message);
  const { page = 0, perPage = 10 } = req.body;
  const { hospitalID } = req.params;
  const { count, rows } = await Review.findAndCountAll(
    {
      include: [
        { model: Account, as: 'user' },
        { model: Account, as: 'hospital' }
      ],

      where: { hospitalId: hospitalID }
    },

    {
      offset: parseInt(page, 2) * perPage,
      limit: parseInt(perPage, 2)
    }
  );
  const lastPage = Math.ceil(count / parseInt(perPage, 2)) - 1;
  return send({ reviews: rows, meta: { totalEntries: count, lastPage } }, res);
};

const checkHospital = async (req, res) => {
  const { hospitalID } = req.body;
  const hospitalCheck = await Account.findOne({
    where: { id: hospitalID, role: HOSPITAL }
  });
  if (!hospitalCheck) return sendError(res, entityNotFound);
  return null;
};

const checkReview = async (id, res) => {
  const review = await Review.findByPk(id);
  if (!review) return sendError(res, entityNotFound);
  return null;
};

const createReview = async (req, res) => {
  const { error } = createValidation(req.body);
  if (error) return sendError(res, validation, error.details[0].message);
  await checkHospital(req, res);
  req.body.userID = req.user.accountID;
  const review = await Review.create(req.body);
  const user = await Account.findByPk(req.user.accountID);
  notify([review.hospitalID], userReview(user.img));
  return send(review, res);
};

const editReview = async (req, res) => {
  const { error } = editValidation(req.body);
  if (error) return sendError(res, validation, error.details[0].message);
  const { id } = req.body;
  await checkReview(id, res);
  delete req.body.id;
  const review = await Review.update(req.body, {
    where: { id },
    returning: true
  });
  return send(review[1][0], res);
};

const deleteReview = async (req, res) => {
  const { error } = idValidation(req.params, 'reviewID');
  if (error) return sendError(res, validation, error.details[0].message);
  const { reviewID } = req.params;
  await checkReview(reviewID, res);
  await Review.destroy({
    where: { id: reviewID, userId: req.user.accountID }
  });
  return send('ok', res);
};

module.exports = {
  viewHospitalReviews,
  createReview,
  editReview,
  deleteReview
};
