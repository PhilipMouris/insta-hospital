import React, { useState, useEffect } from 'react';
import {
  Segment,
  Header,
  Icon,
  Message,
  Input,
  Transition
} from 'semantic-ui-react';
import './hospitalProfile.css';
import BookingCard from './BookingCard';
import { withRouter } from 'react-router-dom';

const BookingSegment = ({ bookings, myProfile }) => {
  return (
    <Segment id="vacancy-segment" padded>
      <Header as="h1" textAlign="center">
        {myProfile ? 'My Bookings' : 'Bookings'}
      </Header>
      {bookings ? (
        <div>
          <Header textAlign="center">
            <Message info compact hidden={bookings.length > 0}>
              No bookings found
            </Message>
          </Header>
          <Transition.Group duration={400}>
            <div id="card-container">
              {bookings.map(booking => (
                <BookingCard
                  key={booking.id}
                  date={booking.date}
                  emergency={booking.emergency}
                  Case={booking.case}
                  additionalNotes={booking.additionalNotes}
                  status={booking.status}
                  id={booking.id}
                  userID={booking.userID}
                  myProfile={myProfile}
                />
              ))}
            </div>
          </Transition.Group>
        </div>
      ) : null}
    </Segment>
  );
};

export default withRouter(BookingSegment);
