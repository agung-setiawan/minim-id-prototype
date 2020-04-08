import React, { Fragment, useEffect, useState } from "react";
import { setAlert } from "../../actions/alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { activation } from "../../actions/auth";

const RegisterActivation = ({ setAlert, activation, isAuthenticated }) => {
  // const refCode = urlCode.substring(urlCode.indexOf("?") + 1);
  const [refCode] = useState(window.location.href.split("/"));

  useEffect(() => {
    activation(refCode[4]);
  }, [activation]);

  return (
    <Fragment>
      <div className="common-message">
        <h1>Aktifasi Pendaftaran</h1>
        <p>
          Mohon menunggu proses aktivasi sedang diproses
          <br />
          <i className="fa fa-cog fa-spin" style={{ fontSize: "24px" }} />
        </p>
      </div>
    </Fragment>
  );
};

RegisterActivation.propTypes = {
  setAlert: PropTypes.func.isRequired,
  activation: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, activation })(
  RegisterActivation
);
