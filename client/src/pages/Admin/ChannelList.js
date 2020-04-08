import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "../../components/layout/Spinner";
import { connect } from "react-redux";
import { getChannelList } from "../../actions/shorten";
import TimeAgo from "timeago-react";

// Component
import Shorten from "../../components/Admin/Shorten";
import LeftMenu from "../../components/Admin/LeftMenu";
import MiddleInfo from "../../components/Admin/MiddleInfo";
import ShareCount from "../../components/Admin/ShareCount";

import "./style.css";

const ChannelList = ({ getChannelList, channel: { channels, loading } }) => {
  useEffect(() => {
    getChannelList();
  }, [getChannelList]);

  return loading ? (
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
              {channels.map(item => (
                <div key={item._id} className="card" style={{ width: "18rem" }}>
                  <div className="card-header">
                    {item.name} (<ShareCount ids={item._id} />)
                  </div>
                  <div className="card-body">
                    <div className="card-text">{item.description}</div>
                  </div>
                  <div className="card-footer text-muted">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <TimeAgo datetime={item.date} locale="en" />
                      </div>
                      <div
                        className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
                        style={{ textAlign: "right" }}
                      >
                        <a href="/create-new-channel">Buat Tautan</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

ChannelList.propTypes = {
  channel: PropTypes.object.isRequired,
  getChannelList: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  channel: state.channel
});

export default connect(mapStateToProps, { getChannelList })(ChannelList);
