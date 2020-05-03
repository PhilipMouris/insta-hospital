import React, { Component } from "react";
import {
  Header,
  Card,
  Image,
  Label,
  Grid,
  Divider,
  Button,
  Popup
} from "semantic-ui-react";

export default class JobApplicationCard extends Component {
  handleAccept = () => {
    const { jobApplication, handleAction } = this.props;
    handleAction(jobApplication, "accepted");
  };
  handleReject = () => {
    const { jobApplication, handleAction } = this.props;
    handleAction(jobApplication, "rejected");
  };
  handleDelete = () => {
    const { jobApplication } = this.props;
    this.props.handleDelete(jobApplication._id);
  };

  render() {
    const {
      applicationText,
      datePosted,
      member,
      state,
      _id
    } = this.props.jobApplication;
    const { fromPartner, actionId, action, fromMember } = this.props;
    const { name, email } = member;
    const { skills, age } = member.userData;
    const currentLabel =
      !state || state === "pending" ? (
        <Label corner size="mini" icon="clock outline" color="yellow" />
      ) : state === "accepted" ? (
        <Label corner size="mini" icon="check" color="green" />
      ) : (
        <Label corner size="mini" icon="times circle" color="red" />
      );

    console.log(this.props.jobApplication.state, "CARD");
    return (
      <Card color="teal">
        <Card.Content>
          <Grid columns={2}>
            <Grid.Column width={12}>
              <Card.Header
                as={Header}
                className="click no-margin"
                ///CLICK GOES HERE
                sub
              >{`Name: ${name}`}</Card.Header>
              <Card.Header as={Header} className="no-margin" sub color="blue">
                {" "}
                {email}
              </Card.Header>
              <Card.Header as={Header} sub>{`Age: ${age}`}</Card.Header>
              {skills ? (
                <Card.Header>
                  {skills.map(skill => (
                    <Label color="yellow" key={skill}>
                      {skill}
                    </Label>
                  ))}
                </Card.Header>
              ) : null}
              <Divider />
              <Card.Description>{applicationText}</Card.Description>
            </Grid.Column>
            <Grid.Column width={4}>
              <Image
                //ON CLICK GOES HERE
                avatar
                size="massive"
                src="https://via.placeholder.com/150"
              />
            </Grid.Column>
            {fromPartner ? (
              <div>
                <Card.Header id="action-header" size="mini" textAlign="center">
                  <Button
                    loading={actionId === _id && action === "accept"}
                    onClick={this.handleAccept}
                    size="mini"
                    primary
                    basic
                  >
                    Accept
                  </Button>
                  <Button
                    loading={actionId === _id && action === "reject"}
                    onClick={this.handleReject}
                    size="mini"
                    color="red"
                  >
                    Reject{" "}
                  </Button>
                </Card.Header>
              </div>
            ) : null}
            {fromMember && (
              <Card.Header
                style={{ margin: "auto", marginBottom: "0.5em" }}
                size="mini"
                textAlign="center"
              >
                <Button
                  loading={actionId === _id}
                  onClick={this.handleDelete}
                  size="mini"
                  color="red"
                >
                  Delete
                </Button>
              </Card.Header>
            )}
          </Grid>
          <div>
            <Popup
              on="hover"
              position="top right"
              content={state ? state : "Pending"}
              trigger={currentLabel}
            />
          </div>
        </Card.Content>
        <Card.Content extra>{datePosted.toString().slice(0, 10)}</Card.Content>
      </Card>
    );
  }
}
