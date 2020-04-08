import React, { Component, Fragment, ComponentDidMount } from "react";
import axios from "axios";

// Config
import config from "../../utils/default";

export default class ShareCount extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  componentDidMount() {
    fetch(`${config.api}/api/channel/count/${this.props.ids}`)
      .then(response => {
        return response.json();
      })
      .then(result => {
        this.setState({
          counter: result
        });
      });
  }

  render() {
    return <Fragment>{this.state.counter}</Fragment>;
  }
}
