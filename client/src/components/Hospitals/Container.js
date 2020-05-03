import React, { Component, useState } from 'react';
import './hospitals.css';
import { Grid, Segment, Message, Icon, Transition } from 'semantic-ui-react';
import SideSegment from './SideSegment.js';
import ProfileCard from './ProfileCard.js';

const Container = ({
  pageTitle,
  pageSubHeader,
  loading,
  redirect,
  data,
  setSearchQuery,
  searchQuery,
  error,
  onSearch,
  setBookedHospital
}) => {
  return (
    <Grid stackable columns={3}>
      <Grid.Column width={3}>
        <SideSegment
          setSearchQuery={setSearchQuery}
          pageTitle={pageTitle}
          pageSubHeader={pageSubHeader}
          onSearch={onSearch}
        />
      </Grid.Column>
      <Grid.Column mobile={3} computer={10} largeScreen={10} tablet={13}>
        <Grid
          stackable
          columns={window.innerWidth <= 1024 ? 2 : 3}
          as={Segment}
        >
          <Message
            compact
            error
            hidden={(data && data.length > 0) || loading}
            icon
          >
            <Icon size="mini" name="search" />
            No results found
          </Message>
          <Transition.Group duration={400}>
            {data &&
              data.map(
                profile =>
                  profile && (
                    <Grid.Column key={profile.accountID}>
                      <ProfileCard
                        redirect={redirect}
                        searchWords={searchQuery.split(' ')}
                        data={profile}
                        setBookedHospital={setBookedHospital}
                      />
                    </Grid.Column>
                  )
              )}
          </Transition.Group>
        </Grid>
      </Grid.Column>
      <Grid.Column only="computer" width={3} />
    </Grid>
  );
};

export default Container;
