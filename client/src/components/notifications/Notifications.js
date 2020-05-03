import React, { Component } from 'react';
import { get, del } from '../../services/axios';
import '../Menus/menus.css';
import {
  Dropdown,
  Icon,
  Divider,
  Item,
  Message,
  Header
} from 'semantic-ui-react';
import NotificationItem from './NotificationItem';

export default class Notifications extends Component {
  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick = e => {
    if (this.node.contains(e.target) || e.target.id === 'notifTarget') {
      return;
    }
    this.props.close();
  };
  render() {
    const { notifications, userId, isDesktop } = this.props;
    console.log(notifications, 'NOTIFICAITO');
    return (
      <div ref={node => (this.node = node)}>
        <Dropdown
          open={true}
          icon=""
          floating
          id="notif-options"
          pointing="top right"
        >
          <Dropdown.Menu id="notif-menu">
            <Dropdown.Header>
              Notifications
              <span onClick={this.props.deleteNotifications} id="mark">
                <Icon
                  style={{ marginTop: '1em' }}
                  size="mini"
                  name="circle thin"
                />
                Delete All
              </span>
              <span style={{ marginRight: '2px' }} id="mark">
                Mute
              </span>
            </Dropdown.Header>
            <Dropdown.Divider />
            {userId && notifications.length === 0 ? (
              <Message style={{ maxWidth: '80%', margin: 'auto' }} info>
                <Header size="tiny" textAlign="center">
                  No notifications received
                </Header>
              </Message>
            ) : null}

            <Dropdown.Item id="no-back">
              <Item.Group divided>
                {notifications.map((notification, index) => {
                  return (
                    <NotificationItem
                      key={index}
                      notification={notification}
                      img={notification.img}
                      isDesktop={isDesktop}
                    />
                  );
                })}
              </Item.Group>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}
