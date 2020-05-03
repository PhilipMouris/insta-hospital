const { send, sendError } = require('../utils/send');
const {
  editValidation,
  searchValidation
} = require('../validations/Hospitals.validation');
const { viewValidation } = require('../validations/Common.validations');
const { validation } = require('../constants/StatusCodes');
const Hospital = require('../models/hospital.model');
const Account = require('../models/account.model');
const { getDistanceMatrix } = require('../services/GoogleMaps');

const viewAll = async (req, res) => {
  const { error } = viewValidation(req.body);
  if (error) return sendError(res, validation, error.details[0].message);
  const { page = 0, perPage = 30 } = req.body;
  const { count, rows } = await Hospital.findAndCountAll(
    { include: [{ model: Account, required: true }] },
    {
      offset: parseInt(page, 2) * perPage,
      limit: parseInt(perPage, 2)
    }
  );
  const lastPage = Math.ceil(count / parseInt(perPage, 2)) - 1;
  return send(
    { hospitals: rows, meta: { totalEntries: count, lastPage } },
    res
  );
};

const viewProfile = async (req, res) => {
  const { id } = req.params;
  const user = await Hospital.findOne({
    where: { accountID: id },
    include: [{ model: Account }]
  });
  return send(user, res);
};

const editProfile = async (req, res) => {
  const { error } = editValidation(req.body);
  if (error) return sendError(res, validation, error.details[0].message);
  const { lng, lat } = req.body;
  if (lng && lat) req.body.isComplete = true;
  const hospital = await Hospital.update(req.body, {
    where: { accountID: req.user.accountID },
    returning: true
  });
  return send(hospital[1][0], res);
};

const filterHospitals = (query, hospitals) =>
  hospitals.filter(hospital => {
    const keys = ['name', 'description', 'address', 'phoneNumber'];
    const queryKeyWords = query.split(' ');
    let matchFlag = false;
    keys.forEach(key => {
      queryKeyWords.forEach(keyword => {
        const searchKey = keyword.toUpperCase();
        const hospitalKey = `${hospital[key]}`.toUpperCase();
        if (hospitalKey.includes(searchKey)) matchFlag = true;
      });
    });
    return matchFlag;
  });

const searchHospitals = async (req, res) => {
  const { error } = searchValidation(req.body);
  if (error) return sendError(res, validation, error.details[0].message);
  const { query, lng, lat } = req.body;
  const hospitals = await Hospital.findAll({
    include: [{ model: Account, required: true }]
  });
  const filteredHospitals = !query
    ? hospitals
    : filterHospitals(query, hospitals);
  if (!lng && !lat) {
    return send(filterHospitals, res);
  }
  const distances = await getDistanceMatrix({ lng, lat }, hospitals);
  const nearestHospitals = filteredHospitals.map((hospital, index) => {
    if (!distances[index].distance) return;
    return {
      hospital: hospital.dataValues,
      distance: distances[index].distance,
      duration: distances[index].duration
    };
  });
  const sortedHospitals = nearestHospitals.sort(
    (hospitalA, hospitalB) =>
      hospitalA.duration.value - hospitalB.duration.value
  );

  return send(sortedHospitals, res);
};

module.exports = { viewAll, viewProfile, editProfile, searchHospitals };
