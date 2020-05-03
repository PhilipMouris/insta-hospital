import React, { useEffect, useState } from 'react';
import { Dimmer, Loader, Grid, Confirm } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { get, put, del } from '../../services/axios';
import BasicInfo from './UserBasicInfo';
import ActionSegment from '../HospitalProfile/ActionSegment';
import { useSelector, useDispatch } from 'react-redux';
import UpdatePassModal from '../profiles/UpdatePassModal';
import { logOut } from '../../actions/authActions';

const Profile = props => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isConfirmOpen, setOpenConfifrm] = useState(false);
  const [passModal, setPassModal] = useState(false);
  const [conditions, setConditions] = useState([]);
  const auth = useSelector(state => state.auth);
  const myProfile = `${auth.accountID}` === props.match.params.id;
  const dispatch = useDispatch();

  useEffect(() => {
    const { id } = props.match.params;
    setLoading(true);
    get(`users/${id}`).then(response => {
      setUser(response);
      get(`users/getConditions/${id}`).then(response => {
        setConditions(response);
        setLoading(false);
      });
    });
  }, []);

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

  if (loading)
    return (
      <Dimmer active>
        <Loader size="massive" />{' '}
      </Dimmer>
    );
  console.log(user, conditions, 'USERRR');
  return (
    <div>
      <Grid centered className="partner-container" columns={3}>
        <Grid.Column only="computer" width={3}>
          <ActionSegment
            myProfile={myProfile}
            memberType={auth.role}
            editProfile={editProfile}
            deleteProfile={openConfirm}
            changePassword={openPassModal}
          />
        </Grid.Column>
        <Grid.Column only="computer" width={10}>
          <BasicInfo conditions={conditions} user={user} />
        </Grid.Column>
        <Grid.Column only="mobile" width={14}>
          <BasicInfo
            myProfile={myProfile}
            memberType={auth.role}
            editProfile={editProfile}
            deleteProfile={openConfirm}
            changePassword={openPassModal}
            isMobile={true}
            conditions={conditions}
            user={user}
            conditions={conditions}
          />
        </Grid.Column>
        <Grid.Column only="tablet" width={14}>
          <BasicInfo conditions={conditions} isTablet={true} user={user} />
          <ActionSegment
            myProfile={myProfile}
            memberType={auth.role}
            editProfile={editProfile}
            deleteProfile={openConfirm}
            changePassword={openPassModal}
          />
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
