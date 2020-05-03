import React, { useReducer, useEffect } from 'react';
import './App.css';
import { Responsive } from 'semantic-ui-react';
import DesktopMenu from './components/Menus/Desktop';
import Footer from './components/Footer/index';
import MobileMenu from './components/Menus/Mobile';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  logIn,
  logOut,
  removeFireBaseToken,
  setFireBaseToken
} from './actions/authActions';
import { get, del, put } from './services/axios';
const firebase = require('firebase');
require('dotenv').config();

const {
  REACT_APP_FIREBASE_KEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_SENDER_ID,
  REACT_APP_DATABASE,
  REACT_APP_FIREBASE_APP_ID
} = process.env;

const config = {
  apiKey: REACT_APP_FIREBASE_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  databaseURL: REACT_APP_DATABASE,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID
};
firebase.initializeApp(config);
firebase
  .messaging()
  .usePublicVapidKey(
    'BPgRlyFu7oPQNI34lY9AVdRysmu2JTKA-uDq5y62_nx1CcY0RcpuWz5uB189K9yfvTLtG06QvCnYD9QRVaxYgWQ'
  );
firebase
  .messaging()
  .getToken()
  .then(token => console.log('TOKEN'));
firebase.messaging().onMessage(payload => {
  console.log('PAYLOAD');
});

const App = ({ children, ...props }) => {
  const initialState = {
    isSidebarVisible: false,
    notifications: [],
    notificationCount: 0
  };
  const appReducer = (state, payload) => ({ ...state, ...payload });

  const dispatch = useDispatch();
  const [state, setState] = useReducer(appReducer, initialState);
  const userInfo = useSelector(state => state.auth);
  console.log(userInfo, 'USER');

  useEffect(() => {
    setToken();
    // try {

    //     let { notifications, notificationCount } = state;
    //     //notifications.push(payload);
    //     if (!payload.data.accounIds.includes(userInfo.accountID)) return;
    //     notifications = [payload].concat(notifications);
    //     setState({
    //       notifications,
    //       notificationCount: notificationCount + 1
    //     });
    //     firebase
    //       .notifications()
    //       .onNotification(payload => console.log(payload));
    //   });
    // } catch (e) {
    //   console.log(e, 'ERROR');
  }, []);

  try {
    console.log('HERE');
    firebase.messaging().onMessage(payload => {
      console.log(payload, 'PAYLOAD');
      let { notifications, notificationCount } = state;
      //notifications.push(payload);
      if (!payload.data.userIds.includes(userInfo.accountID)) return;
      notifications = [payload].concat(notifications);
      setState({
        notifications,
        notificationCount: notificationCount + 1
      });
    });
  } catch (e) {
    console.log(e);
  }

  const showSideBar = () => {
    setState({ isSidebarVisible: true });
  };
  const hideSidebar = () => {
    setState({ isSidebarVisible: false });
  };

  const redirectHome = () => props.history.push('/');

  const setToken = () => {
    const token = localStorage.getItem('auth');
    const fbToken = localStorage.getItem('fireBaseToken');
    let { notifications } = state;
    if (!token) return;
    const parsedToken = JSON.parse(token);
    dispatch(logIn(parsedToken));
    if (fbToken) {
      console.log(fbToken, 'FBBB');
      const parsedFireBase = JSON.parse(fbToken);
      dispatch(setFireBaseToken(parsedFireBase.token));
    }

    const url = 'notifications';
    get(url).then(notifications => {
      console.log(notifications, 'NOTIFICATIONS');
      setState({ notifications });
      notifications = notifications.reverse().sort((a, b) => {
        if (!a.read) {
          if (b.read) return -1;
        }
        if (a.read) {
          if (b.read) return 0;
          else {
            return 1;
          }
        }
      });

      setState({
        notifications,
        notificationCount: notifications.filter(notif => !notif.isRead).length
      });
    });
  };

  const logOutApp = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('fireBaseToken');
    setState({ notifications: [], notificationCount: 0 });
    const { firebaseToken } = userInfo;
    if (firebaseToken !== null && firebaseToken) {
      const url = `subscribers/${firebaseToken}`;
      del(url, {});
    }
    dispatch(removeFireBaseToken());
    dispatch(logOut());
  };

  const deleteNotifications = () => {
    const url = 'notifications/deleteAll';
    del(url, {}).then(() => {
      setState({ notifications: [] });
    });
  };

  const redirectProfile = () => {
    props.history.push(`${userInfo.role}/${userInfo.accountID}`);
  };
  const markAsRead = () => {
    const url = 'notifications/markAsRead';
    put(url, {}).then(() => {
      setState({ notificationCount: 0 });
    });
  };

  const {
    isSidebarVisible,
    notificationCount,
    notifications,
    firebaseToken
  } = state;
  return (
    <div className="app-wrapper">
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <DesktopMenu
          notifications={notifications}
          notificationCount={notificationCount}
          markAsRead={markAsRead}
          deleteNotifications={deleteNotifications}
          redirectHome={redirectHome}
          isSidebarVisible={isSidebarVisible}
          userInfo={userInfo}
          redirectHome={redirectHome}
          logOut={logOutApp}
          redirectProfile={redirectProfile}
        ></DesktopMenu>
        <div className="app-container">{children}</div>
      </Responsive>
      <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
        <MobileMenu
          showSideBar={showSideBar}
          notifications={notifications}
          notificationCount={notificationCount}
          markAsRead={markAsRead}
          deleteNotifications={deleteNotifications}
          redirectHome={redirectHome}
          isSidebarVisible={isSidebarVisible}
          userInfo={userInfo}
          hideSidebar={hideSidebar}
          logOut={logOutApp}
          redirectProfile={redirectProfile}
        ></MobileMenu>
        <div
          style={{ minHeight: props.location.pathname === '/' ? '' : '80vh' }}
          className="element app-container"
          onClick={hideSidebar}
        >
          {children}
        </div>
      </Responsive>
      <Footer />
    </div>
  );
};

export default withRouter(App);
