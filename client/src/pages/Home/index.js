import React, { Component, Fragment } from "react";

// Component
import Shorten from "../../components/Shorten";
import PublicShare from "../../components/PublicShare";
import Counter from "../../components/Counter";

export default class Home extends Component {
  render() {
    return (
      <Fragment>
        <Shorten />
        <PublicShare />
        <Counter />
      </Fragment>
    );
  }
}
