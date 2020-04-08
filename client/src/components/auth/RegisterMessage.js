import React, { Fragment, Component } from "react";
import { Redirect } from "react-router-dom"

class Confirmation extends Component {
  state = {
    query: this.props.history.location.search.split("?")
  };

  render() {
    if (this.state.query === "" || this.state.query === "undefined") {
      return <Redirect to="/" />;
    }
    return (
      <Fragment>
        <div className="common-message">
          <h1 className="large text-primary">
            Proses Pendaftaran Hampir Selesai
          </h1>
          <p className="confirmation">
            Terima kasih atas partisipasi Anda, proses pendaftaran hampir
            selesai, Kami telah mengirimkan email untuk proses konfirmasi.
            <br />
            Jika Anda tidak menemukan dalam folder Inbox, silahkan cek pada
            folder spam
          </p>
          <p>
            <i className="fa fa-home" /> <a href="/">Beranda</a>
          </p>
        </div>
      </Fragment>
    );
  }
}

export default Confirmation;
