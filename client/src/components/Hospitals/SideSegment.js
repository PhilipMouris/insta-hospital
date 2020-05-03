import React, { Component } from 'react';
import './hospitals.css';
import { Segment, Header, Divider, Input, Button } from 'semantic-ui-react';

const SideSegment = ({
  pageTitle,
  pageSubHeader,
  setSearchQuery,
  onSearch
}) => {
  return (
    <Segment compact className="filterSegment">
      <Header size="large">
        {pageTitle}
        <Divider hidden fitted />
        <Header.Subheader>{pageSubHeader}</Header.Subheader>
      </Header>
      <Divider />
      <Input
        onChange={e => setSearchQuery(e.target.value)}
        fluid
        placeholder="Search..."
        icon="search"
      />
      <Divider hidden />
      <Button fluid primary onClick={onSearch}>
        Go
      </Button>
    </Segment>
  );
};

export default SideSegment;
