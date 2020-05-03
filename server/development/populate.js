const { RandomCoordinateUtils, LatLng } = require('@molteni/coordinate-utils');
const bcrypt = require('bcryptjs');
const Account = require('../models/account.model');
const Booking = require('../models/booking.model');
const Condition = require('../models/condition.model');
const Hospital = require('../models/hospital.model');
const Review = require('../models/review.model');
const Room = require('../models/room.model');
const User = require('../models/user.model');
const UserConditions = require('../models/userConditions.model');
const {
  ROLES: { HOSPITAL, USER },
  BLOOD_TYPES,
  GENDERS,
  ROOM_STATUS
} = require('../constants/enums');

// Creating 100 accounts
// 70 users and 25 hospitals

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const createAccounts = async () => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync('123456789', salt);
  const promises = [];
  for (let i = 0; i < 100; i++) {
    const role = i < 69 ? USER : HOSPITAL;
    promises.push(
      Account.create({
        name: `${role}${i + 1}`,
        role,
        email: `User${i + 1}@gmail.com`,
        password: hashedPassword,
        img: 'https://picsum.photos/400'
      })
    );
  }
  const accounts = await Promise.all(promises);
  return accounts;
};

// Creating conditions
const createConditions = async () => {
  const conditions = [
    `Allergy,ALGY`,
    `Congestive Heart Failure,CHF`,
    `Congestive Heart Disease,CHD`,
    `Chronic Obstructive Pulmonary Disease,COPD`,
    `Ehlers–Danlos syndrome,EDS`,
    `Fibromyalgia syndrome,FMS`,
    `Generalized anxiety disorder,GAD`,
    `Insulin Dependent Diabetes Mellitus,IDDM`,
    `Hearing impaired,HI`,
    `High Blood Pressure,HBP`,
    `Hypertension,HTN`,
    `Inflammatory bowel disease,IBD`,
    `Irritable bowel syndrome,IBS`,
    `Kawasaki syndrome,KS`,
    `Klippel–Trenaunay syndrome,KTS`,
    `Klippel–Trenaunay–Weber syndrome,KTW Syndrome`,
    `Multiple chemical sensitivities,MCS`,
    `Muscular dystrophy,MD`,
    `Multiple sclerosis,MS`,
    `No Known Allergies,NKA`,
    `Post-Traumatic Stress Disorder,PTSD`,
    `Parkinson's disease, PD`,
    `Pulmonary embolism,PE`,
    `Rheumatoid arthritis,RA`,
    `Spina bifida,SB`,
    `Traumatic brain injury,TBI`,
    `Tourette syndrome,TS`,
    `Type 1 or Type 2 Diabetes,T1D/T2D`
  ];
  const promises = conditions.reduce((accum, condition) => {
    const [name, abbreviation] = condition.split(',');
    return [...accum, Condition.create({ name, abbreviation })];
  }, []);
  await Promise.all(promises);
};

const createHospitals = async () => {
  const CAIRO = new LatLng(30.0444196, 31.23571160000006);
  const hospitalAccounts = await Account.findAll({ where: { role: HOSPITAL } });
  const promises = hospitalAccounts.reduce((accum, account) => {
    const location = RandomCoordinateUtils.randomCoordinateFromPosition(
      CAIRO,
      60
    );

    return [
      ...accum,
      Hospital.create({
        accountID: account.id,
        name: `${HOSPITAL}${account.id}`,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        lng: location.longitude,
        lat: location.latitude,
        address: `address${account.id}`,
        phoneNumber: '123456789'
      })
    ];
  }, []);

  await Promise.all(promises);
};

const createUsers = async () => {
  const userAccounts = await Account.findAll({ where: { role: USER } });
  const promises = userAccounts.reduce((accum, account, index) => {
    return [
      ...accum,
      User.create({
        accountID: account.id,
        name: `${USER}${account.id}`,
        birthDate: `${randomInt(1, 12)}-${randomInt(1, 31)}-${randomInt(
          1950,
          2010
        )}`,
        weight: randomInt(40, 120),
        gender: GENDERS.ENUM[randomInt(0, 1)],
        mobile: '12345',
        allergies: 'N/A',
        diabetes: index % 2 === 0,
        bloodType: BLOOD_TYPES[randomInt(0, BLOOD_TYPES.length - 1)],
        surgicalHistory:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
      })
    ];
  }, []);
  await Promise.all(promises);
};

const createUserConditions = async () => {
  const users = await User.findAll();
  users.forEach(user => {
    UserConditions.create({
      userID: user.accountID,
      conditionID: randomInt(1, 28)
    });
  });
};

const createRooms = async () => {
  const hospitals = await Hospital.findAll();
  hospitals.forEach(hospital => {
    for (let i = 0; i < 10; i++) {
      Room.create({
        hospitalID: hospital.accountID,
        roomNumber: `Room ${i}`,
        roomStatus: ROOM_STATUS.ENUM[randomInt(0, ROOM_STATUS.ENUM.length - 1)]
      });
    }
  });
};

const createReviews = async () => {
  const hospitals = await Hospital.findAll();
  hospitals.forEach(hospital => {
    Review.create({
      userId: randomInt(1, 70),
      hospitalId: hospital.accountID,
      rating: randomInt(1, 5),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
    });
  });
};

const populate = async () => {
  await createAccounts();
  await createConditions();
  await createHospitals();
  await createUsers();
  createUserConditions();
  createRooms();
  createReviews();
};

module.exports = populate;
