import React, { useState } from 'react';
import {
  Header,
  Card,
  Image,
  Label,
  Grid,
  Divider,
  Button,
  Comment,
  TextArea,
  Rating
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ReviewCard = ({ hospitalID, review, ...props }) => {
  const [state, setState] = useState({ edit: false, reviewTextEdit: '' });
  const auth = useSelector(state => state.auth);

  const del = () => {
    const { id } = review;
    props.del(id);
  };
  const editReview = () => {
    const { text, rating } = review;
    setState({
      edit: true,
      reviewTextEdit: text,
      editRating: rating
    });
  };
  const cancel = () => {
    const { text } = review;
    setState({
      editRating: undefined,
      edit: false,
      reviewTextEdit: text
    });
  };
  const save = () => {
    const { reviewTextEdit, editRating } = state;
    const { id } = review;
    setState({ ...state, edit: false });
    props.edit(id, reviewTextEdit, editRating);
  };
  const changeText = e => {
    setState({ ...state, reviewTextEdit: e.target.value });
  };
  const handleRate = (e, { rating }) => {
    setState({ ...state, editRating: rating });
  };

  const redirect = () => {
    const { userId } = review;
    props.history.push(`/user/${userId}`);
  };

  const { createdAt, text, user, rating } = review;
  const { email, img: imageSrc } = user;
  const { edit, reviewTextEdit, editRating } = state;

  return (
    <div id="comment">
      <Comment size="large">
        <Comment.Avatar id="avatar" src={imageSrc} />
        <Comment.Content>
          <Comment.Author as="a">
            <span onClick={redirect}> {email} </span>
            <Rating
              maxRating={5}
              onRate={handleRate}
              disabled={!edit}
              icon="star"
              rating={editRating || rating}
            />
          </Comment.Author>
          <Divider hidden fitted />
          <Comment.Metadata>
            <div>{createdAt.toString().slice(0, 10)}</div>
          </Comment.Metadata>
          <Comment.Text>
            {edit ? (
              <TextArea value={reviewTextEdit} onChange={changeText} />
            ) : (
              text
            )}
          </Comment.Text>
          {user.id === auth.accountID ? (
            <Comment.Actions>
              {edit ? (
                [
                  <Comment.Action key="cance" onClick={cancel}>
                    Cancel
                  </Comment.Action>,
                  <Comment.Action key="Save" onClick={save}>
                    Save
                  </Comment.Action>
                ]
              ) : (
                <Comment.Action onClick={editReview}>Edit</Comment.Action>
              )}
              <Comment.Action onClick={del}>{`Delete`}</Comment.Action>
            </Comment.Actions>
          ) : null}
        </Comment.Content>
      </Comment>
      <Divider />
    </div>
  );
};

export default withRouter(ReviewCard);
