import React, { Component } from "react";

import TopNav from "../TopNav";
import HeaderSticky from "../HeaderSticky";

const uri = window.location.href.split("/");

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: ""
    };
  }

  componentDidMount() {
    if (uri[3] === "" || uri[3] === "home") {
      this.setState({ header: "" });
    } else {
      this.setState({ header: this.props.headerStyle });
    }
  }

  render() {
    return (
      <header className={`main-header ${this.state.header}`}>
        <div className="header-upper">
          <div className="auto-container">
            <div className="clearfix">
              <div className="pull-left logo-box">
                <div className="logo">
                  <a href="/">
                    <img src="/assets/images/logo-2.png" alt="" title="" />
                  </a>
                </div>
              </div>
              <div className="nav-outer pull-right clearfix">
                <TopNav />
              </div>
            </div>
          </div>
        </div>
        <HeaderSticky />
      </header>
    );
  }
}
