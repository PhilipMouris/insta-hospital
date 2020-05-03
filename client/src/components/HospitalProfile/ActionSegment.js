import React, { Component } from 'react';
import { Segment, Header, Icon } from 'semantic-ui-react';
import './hospitalProfile.css';

const ActionSegment = ({
  editProfile,
  createRoom,
  submitFeedback,
  changePassword,
  myProfile,
  deleteProfile,
  memberType
}) => {
  if (!myProfile || !memberType === 'user') return null;
  const isUser = memberType === 'user';
  return (
    <Segment padded id="action-segment">
      {myProfile ? (
        <div>
          <Header size="small" onClick={editProfile} className="click">
            Edit Profile
            <Icon id="action-icon" color="yellow" name="edit" />
          </Header>
          <Header size="small" onClick={changePassword} className="click">
            Change Password
            <Icon id="action-icon" color="black" name="lock" />
          </Header>
          {!isUser && (
            <Header size="small" onClick={createRoom} className="click">
              Add a room
              <Icon id="action-icon" color="green" name="plus" />
            </Header>
          )}
          <Header
            size="small"
            color="red"
            onClick={deleteProfile}
            className="click"
          >
            Delete Profile
            <Icon id="action-icon" color="red" name="close" />
          </Header>
        </div>
      ) : null}
    </Segment>
  );
};

export default ActionSegment;
