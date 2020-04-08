import React, { Component } from "react";
import axios from "axios";
import Config from "../../utils/default";
import TimeAgo from "timeago-react";

import "./style.css";

export default class FeaturedItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      items: [],
      mainTitle: "Tautan Umum Masih Kosong"
    };
  }

  componentDidMount = async e => {
    const config = {
      headers: {
        "Cache-Control": "no-cache"
      }
    };
    await axios
      .get(
        `${
          Config.api
        }/api/shortener/getPublicShorten?timestamp=${new Date().getTime()}`,
        null,
        config
      )
      .then(res => {
        console.log(res.data.length);
        if (res.data.length > 0) {
          this.setState({
            isLoaded: true,
            items: res.data,
            mainTitle: "Tautan Umum"
          });
        }
      });
  };

  render() {
    if (this.state.isLoaded) {
      return (
        <section className="featured-section">
          <div className="auto-container">
            <div className="sec-title centered">
              <h2>{this.state.mainTitle}</h2>
              <div className="row clearfix" style={{ marginTop: "40px" }}>
                {this.state.items.map(item => (
                  <div
                    key={item._id}
                    className="featured-block col-lg-3 col-md-6 col-sm-12"
                  >
                    <div
                      className="inner-box wow fadeInLeft"
                      data-wow-delay="0ms"
                      data-wow-duration="1500ms"
                    >
                      <div className="image">
                        <a href="blog-single.html">
                          <img
                            src={
                              item.image !== ""
                                ? item.image
                                : "https://dummyimage.com/300x190/aaaaaa/333.jpg"
                            }
                            alt={item.title}
                          />
                        </a>
                      </div>
                      <div className="lower-content">
                        <h3 className="text-left">
                          <a href="blog-single.html">
                            {item.title !== ""
                              ? item.title.substring(0, 30) + "..."
                              : ""}{" "}
                          </a>
                        </h3>
                        <div className="text text-left">{item.summary}</div>
                        <div className="clearfix">
                          <div className="pull-left">
                            <div className="author">
                              Shared :{" "}
                              <TimeAgo datetime={item.date} locale="en" />
                            </div>
                          </div>
                          <div className="pull-right">
                            <div className="price">
                              <a
                                href={item.shorten}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Go To
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      );
    } else {
      return (
        <section className="featured-section">
          <div className="auto-container">
            <div className="sec-title centered">
              <h2>{this.state.mainTitle}</h2>
            </div>
          </div>
        </section>
      );
    }
  }
}
