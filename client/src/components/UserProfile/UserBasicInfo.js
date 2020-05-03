import React from 'react';
import '../HospitalProfile/hospitalProfile.css';
import { Image, Header, Grid, Segment, Button, List } from 'semantic-ui-react';
import ActionSegment from '../HospitalProfile/ActionSegment';

const PartnerBasicInfo = ({
  isMobile,
  submitFeedback,
  editProfile,
  createRoom,
  myProfile,
  memberType,
  changePassword,
  user,
  conditions
}) => {
  if (!user) return null;
  console.log(conditions, 'CONDITIONSSS');
  const {
    Account: { createdAt, email, img },
    age,
    allergies,
    bloodType,
    diabetes,
    gender,
    mobile,
    surgicalHistory,
    weight,
    name
  } = user;

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
            <Header sub>Age</Header>
            <span>{age}</span>
          </Grid.Column>
          <Grid.Column>
            <Header sub>Allergies</Header>
            <span>{allergies}</span>
          </Grid.Column>
          <Grid.Column>
            <Header sub>BloodType</Header>
            <span>{bloodType}</span>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header sub>Diabetes </Header>
            <span>{diabetes ? 'YES' : 'NO'}</span>
          </Grid.Column>
          <Grid.Column>
            <Header sub>Weight </Header>
            <span>{weight}</span>
          </Grid.Column>
          <Grid.Column>
            <Header sub>Surgical History </Header>
            <span>{surgicalHistory}</span>
          </Grid.Column>
          <Grid.Column>
            <Header sub>Mobile </Header>
            <span>{mobile}</span>
          </Grid.Column>

          <Grid.Column>
            <Header sub>Conditions</Header>
            <List bulleted>
              {conditions.map(cond => (
                <List.Item key={cond.conditionID}>
                  {`${cond.Condition.name} - ${cond.Condition.abbreviation}`}
                </List.Item>
              ))}
            </List>
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
