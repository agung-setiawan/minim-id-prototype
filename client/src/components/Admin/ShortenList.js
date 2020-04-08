import React, { Fragment, useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import TimeAgo from "timeago-react";
import { getMyShorten } from "../../actions/shorten";
import Pagination from "react-js-pagination";

import "./style.css";

const ShortenList = ({
  type,
  getMyShorten,
  shorten: { shorteners, loading }
}) => {
  const [activePage, setActivePage] = useState(15);

  useEffect(() => {
    getMyShorten(type);
  }, [getMyShorten]);

  function handlePageChange(pageNumber) {
    setActivePage(pageNumber);
  }

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div
        className="card-columns shorten-list"
        style={{
          columnCount: 4
        }}
      >
        {shorteners.map(item => (
          <div key={item._id} className="card">
            <img className="card-img-top" src={item.image} alt={item.title} />
            <div className="card-body">
              <h5 className="card-title">
                <a href="#!" data-tip={item.title}>
                  {item.title.substring(0, 20)}...
                </a>
              </h5>
              <p
                className="card-text"
                style={{ height: "75px", overflowY: "hidden" }}
              >
                {item.summary.substring(0, 60)}...
              </p>
            </div>
            <div className="card-footer">
              <p className="card-text">
                <small className="text-muted">
                  <TimeAgo datetime={item.date} locale="en" />
                </small>
              </p>
            </div>
          </div>
        ))}
      </div>
      <ReactTooltip />
      {shorteners.length > 0 ? (
        <div className="pagination-container">
          <Pagination
            activePage={activePage}
            itemsCountPerPage={3}
            totalItemsCount={shorteners.length}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            prevPageText="prev"
            nextPageText="next"
          />
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
};

ShortenList.propTypes = {
  getMyShorten: PropTypes.func.isRequired,
  shorten: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  shorten: state.shorten
});

export default connect(mapStateToProps, { getMyShorten })(ShortenList);
