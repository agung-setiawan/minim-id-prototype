import React, { Fragment } from "react";
import axios from "axios";
import TimeAgo from "timeago-react";

// Config
import config from "../../utils/default";

// Style
import "./style.css";

class MiddleInfo extends React.Component {
  constructor(props) {
    super(props);
    this.lastLogin = "";
    this.totalShortenPublic = 0;
    this.totalShortenPrivate = 0;
    this.profile = [];
  }

  componentDidMount() {
    this.getData();
  }

  getData = async e => {
    const res = await axios.get(config.api + "/api/users/getUserStats");
    this.setState({
      lastLogin: res.data.logoutDate,
      totalShortenPublic: res.data.totalPublic,
      totalShortenPrivate: res.data.totalPrivate
    });
  };

  render() {
    return (
      <Fragment>
        <section
          className="shop-features-section"
          style={{ borderBottom: "1px solid #DEE2E6" }}
        >
          <div className="auto-container">
            <div className="row clearfix">
              <div className="feature-block-three col-lg-3 col-md-6 col-sm-12">
                <div className="inner-box">
                  <div className="icon-box">
                    <span className="icon dripicons-home"></span>
                  </div>
                  <h3 style={{ marginBottom: 0 }}>
                    <a href="/dashboard">Dashboard</a>
                  </h3>
                  <div className="text">Selamat Datang</div>
                </div>
              </div>

              <div className="feature-block-three col-lg-3 col-md-6 col-sm-12">
                <div className="inner-box">
                  <div className="icon-box">
                    <span className="icon dripicons-clock"></span>
                  </div>
                  <h3 style={{ marginBottom: 0 }}>
                    <a href="#!">Login Terakhir</a>
                  </h3>
                  <div className="text">
                    <TimeAgo datetime={this.lastLogin} locale="en" />
                  </div>
                </div>
              </div>

              <div className="feature-block-three col-lg-3 col-md-6 col-sm-12">
                <div className="inner-box">
                  <div className="icon-box">
                    <span className="icon dripicons-user-group"></span>
                  </div>
                  <h3 style={{ marginBottom: 0 }}>
                    <a href="#!">Tautan Publik</a>
                  </h3>
                  <div className="text">{this.totalShortenPublic} Tautan</div>
                </div>
              </div>

              <div className="feature-block-three col-lg-3 col-md-6 col-sm-12">
                <div className="inner-box">
                  <div className="icon-box">
                    <span className="icon dripicons-user"></span>
                  </div>
                  <h3 style={{ marginBottom: 0 }}>
                    <a href="#!">Tautan Pribadi</a>
                  </h3>
                  <div className="text">{this.totalShortenPrivate} Tautan</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default MiddleInfo;
