import React, { Component, useState } from 'react';
import {
  Modal,
  Button,
  Header,
  Input,
  Checkbox,
  TextArea
} from 'semantic-ui-react';
import { post } from '../../services/axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookingModal = ({ onClose, open, hospitalID }) => {
  const [date, setDate] = useState(new Date());
  const [emergency, setEmergency] = useState(false);
  const [Case, setCase] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    const body = {
      hospitalID,
      date,
      emergency,
      case: Case,
      additionalNotes: notes
    };
    setLoading(true);
    setError(false);
    post('bookings/create', body)
      .then(response => {
        setLoading(false);
        onClose();
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="small"
      className="create-booking"
    >
      <Header content="Book a room" textAlign="center" />
      <Modal.Content>
        <DatePicker selected={date} onChange={date => setDate(date)} />
        <Input
          placeholder="Case"
          value={Case}
          onChange={e => setCase(e.target.value)}
        />
        <TextArea
          placeholder="Notes"
          value={notes}
          onChange={e => setNotes(e.target.value)}
        />
        <Checkbox
          label="Emergency?"
          checked={emergency}
          onClick={() => setEmergency(!emergency)}
        />
        <Button positive onClick={handleSubmit} loading={loading}>
          Book
        </Button>
        <span>{error}</span>
      </Modal.Content>
    </Modal>
  );
};

export default BookingModal;
