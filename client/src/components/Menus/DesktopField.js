import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './menus.css';

const DesktopField = ({ to, icon, text }) => (
  <Menu.Item>
    <Link className="mainMenu-link" to={to}>
      <div className="tooltip">
        <Icon size="big" name={icon} />
        <span className="tooltiptext">{text}</span>
      </div>
    </Link>
  </Menu.Item>
);

export default DesktopField;
