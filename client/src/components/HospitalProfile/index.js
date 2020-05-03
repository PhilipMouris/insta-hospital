import React, { useEffect, useState, useRef } from 'react';
import { Dimmer, Loader, Grid, Confirm, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { get, put, del } from '../../services/axios';
import BasicInfo from './HospitaBasicInfo';
import ActionSegment from './ActionSegment';
import { useSelector, useDispatch } from 'react-redux';
import ReviewSegment from './FeedBackSegment';
import UpdatePassModal from '../profiles/UpdatePassModal';
import RoomSegment from './RoomSegment';
import BookingSegment from './BookingSegment';
import { logOut } from '../../actions/authActions';
import Map from './Map';
import './maps.css';

const Profile = props => {
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isConfirmOpen, setOpenConfifrm] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [passModal, setPassModal] = useState(false);
  const [segmentLoading, setSegmentLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const auth = useSelector(state => state.auth);
  const myProfile = `${auth.accountID}` === props.match.params.id;
  const dispatch = useDispatch();
  const markerRef = useRef(null);

  useEffect(() => {
    const { id } = props.match.params;
    setLoading(true);
    get(`hospitals/${id}`).then(response => {
      const url = `reviews/hospitalReviews/${id}`;
      setHospital(response);
      get(url).then(response => {
        setReviews(response.reviews);
        const roomsUrl = `rooms/${id}`;
        get(roomsUrl).then(response => {
          setRooms(response.rooms);
          const bookingsUrl = `bookings/hospitalBookings/${id}`;
          get(bookingsUrl).then(response => {
            setBookings(response.bookings);
            setLoading(false);
          });
        });
      });
    });
  }, []);

  const deleteReview = id => {
    const url = `reviews/delete/${id}`;
    del(url, {}).then(() => {
      const deleted = reviews.findIndex(rev => rev._id === id);
      reviews.splice(deleted, 1);
      setReviews([...reviews]);
    });
  };

  const editReview = (id, text, rating) => {
    const url = 'reviews/edit';
    put(url, { id, text, rating }).then(() => {
      const review = reviews.find(review => review.id === id);
      review.text = text;
      review.rating = rating;
      setReviews([...reviews]);
    });
  };

  const logOff = () => {
    localStorage.removeItem('auth');
    let firebaseToken = null;
    // if (this.props.firebaseToken) firebaseToken = this.props.firebaseToken;
    // const { userInfo } = this.props;
    // // this.setState({ notifications: [], notificationCount: 0 });
    // if (firebaseToken !== null && firebaseToken) {
    //   const url = `subscribers/delete/${userInfo.id}/${firebaseToken}`;
    //   del(url, {});
    // }
    dispatch(logOut());
  };

  const redirectDeleted = () => {
    props.history.push('/');
  };
  const deleteProfile = () => {
    const url = 'accounts/deleteAccount';
    del(url, {}).then(res => {
      logOff();
      redirectDeleted();
    });
  };

  const createRoom = () => {};

  const openConfirm = () => {
    setOpenConfifrm(true);
  };

  const editProfile = () => {
    props.history.push('/editProfile');
  };

  const open = () => {};

  const closeConfirm = () => setOpenConfifrm(false);

  const openPassModal = () => {
    setPassModal(true);
  };
  const closePassModal = () => {
    setPassModal(false);
  };

  const onDragEnd = e => {
    const lng = e.latLng.lng();
    const lat = e.latLng.lat();
    const url = 'hospitals/edit';
    hospital.lng = lng;
    hospital.lat = lat;
    setHospital({ ...hospital });
    put(url, { lng, lat }).then(() => setSegmentLoading(false));
  };

  const deleteRoom = id => {
    const url = `rooms/delete/${id}`;
    del(url, {}).then(resp => {
      const deletedIndex = rooms.findIndex(room => room.id === id);
      rooms.splice(deletedIndex, 1);
      setRooms([...rooms]);
    });
  };

  if (loading)
    return (
      <Dimmer active>
        <Loader size="massive" />{' '}
      </Dimmer>
    );

  return (
    <div>
      <Grid centered className="partner-container" columns={3}>
        <Grid.Column only="computer" width={3}>
          <ActionSegment
            myProfile={myProfile}
            memberType={auth.role}
            submitFeedback={open}
            editProfile={editProfile}
            createRoom={createRoom}
            deleteProfile={openConfirm}
            changePassword={openPassModal}
          />
        </Grid.Column>
        <Grid.Column only="computer" width={10}>
          <BasicInfo hospital={hospital} />
          <Segment loading={segmentLoading} id="map-segment">
            <Map
              draggable={myProfile}
              onDragEnd={onDragEnd}
              markerRef={markerRef}
              center={hospital && { lng: hospital.lng, lat: hospital.lat }}
            />
          </Segment>
          <RoomSegment
            deleteRoom={deleteRoom}
            rooms={rooms}
            myProfile={myProfile}
          />
          <ReviewSegment
            deleteReview={deleteReview}
            reviews={reviews}
            myProfile={myProfile}
            del={deleteReview}
            editReview={editReview}
          />
          <BookingSegment bookings={bookings} myProfile={myProfile} />
        </Grid.Column>
        <Grid.Column only="mobile" width={14}>
          <BasicInfo
            myProfile={myProfile}
            memberType={auth.role}
            submitFeedback={open}
            editProfile={editProfile}
            createRoom={createRoom}
            deleteProfile={openConfirm}
            changePassword={openPassModal}
            isMobile={true}
            hospital={hospital}
          />
          <Segment loading={segmentLoading} id="map-segment-mobile">
            <Map
              draggable={myProfile}
              onDragEnd={onDragEnd}
              markerRef={markerRef}
              center={hospital && { lng: hospital.lng, lat: hospital.lat }}
            />
          </Segment>
          <ReviewSegment
            deleteReview={deleteReview}
            reviews={reviews}
            myProfile={myProfile}
            del={deleteReview}
            editReview={editReview}
          />
          <BookingSegment bookings={bookings} myProfile={myProfile} />
        </Grid.Column>
        <Grid.Column only="tablet" width={14}>
          <BasicInfo isTablet={true} hospital={hospital} />
          <Segment loading={segmentLoading} id="map-segment-tablet">
            <Map
              draggable={myProfile}
              onDragEnd={onDragEnd}
              markerRef={markerRef}
              center={hospital && { lng: hospital.lng, lat: hospital.lat }}
            />
          </Segment>
          <ActionSegment
            myProfile={myProfile}
            memberType={auth.role}
            submitFeedback={open}
            editProfile={editProfile}
            createRoom={createRoom}
            deleteProfile={openConfirm}
            changePassword={openPassModal}
          />
          <ReviewSegment
            deleteReview={deleteReview}
            reviews={reviews}
            myProfile={myProfile}
            del={deleteReview}
            editReview={editReview}
          />
          <BookingSegment bookings={bookings} myProfile={myProfile} />
        </Grid.Column>
        <Grid.Column only="computer" width={3} />
      </Grid>
      <Confirm
        open={isConfirmOpen}
        onCancel={closeConfirm}
        content="Are you sure you want to delete your profile?"
        onConfirm={deleteProfile}
      />
      {myProfile && (
        <UpdatePassModal
          id={props.match.params.id}
          open={passModal}
          closeUpdateModal={closePassModal}
        />
      )}
    </div>
  );
};

export default withRouter(Profile);
