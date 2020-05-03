import React, { useState } from 'react';
import { Menu, Button, Icon, Image, Dropdown, Label } from 'semantic-ui-react';
import './menus.css';
import DesktopField from './DesktopField';
import { Link } from 'react-router-dom';
import Notifications from '../notifications/Notifications.js';

const DesktopMenu = props => {
  const [isDropOpen, setOpenDropDown] = useState(false);
  const [isNotifOpen, setNotif] = useState(false);

  const openDropDown = () => {
    setOpenDropDown(true);
  };
  const closeDropDown = () => {
    setOpenDropDown(false);
  };

  const openNotif = () => {
    console.log('HERE');
    const { notificationCount, markAsRead } = props;
    console.log(notificationCount, 'COUNT');
    if (notificationCount > 0) {
      console.log('HERE??');
      markAsRead();
    }
    setNotif(!isNotifOpen);
  };
  const closeNotif = () => {
    setNotif(false);
  };
  const {
    userInfo,
    redirectHome,
    notificationCount,
    notifications,
    deleteNotifications,
    redirectProfile,
    addNotificationCount,
    logOut
  } = props;

  return (
    <Menu className="main-menu" borderless fixed="top">
      <Menu.Item>
        <Link className="mainMenu-link" to="/">
          Logo Here
        </Link>
      </Menu.Item>
      <DesktopField to="/hospitals" icon="building outline" text="Hospitals" />
      <DesktopField to="/Contact" icon="headphones" text="Contact us" />
      <Menu.Item position="right">
        {userInfo ? (
          <div>
            <Image
              className="user-menu"
              src={userInfo.img}
              avatar
              style={{ cursor: 'pointer' }}
              onClick={redirectProfile}
              onMouseEnter={openDropDown}
              onMouseLeave={closeDropDown}
            />
            <Dropdown
              icon=""
              id="drop-options"
              pointing="top left"
              open={isDropOpen}
            >
              <Dropdown.Menu>
                <Dropdown.Header>{userInfo.email}</Dropdown.Header>
              </Dropdown.Menu>
            </Dropdown>
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
                    <span id="notification-font"> {notificationCount} </span>
                  </Label>
                ) : null}
              </Icon>
              {userInfo && isNotifOpen ? (
                <Notifications
                  isDesktop={true}
                  deleteNotifications={deleteNotifications}
                  close={closeNotif}
                  openNotif={openNotif}
                  addNotificationCount={addNotificationCount}
                  userId={userInfo.accountID}
                  notifications={notifications}
                />
              ) : null}
            </Icon.Group>
            <Button onClick={logOut} inverted>
              Log out
            </Button>
          </div>
        ) : (
          <div>
            <Button onClick={redirectHome} className="login-button" inverted>
              Log In
            </Button>
            <Button onClick={redirectHome} inverted>
              Sign Up
            </Button>
          </div>
        )}
      </Menu.Item>
    </Menu>
  );
};

export default DesktopMenu;
