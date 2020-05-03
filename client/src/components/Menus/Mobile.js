import React, { useState } from 'react';
import './menus.css';
import {
  Menu,
  Sidebar,
  Icon,
  Header,
  Divider,
  Image,
  Label
} from 'semantic-ui-react';
import MobileField from './MobileField';
import Notifications from '../notifications/Notifications';

const MobileMenu = ({
  markAsRead,
  notificationCount,
  isSidebarVisible,
  showSideBar,
  userInfo,
  login,
  logOut,
  notifications,
  deleteNotifications,
  hideSidebar,
  redirectHome,
  redirectProfile,
  addNotificationCount
}) => {
  const [isNotifOpen, setNotifOpen] = useState(false);

  const openNotif = () => {
    if (notificationCount > 0) {
      markAsRead();
    }
    setNotifOpen(!isNotifOpen);
  };
  const closeNotif = () => {
    setNotifOpen(false);
  };

  return (
    <div>
      <Menu className="main-menu mobile-menu" borderless fixed="top">
        <Menu.Item onClick={redirectHome}>
          <Header inverted>instaHospital</Header>
        </Menu.Item>
        <Menu.Item position="right">
          {userInfo ? (
            <Icon.Group size="large">
              <Icon
                className="mainMenu-link"
                id="notifTarget"
                size="large"
                name="bell outline"
                inverted
                style={{ cursor: 'pointer' }}
                onClick={openNotif}
              >
                {notificationCount > 0 ? (
                  <Label circular floating color="red">
                    <span id="notification-font">{notificationCount}</span>
                  </Label>
                ) : null}
              </Icon>
              {userInfo && isNotifOpen ? (
                <Notifications
                  deleteNotifications={deleteNotifications}
                  close={closeNotif}
                  openNotif={openNotif}
                  addNotificationCount={addNotificationCount}
                  userId={userInfo.accountID}
                  notifications={notifications}
                />
              ) : null}
            </Icon.Group>
          ) : null}

          <Icon size="big" inverted name="sidebar" onClick={showSideBar} />
        </Menu.Item>
      </Menu>
      <Sidebar
        as={Menu}
        animation="overlay"
        width="thin"
        visible={isSidebarVisible}
        vertical
        inverted
        stackable
        direction="right"
        size="tiny"
      >
        {userInfo ? (
          <Menu.Item
            className="centered-Menu-item"
            onClick={() => {
              hideSidebar();
              redirectHome();
            }}
          >
            <Image
              size="mini"
              className="user-menu"
              src={userInfo.img}
              avatar
            />
            <Header size="small" className="profile-header" inverted>
              {userInfo.email}
            </Header>
          </Menu.Item>
        ) : null}
        <Divider fitted />
        <MobileField
          hideSidebar={hideSidebar}
          to="/hospitals"
          icon="building outline"
          name="Hospitals"
        />
        <MobileField
          hideSidebar={hideSidebar}
          to="/Contact"
          icon="headphones"
          name="Contact US"
        />
        {userInfo ? (
          <Menu.Item
            onClick={() => {
              hideSidebar();
              logOut();
            }}
          >
            <Header textAlign="center" icon inverted>
              Log out
            </Header>
          </Menu.Item>
        ) : (
          [
            <Menu.Item
              key="login"
              onClick={() => {
                hideSidebar();
                redirectHome();
              }}
            >
              <Header textAlign="center" icon inverted>
                Log In
              </Header>
            </Menu.Item>,
            <MobileField
              hideSidebar={hideSidebar}
              key="signUp"
              to="/"
              name="Sign up"
            />
          ]
        )}
      </Sidebar>
    </div>
  );
};

export default MobileMenu;
