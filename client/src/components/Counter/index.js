import React, { Component } from "react";
import axios from "axios";

// Config
import config from "../../utils/default";

// Set API URL :
axios.defaults.baseURL = config.api;

export default class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shortenTotal: 0,
      shortenPublic: 0,
      shortenPrivate: 0
    };
  }

  componentDidMount() {
    this.getTotalCount();
    this.getPublicCount();
    this.getPrivateCount();
  }

  getTotalCount = () => {
    fetch(`${config.api}/api/shortener/get/counter/total`)
      .then(results => {
        return results.json();
      })
      .then(data => {
        this.setState({ shortenTotal: data });
        console.log(data);
      });
  };

  getPublicCount = type => {
    fetch(`${config.api}/api/shortener/get/counter/PUBLIC`)
      .then(results => {
        return results.json();
      })
      .then(data => {
        this.setState({ shortenPublic: data });
        console.log(data);
      });
  };

  getPrivateCount = type => {
    fetch(`${config.api}/api/shortener/get/counter/PRIVATE`)
      .then(results => {
        return results.json();
      })
      .then(data => {
        this.setState({ shortenPrivate: data });
        console.log(data);
      });
  };

  render() {
    return (
      <section className="counter-section">
        <div className="title-box">
          <div className="auto-container">
            <h2>Total Tautan</h2>
          </div>
        </div>

        <div className="lower-section">
          <div className="auto-container">
            <div className="fact-counter">
              <div className="row clearfix">
                <div className="column counter-column col-lg-4 col-md-6 col-sm-12">
                  <div className="inner">
                    <div className="content">
                      <div className="count-outer count-box">
                        <span
                          className="count-text"
                          data-speed="4000"
                          data-stop="2.455"
                        >
                          {this.state.shortenTotal}
                        </span>
                      </div>
                      <h4 className="counter-title">TOTAL TAUTAN</h4>
                    </div>
                  </div>
                </div>
                <div className="column counter-column col-lg-4 col-md-6 col-sm-12">
                  <div className="inner">
                    <div className="content">
                      <div className="count-outer count-box">
                        <span
                          className="count-text"
                          data-speed="2500"
                          data-stop={this.state.shortenPrivate}
                        >
                          {this.state.shortenPrivate}
                        </span>
                      </div>
                      <h4 className="counter-title">TOTAL TAUTAN PRIVATE</h4>
                    </div>
                  </div>
                </div>
                <div className="column counter-column col-lg-4 col-md-6 col-sm-12">
                  <div className="inner">
                    <div className="content">
                      <div className="count-outer count-box">
                        <span
                          className="count-text"
                          data-speed="4000"
                          data-stop={this.state.shortenPublic}
                        >
                          {this.state.shortenPublic}
                        </span>
                      </div>
                      <h4 className="counter-title">TOTAL TAUTAN PUBLIK</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
