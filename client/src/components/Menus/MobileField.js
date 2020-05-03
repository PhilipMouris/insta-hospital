import React from 'react';
import './menus.css';
import { Link } from 'react-router-dom';
import { Menu, Header, Icon, Divider } from 'semantic-ui-react';

const MobileField = ({ to, icon, name, hideSidebar }) => (
  <div>
    <Link onClick={hideSidebar} className="mainMenu-link" to={to}>
      <Menu.Item>
        <Header textAlign="center" icon inverted>
          <Icon name={icon} />
          {name}
        </Header>
      </Menu.Item>
    </Link>
    <Divider fitted />
  </div>
);

export default MobileField;
