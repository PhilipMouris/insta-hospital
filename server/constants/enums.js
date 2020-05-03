const ROLES = {
  USER: 'user',
  HOSPITAL: 'hospital',
  ADMIN: 'admin'
};
ROLES.ENUM = Object.values(ROLES);
const GENDERS = {
  MALE: 'male',
  FEMALE: 'female'
};
GENDERS.ENUM = Object.values(GENDERS);
const BLOOD_TYPES = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

const ROOM_STATUS = {
  AVAILABLE: 'Available',
  BUSY: 'Busy',
  BOOKED: 'Booked'
};
ROOM_STATUS.ENUM = Object.values(ROOM_STATUS);

const BOOKING_STATUS = {
  CONFIRMED: 'Confirmed',
  PENDING: 'Pending',
  REJECTD: 'Rejected'
};

BOOKING_STATUS.ENUM = Object.values(BOOKING_STATUS);

module.exports = { ROLES, GENDERS, BLOOD_TYPES, BOOKING_STATUS, ROOM_STATUS };
