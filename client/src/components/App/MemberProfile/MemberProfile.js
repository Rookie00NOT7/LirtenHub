import React, { Component } from "react";
import axios from "axios";
import Edit from "./Edit/Edit";
import SkyLight from "react-skylight";
import "./MemberProfile.css";
class MemberProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: {
        availability: true,
        skills: [],
        masterClasses: [],
        certificates: [],
        membershipState: "",
        interests: [],
        events: [],
        projects: [],
        tasks: [],
        vacancies: [],
        username: "",
        password: "",
        email: "",
        fname: "",
        lname: "",
        address: "",
        notifications: [],
        reviews: [],
        toggle: 2
      },
      showFeedback: false
    };
  }

  handleChangeEdit = () => {
    this.setState({ toggle: 1 });
  };
  handleChangeProf = () => {
    this.setState({ toggle: 0 });
  };
  getProfile = async () => {
    try {
      let profile = await axios.get(
        "http://localhost:3001/api/profile/5ca0e380b487d0228811cf43",
        { header: { userType: "Member", userId: "5ca0e380b487d0228811cf43" } }
      );
      console.log(profile);
      this.setState({
        userProfile: {
          availability: profile.data.availability,
          skills: profile.data.skills,
          masterClasses: profile.data.masterClasses,
          certificates: profile.data.certificates,
          membershipState: profile.data.membershipState,
          interests: profile.data.interests,
          events: profile.data.events,
          projects: profile.data.projects,
          tasks: profile.data.tasks,
          vacancies: profile.data.vacancies,
          username: profile.data.username,
          password: profile.data.password,
          email: profile.data.email,
          fname: profile.data.fname,
          lname: profile.data.lname,
          address: profile.data.address,
          notifications: profile.data.notifications,
          reviews: profile.data.reviews
        },
        showFeedback: true
      });
    } catch (err) {
      console.log("GOT ERROR" + err);
    }
  };

  render() {
    let func;
    console.log(this.state.userProfile.reviews);
    if (this.state.toggle == 0) {
      func = (
        <div>
          <div className="card profileCard">
            <div className="card-body">
              <ul>
                {"First Name: " + this.state.userProfile.fname}
                <br />
                {"Last Name: " + this.state.userProfile.lname}
                <br />
                {"Email: " + this.state.userProfile.email}
                <br />
                {"Address: " + this.state.userProfile.address}
                <br />
                {"Membership State: " + this.state.userProfile.membershipState}
              </ul>
              <button onClick={this.getProfile} className="btn btn-primary">
                SHOW POFILE
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      if (this.state.toggle == 1) {
        func = <Edit />;
      }
    }
    return (
      <div className="card-group">
        <div className="container-fluid">
          <div className="row">
            <div className="side-bar col-sm-2 ">
              <div className="list-group">
                <h1>MEMBER PROFILE</h1>
                {this.state.showFeedback == false ? (
                  <button
                    onClick={this.handleChangeProf}
                    className="list-group-item list-group-item-action"
                  >
                    SHOW POFILE
                  </button>
                ) : (
                  <div>
                    <button
                      className="list-group-item list-group-item-action"
                      onClick={() => this.simpleDialog.show()}
                    >
                      Show Feedback
                    </button>
                    <SkyLight
                      hideOnOverlayClicked
                      ref={ref => (this.simpleDialog = ref)}
                      title="Feedbacks"
                    >
                      {this.state.userProfile.reviews.map(review => {
                        return (
                          <div className="card eventCard">
                            <div className="card-body">
                              <h5 className="card-title">{review.text}</h5>
                              <span className="card-text"><small className="text-muted">{new Date(review.date).toLocaleDateString()}</small></span>

                            </div>
                          </div>
                        );
                      })}
                    </SkyLight>
                  </div>
                )}
                <button
                  onClick={this.handleChangeEdit}
                  className="list-group-item list-group-item-action"
                >
                  EDIT PROFILE
                </button>
              </div>
            </div>

            {func}
          </div>
        </div>
      </div>
    );
  }
}
export default MemberProfile;
