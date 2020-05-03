import React from 'react';
import { Card } from 'semantic-ui-react';
import Highlightable from '../Highlightable';

const RoomCard = ({ roomNumber, roomStatus, searchBar }) => (
  <Card id="card">
    <Card.Content>
      <Card.Header textAlign="center">
        Name:
        <Highlightable
          textToHighlight={roomNumber}
          searchWords={searchBar.split(' ')}
        />
      </Card.Header>
      <Card.Header textAlign="center">
        Status:
        <Highlightable
          textToHighlight={roomStatus}
          searchWords={searchBar.split(' ')}
        />
      </Card.Header>
    </Card.Content>
  </Card>
);

export default RoomCard;
