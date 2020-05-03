import React, { Component } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import './hospitals.css';
import Highlightable from '../Highlightable';
import { useSelector } from 'react-redux';

const ProfileCard = ({
  data: {
    accountID,
    name,
    description,
    address,
    phoneNumber,
    Account,
    distance,
    duration
  },
  searchWords,
  redirect,
  setBookedHospital
}) => {
  const imageSrc =
    Account &&
    Account.img &&
    Account.img !== null &&
    Account.img.includes('.') &&
    Account.img.includes('/')
      ? Account.img
      : 'https://react.semantic-ui.com/images/wireframe/image.png';

  const auth = useSelector(state => state.auth);
  return (
    <Card onClick={() => redirect(accountID)} className="hvr-grow centered">
      <Image>
        <div
          className="images"
          style={{ backgroundImage: 'url(' + imageSrc + ')' }}
        />
      </Image>
      <Card.Content>
        <Card.Header className="first-header" textAlign="center">
          <Highlightable
            green={true}
            textToHighlight={name}
            searchWords={searchWords}
          />
        </Card.Header>
        <Card.Header key={address} className="card-header" textAlign="center">
          <Highlightable
            green={true}
            textToHighlight={address}
            searchWords={searchWords}
          />
        </Card.Header>
        <Card.Header
          key={phoneNumber}
          className="card-header"
          textAlign="center"
        >
          <Highlightable
            green={true}
            textToHighlight={phoneNumber}
            searchWords={searchWords}
          />
        </Card.Header>
        <Card.Header
          key={description}
          className="card-header"
          textAlign="center"
        >
          <Highlightable
            green={true}
            textToHighlight={description}
            searchWords={searchWords}
          />
        </Card.Header>
        {distance && (
          <Card.Header
            key={distance}
            className="card-header"
            textAlign="center"
          >
            Distance: {distance.text}
          </Card.Header>
        )}
        {duration && (
          <Card.Header
            key={duration}
            className="card-header"
            textAlign="center"
          >
            Duration: {duration.text}
          </Card.Header>
        )}
      </Card.Content>
      {auth.role === 'user' && (
        <Card.Content extra textAlign="center">
          <Button
            positive
            onClick={e => {
              e.stopPropagation();
              setBookedHospital(accountID);
            }}
          >
            Book a room
          </Button>
        </Card.Content>
      )}
    </Card>
  );
};

export default ProfileCard;
