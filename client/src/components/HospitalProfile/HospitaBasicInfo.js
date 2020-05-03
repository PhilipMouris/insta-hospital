import React, { Component } from 'react';
import './hospitalProfile.css';
import { Image, Header, Grid, Segment, Button, List } from 'semantic-ui-react';
import ActionSegment from './ActionSegment';

const PartnerBasicInfo = ({
  hospital,
  isMobile,
  submitFeedback,
  editProfile,
  createRoom,
  myProfile,
  memberType,
  changePassword
}) => {
  if (!hospital) return null;
  console.log(hospital, 'HOSPITAL');
  const {
    Account: { createdAt, email, img },
    address,
    description,
    isComplete,
    lat,
    lng,
    name,
    phoneNumber
  } = hospital;

  return (
    <div className="partner-info-container">
      <Image avatar size="small" src={img} />
      <Header as="h1" textAlign="center">
        {name}
      </Header>
      <Grid id="mobile-padding" columns={4} divided stackable as={Segment}>
        <Grid.Row>
          <Grid.Column>
            <Header sub>Email </Header>
            <span>{email}</span>
          </Grid.Column>
          <Grid.Column>
            <Header sub>Address</Header>
            <span>{address}</span>
          </Grid.Column>
          <Grid.Column>
            <Header sub>Phone</Header>
            <span>{phoneNumber}</span>
          </Grid.Column>
          <Grid.Column>
            <Header sub>Description</Header>
            <span>{description}</span>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          {isMobile ? (
            <Grid.Column>
              <ActionSegment
                myProfile={myProfile}
                memberType={memberType}
                submitFeedback={submitFeedback}
                editProfile={editProfile}
                createRoom={createRoom}
                changePassword={changePassword}
              />
            </Grid.Column>
          ) : null}
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default PartnerBasicInfo;
