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
//import JobAppsModal from "./JobAppsModal";
import { get, del } from '../../services/axios';
import RoomCard from './RoomCard';
import { withRouter } from 'react-router-dom';

const RoomSegment = ({ rooms, myProfile }) => {
  const [state, setState] = useState({
    loading: true,
    error: false,
    searchBar: '',
    deletedId: '',
    editedId: '',
    jobApplicationId: '',
    openJobAppModal: false
  });

  const changeSearchBar = e => {
    setState({ ...state, searchBar: e.target.value });
  };

  const search = rooms => {
    const { searchBar } = state;
    if (!rooms) return rooms;
    if (searchBar.length === 0) {
      return rooms;
    }
    const keys = searchBar.split(' ');
    const filteredArray = [];
    const searchProps = ['roomNumber', 'roomStatus'];
    rooms.forEach(vac => {
      keys.forEach(key => {
        searchProps.forEach(prop => {
          const value = vac[prop];
          if (value) {
            if (value.toUpperCase().includes(key.toUpperCase())) {
              if (vac.matchCount) vac.matchCount++;
              else vac.matchCount = 1;
            }
          }
        });
      });
      if (vac.matchCount) filteredArray.push(vac);
    });
    const result = filteredArray
      .sort((a, b) => b.matchCount - a.matchCount)
      .map(obj => {
        delete obj.matchCount;
        return obj;
      });
    console.log(result, 'RESULT');
    return result;
  };

  // viewJobApplications = (jobApplicationId, vacancyApprove) => {
  //   this.setState({ jobApplicationId, openJobAppModal: true, vacancyApprove });
  // };
  // closeJobApplications = () => {
  //   this.setState({ openJobAppModal: false });
  // };
  // setTaken = _id => {
  //   const { vacancies } = this.state;
  //   const index = vacancies.findIndex(vac => vac._id === _id);
  //   vacancies[index].state = "taken";
  //   this.setState({ vacancies });
  // };

  const {
    loading,
    vacancies,
    error,
    searchBar,
    deletedId,
    jobApplicationId,
    openJobAppModal,
    vacancyApprove
  } = state;
  const filteredRooms = search(rooms);
  console.log(filteredRooms, 'FILTEREED');
  return (
    <Segment id="vacancy-segment" padded>
      {/* <JobAppsModal
        setTaken={this.setTaken}
        vacancy={vacancyApprove}
        vacancyId={jobApplicationId}
        open={openJobAppModal}
        onClose={this.closeJobApplications}
        partnerId={id}
      /> */}
      <Message className="error-message" compact error hidden={!error} icon>
        <Icon size="mini" name="times circle" />
        Something went wrong !
      </Message>
      <Header as="h1" textAlign="center">
        {myProfile ? 'My Rooms' : 'Rooms'}
      </Header>
      {rooms ? (
        <div>
          <Header textAlign="center">
            <Input
              onChange={changeSearchBar}
              size="mini"
              icon="search"
              placeholder="search using any field"
            />
          </Header>
          <Header textAlign="center">
            <Message info compact hidden={filteredRooms.length > 0}>
              No rooms found
            </Message>
          </Header>
          <Transition.Group duration={400}>
            <div id="card-container">
              {filteredRooms.map(room => (
                <RoomCard
                  roomNumber={room.roomNumber}
                  roomStatus={room.roomStatus}
                  key={room.id}
                  searchBar={searchBar}
                ></RoomCard>
              ))}
            </div>
          </Transition.Group>
        </div>
      ) : null}
    </Segment>
  );
};

export default withRouter(RoomSegment);
