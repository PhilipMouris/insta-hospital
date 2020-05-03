import React, { useState } from 'react';
import {
  Form,
  Modal,
  Message,
  Grid,
  Header,
  Icon,
  Input,
  Button,
  Divider
} from 'semantic-ui-react';
import './Login.css';
import * as Axios from '../../services/axios.js';

const UpdatePassModal = props => {
  const [state, setState] = useState({
    oldPassword: '',
    newPassword: '',
    hidden: true,
    loading: false,
    recovery: '',
    confirmPassword: ''
  });

  const changePassword = e => {
    setState({ ...state, newPassword: e.target.value, hidden: true });
  };
  const changeMail = e => {
    setState({ ...state, oldPassword: e.target.value, hidden: true });
  };
  const changeRecovery = e => {
    setState({ ...state, recovery: e.target.value, hidden: true });
  };
  const changeConfirm = e => {
    setState({ ...state, confirmPassword: e.target.value });
  };

  const resetModal = () => {
    setState({
      oldPassword: '',
      newPassword: '',
      hidden: true,
      error: '',
      loading: false
    });
    props.closeUpdateModal();
  };
  // login = async () => {
  //   if (state.sent) {
  //     sendRecovery();
  //     return;
  //   }
  //   const { loading } = state;
  //   if (loading) return;
  //   setState({ ...state,loading: true });
  //   const {
  //     oldPassword,
  //     newPassword,
  //     confirmPassword,
  //     recoverCorrect
  //   } = state;
  //   if (recoverCorrect) {
  //     if (confirmPassword !== newPassword) {
  //       setState({
  //         loading: false,
  //         hidden: false,
  //         error: "Passwords do not match"
  //       });
  //       return;
  //     } else {
  //       const url = `users/forgotPassword`;
  //       await Axios.post(url, { newPassword, oldPassword });
  //     }
  //   }
  //   const body = { oldPassword, newPassword };
  //   Axios.post("users/login", body)
  //     .then(data => {
  //       this.props.askPerm(decode(data.data.data).id);
  //       localStorage.setItem("jwtToken", data.data.data);
  //       const userInfo = decode(data.data.data);
  //       this.props.setToken();
  //       this.setState({
  //         recoverCorrect: false,
  //         recovery: "",
  //         confirmPassword: "",
  //         loading: false
  //       });
  //       this.resetModal();
  //     })
  //     .catch(error => {
  //       this.setState({
  //         error: error.response.data.error,
  //         hidden: false,
  //         loading: false
  //       });
  //     });
  // };
  const updatePassword = () => {
    let { newPassword, oldPassword, loading } = state;
    if (loading) return;
    setState({ ...state, loading: true });
    const url = `accounts/changePassword/`;
    const body = {
      newPassword,
      oldPassword,
      passwordConfirmation: newPassword
    };
    Axios.put(url, body)
      .then(response => {
        setState({ ...state, open: false, loading: false });
        props.closeUpdateModal();
      })
      .catch(error => {
        setState({
          ...state,
          error: error.message,
          hidden: false,
          loading: false
        });
      });
  };
  // recover = () => {
  //   const { oldPassword, sent } = this.state;
  //   if (oldPassword.length === 0) {
  //     this.setState({
  //       hidden: false,
  //       error: "Please enter a newPassword",
  //       recoverError: false
  //     });
  //     return;
  //   }
  //   const message = sent
  //     ? "A new  oldPassword has been sent"
  //     : "An oldPassword has been sent";
  //   this.setState({ sent: true, error: message, recoverError: false });
  //   const url = `users/sendEmail`;
  //   const data = { oldPassword };
  //   Axios.post(url, data);
  // };
  // sendRecovery = () => {
  //   const { recovery, oldPassword } = this.state;
  //   this.setState({ loading: true });
  //   const url = `users/Recovery`;
  //   const data = { recovery, oldPassword };
  //   Axios.post(url, data)
  //     .then(resp => {
  //       if (resp.data.data > 0)
  //         this.setState({
  //           recoverCorrect: true,
  //           loading: false,
  //           recoverError: false,
  //           sent: false,
  //           hidden: true
  //         });
  //       else
  //         this.setState({
  //           hidden: false,
  //           error: "Incorrect Code",
  //           loading: false,
  //           recoverError: true
  //         });
  //     })
  //     .catch(error => {
  //       this.setState({
  //         loading: false,
  //         hidden: false,
  //         error: "Something went wrong!"
  //       });
  //     });
  // };

  const { open } = props;
  const {
    oldPassword,
    newPassword,
    hidden,
    error,
    loading,
    sent,
    recovery,
    recoverError,
    recoverCorrect,
    confirmPassword
  } = state;
  return (
    <Modal basic onClose={resetModal} open={open}>
      <Grid columns={2} centered>
        <Grid.Column computer={6} mobile={11}>
          <Grid.Row id="header-cont">
            <Header inverted id="header">
              Update Password
            </Header>
          </Grid.Row>
          <Form id="login-form" error onSubmit={updatePassword}>
            {hidden && !sent ? null : (
              <Message
                error={!sent || recoverError}
                positive={sent && !recoverError}
                icon
                size="small"
              >
                <Icon name={sent && !recoverError ? 'send' : 'times circle'} />
                <Message.Content>
                  <Message.Header>{error}</Message.Header>
                  {sent && !recoverError ? 'Please Re-check Your input' : null}
                </Message.Content>
              </Message>
            )}
            <Form.Field
              key="oldPassword"
              className="login-field first-field"
              required
            >
              <label>Old Password</label>
              <Input
                type="password"
                iconPosition="left"
                icon="lock"
                name="password"
                value={oldPassword}
                onChange={changeMail}
              />
            </Form.Field>

            <Form.Field key="newPassword" className="login-field" required>
              <label>New Password</label>
              <Input
                icon="lock"
                iconPosition="left"
                type="password"
                name="password"
                value={newPassword}
                onChange={changePassword}
              />
            </Form.Field>
            <Button fluid loading={loading} type="submit" color="green">
              {sent ? 'Recover' : 'Update Password'}
            </Button>
            <Divider />
            <Button fluid onClick={resetModal} color="red">
              {sent ? 'Recover' : 'Cancel'}
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    </Modal>
  );
};

export default UpdatePassModal;
