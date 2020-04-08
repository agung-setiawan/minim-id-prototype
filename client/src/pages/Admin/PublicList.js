import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../components/layout/Spinner";
import { getCurrentProfile } from "../../actions/profile";
import { setAlert } from "../../actions/alert";

// Component
import Shorten from "../../components/Admin/Shorten";
import LeftMenu from "../../components/Admin/LeftMenu";
import ShortenList from "../../components/Admin/ShortenList";
import MiddleInfo from "../../components/Admin/MiddleInfo";

import "./style.css";

const PublicList = ({
  getCurrentProfile,
  setAlert,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Shorten />
      <MiddleInfo />

      <section
        className="contact-page-section"
        style={{ padding: "50px 0px 66px" }}
      >
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
              <div className="leftSection">
                <LeftMenu />
              </div>
            </div>
            <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
              <div className="row">
                <ShortenList type="public" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

PublicList.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  setAlert
})(PublicList);
