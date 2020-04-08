import React, { Component, Fragment } from "react";
import axios from "axios";
import { Player } from "video-react";
import config from "../../utils/default";

// Style
import "./style.css";

// Set Axios config :
axios.defaults.baseURL = config.api;

export default class ShortenOriginal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 10,
      do: false,
      complete: false,
      theURL: "",
      isVerified: false
    };
  }

  start = () => {
    this.id = setInterval(this.initiate, 1000);
  };

  initiate = () => {
    if (this.state.time !== 0) {
      this.setState((prevState, prevProps) => ({
        time: prevState.time - 1
      }));
    } else {
      clearInterval(this.id);
      window.location.href = this.state.theURL;
    }
  };

  componentDidMount = async e => {
    const queryCode = this.props.match.params.key;
    const body = JSON.stringify({ queryCode });

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("/api/shortener/getShortenLink", body, config);

    if (res.data.theData.length > 0) {
      if (res.data.theData[0].url.length > 0) {
        this.setState({
          isVerified: true,
          theURL: res.data.theData[0].url
        });
        this.start();
      }
    }
  };

  render() {
    if (this.state.isVerified) {
      return (
        <Fragment>
          <div className="overlay" />

          <div className="masthead">
            <div
              className="masthead-bg"
              style={{ backgroundColor: "transparent" }}
            ></div>
            <div className="container h-100" style={{ marginTop: 0 }}>
              <div className="row h-100">
                <div className="col-12 my-auto">
                  <div className="masthead-content text-white py-5 py-md-0">
                    <h1 className="mb-3">Coming Soon!</h1>
                    <p className="mb-5">
                      We're working hard to finish the development of this site.
                      Our target launch date is
                      <strong>January 2019</strong>! Sign up for updates using
                      the form below!
                    </p>
                    <div className="input-group input-group-newsletter">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email..."
                        aria-label="Enter email..."
                        aria-describedby="basic-addon"
                      />
                      <div className="input-group-append">
                        <button className="btn btn-secondary" type="button">
                          Notify Me!
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Player muted={true} autoPlay={true} loop={true} playsinline={true}>
            <source src="/assets/images/mp4/bg.mp4" />
          </Player>

          <div className="social-icons">
            <ul className="list-unstyled text-center mb-0">
              <li className="list-unstyled-item">
                <a href="#!">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li className="list-unstyled-item">
                <a href="#!">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li className="list-unstyled-item">
                <a href="#!">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li className="list-unstyled-item counter">
                <a href="#!">{this.state.time}</a>
              </li>
            </ul>
          </div>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <div className="not-found">
            <h1>Page Not Found</h1>
          </div>
        </Fragment>
      );
    }
  }
}
