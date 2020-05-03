import React, { useState, useEffect } from 'react';
import {
  Segment,
  Header,
  Icon,
  Message,
  Input,
  Transition,
  Comment
} from 'semantic-ui-react';
import './hospitalProfile.css';
import FeedBackCard from './FeedBackCard';

const ReviewSegment = ({ deleteReview, editReview, myProfile, reviews }) => {
  const [state, setState] = useState({
    error: false,
    added: {}
  });

  const del = id => deleteReview(id);

  const edit = (id, text, rating) => editReview(id, text, rating);
  const { error } = state;

  return (
    <Segment style={{ marginBottom: '1em' }} id="vacancy-segment" padded>
      <Message className="error-message" compact error hidden={!error} icon>
        <Icon size="mini" name="times circle" />
        Something went wrong !
      </Message>
      <Header as="h1" textAlign="center">
        {myProfile ? 'My Review' : 'Reviews'}
      </Header>
      {reviews ? (
        <div>
          <Header textAlign="center">
            <Message info compact hidden={reviews.length > 0}>
              No Reviews yet
            </Message>
          </Header>
          <Comment.Group>
            <Transition.Group duration={400}>
              {reviews.map(review => (
                <div key={review.id}>
                  <FeedBackCard
                    userId={review.userId}
                    edit={edit}
                    del={del}
                    review={review}
                  />
                </div>
              ))}
            </Transition.Group>
          </Comment.Group>
        </div>
      ) : null}
    </Segment>
  );
};

export default ReviewSegment;
