import React, { useState } from 'react';
import { Card, Button } from 'semantic-ui-react';
import { put } from '../../services/axios';
import { withRouter } from 'react-router-dom';

const BookingCard = ({
  date,
  emergency,
  Case,
  additionalNotes,
  status,
  id,
  userID,
  history,
  myProfile
}) => {
  const [confirmed, setConfirmed] = useState(status === 'Confirmed');
  const [rejected, setRejected] = useState(status === 'Rejected');
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const confirm = () => {
    setConfirmLoading(true);
    setError(false);
    put('bookings/edit', {
      id,
      status: 'Confirmed'
    })
      .then(response => {
        setConfirmed(true);
        setRejected(false);
        setConfirmLoading(false);
      })
      .catch(error => {
        setError(true);
        setErrorMsg(error.message);
        setConfirmLoading(false);
      });
  };

  const reject = () => {
    setRejectLoading(true);
    setError(false);
    put('bookings/edit', {
      id,
      status: 'Rejected'
    })
      .then(response => {
        setRejected(true);
        setConfirmed(false);
        setRejectLoading(false);
      })
      .catch(error => {
        setError(true);
        setRejectLoading(false);
      });
  };

  const redirect = () => {
    history.push(`/user/${userID}`);
  };

  return (
    <Card id="card">
      <Card.Content>
        <Card.Meta>Date: {date.substring(0, 10)}</Card.Meta>
        <Card.Meta>Emergency: {emergency ? 'Yes' : 'No'}</Card.Meta>
        <Card.Meta>Case: {Case}</Card.Meta>
        <Card.Meta>
          Status: {confirmed ? 'Confirmed' : rejected ? 'Rejected' : 'Pending'}
        </Card.Meta>
        <Card.Meta>Notes: {additionalNotes}</Card.Meta>
      </Card.Content>
      {myProfile && (
        <Card.Content extra textAlign="center">
          <Button primary onClick={() => redirect()}>
            Profile
          </Button>
          <Button
            positive
            disabled={confirmed}
            onClick={confirm}
            loading={confirmLoading}
          >
            Confirm
          </Button>
          <Button
            negative
            disabled={rejected}
            onClick={reject}
            loading={rejectLoading}
          >
            Reject
          </Button>
        </Card.Content>
      )}
      {error && (
        <Card.Content extra textAlign="center" className="error">
          {errorMsg}
        </Card.Content>
      )}
    </Card>
  );
};

export default withRouter(BookingCard);
