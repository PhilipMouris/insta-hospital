import React, { Component } from "react";
import {
  Modal,
  Header,
  Dimmer,
  Loader,
  Message,
  Icon,
  Grid,
  Transition
} from "semantic-ui-react";
import "../../styling/PartnerProfile.css";
import JobApplicationCard from "./JobApplicationCard";
import { get, put, post } from "../../services/axios";

export default class JobAppsModal extends Component {
  state = {
    jobApplications: [],
    loading: false,
    vacancyId: "",
    error: false,
    actionId: "",
    action: ""
  };
  componentWillReceiveProps(nextProps) {
    const { vacancyId } = this.state;
    if (vacancyId !== nextProps.vacancyId) {
      this.setState({ loading: true, vacancyId: nextProps.vacancyId });
      const url = `jobApplications/VacancyApplications/${nextProps.vacancyId}`;
      get(url)
        .then(jobApplications => {
          this.setState({ loading: false, jobApplications });
        })
        .catch(err => {
          this.setState({ loading: false, error: true });
        });
    }
  }
  handleAction = (jobApplication, state) => {
    const { _id, applicationText } = jobApplication;
    const { jobApplications } = this.state;
    const action = state === "accepted" ? "accept" : "reject";
    this.setState({ actionId: _id, action });
    const { vacancyId, vacancy } = this.props;
    const url = `jobApplications/update/${_id}`;
    const data = {
      applicationText,
      state
    };
    put(url, data)
      .then(() => {
        const jobApp = jobApplications.findIndex(jobApp => jobApp._id === _id);
        jobApplications[jobApp].state = state;
      })
      .then(() => {
        if (state === "accepted") {
          const notifUrl = `subscribers/send`;
          const notif = jobApplication;
          const req = {
            userIds: [notif.member._id],
            data: {
              title: "Job Application Accepted!",
              body: `${
                notif.vacancy.partner.name
              } has accepted your application on ${
                notif.vacancy.title ? notif.vacancy.title : " their vacancy"
              }`,
              link: `/`,
              actionTitle: "Visit",
              img: notif.vacancy.partner.image
            }
          };
          post(notifUrl, req).then(resp => console.log(resp));
          const vacancyUrl = `vacancies/update/${vacancyId}`;
          const { _id, __v, partner, acceptedMember, ...data } = vacancy;
          data.partnerId = partner._id;
          data.state = "taken";
          data.acceptedMemberId = jobApplication.member._id;
          put(vacancyUrl, data).then(() => {
            this.props.setTaken(vacancyId);
            this.setState({ jobApplications, actionId: "", action: "" });
          });
        } else {
          const notifUrl = `subscribers/send`;
          const notif = jobApplication;
          const req = {
            userIds: [notif.member._id],
            data: {
              title: "Job Application Rejected!",
              body: `${
                notif.vacancy.partner.name
              } has rejected your application on ${
                notif.vacancy.title ? notif.vacancy.title : " their vacancy"
              }`,
              link: `/`,
              actionTitle: "Visit",
              img: notif.vacancy.partner.image
            }
          };
          post(notifUrl, req).then(resp => console.log(resp));
          this.setState({ jobApplications, actionId: "", action: "" });
        }
      })
      .catch(error => {
        console.log(error, "ERORR");
        console.log(error.response);
        this.setState({ error: true });
      });
  };

  render() {
    const { open, onClose, vacancyId } = this.props;
    const { loading, jobApplications, error, action, actionId } = this.state;
    return (
      <Modal size="small" open={open} onClose={onClose} closeIcon>
        <Modal.Header as={Header} inverted className="modal-header">
          View Job Applications
        </Modal.Header>
        <Modal.Content style={{ minHeight: "5em" }}>
          {loading ? <Loader id="workaround" size="massive" /> : null}
          <Header textAlign="center">
            <Message
              className="error-message"
              compact
              error
              hidden={!error}
              icon
            >
              <Icon size="mini" name="times circle" />
              Something went wrong !
            </Message>
            <Message
              style={{ marginBottom: "1em" }}
              info
              compact
              hidden={jobApplications.length > 0 || loading}
            >
              No Job Applications found for this vacancy
            </Message>
          </Header>
          <Grid style={{ marginLeft: "0.5em" }} centered columns={2} stackable>
            <Transition.Group duration={400}>
              {jobApplications.map(jobApplication => (
                <Grid.Column key={jobApplication._id}>
                  <JobApplicationCard
                    handleAction={this.handleAction}
                    actionId={actionId}
                    action={action}
                    fromPartner={true}
                    key={jobApplication._id}
                    jobApplication={jobApplication}
                  />
                </Grid.Column>
              ))}
            </Transition.Group>
          </Grid>
        </Modal.Content>
      </Modal>
    );
  }
}
