import React, { Fragment } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

// Config
import config from "../../utils/default";

class DashboardChart extends React.Component {
  constructor(props) {
    super(props);
    this.myInput = React.createRef();
    this.chartWidth = 0;
    this.publicData = [];
    this.privateData = [];
    this.state = {
      options: {
        chart: {
          id: "apexchart-example",
          width: "100%"
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Mei",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ]
        },
      },
      series: []
    };
  }

  componentDidMount() {
    this.setState({ chartWidth: this.myInput.current.offsetWidth });
    this.getPublicData();
  }

  getPublicData = async e => {
    const res = await axios.get(
      `${config.api}/api/shortener/getAllStats/public`
    );
    this.setState({ series: res.data });
  };

  render() {
    return (
      <Fragment>
        <div ref={this.myInput} style={{ width: "100%" }}>
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="bar"
            height={320}
          />
        </div>
      </Fragment>
    );
  }
}

export default DashboardChart;
