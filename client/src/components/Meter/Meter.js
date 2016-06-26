import React, { Component } from 'react';
import { Chart } from 'react-google-charts'
import { connect } from 'react-redux';
import * as actions from './meterAction';
import './meter.css';

class Meter extends Component {
  componentWillMount() {
    this.props.getHealth(this.props.user.data.couple_id);
  }

  renderStats() {
    let areaOptions = {
      title: 'Snapshots',
      legend: {position: 'none'},
      vAxis: {minValue: 0, maxValue: 100},
      series: {
        0:{color: '#ee6e73'},
      }
    };

    let areaData = [
      ['Month', 'Score'],
      ['Jan',  20],
      ['Feb',  25],
      ['Mar',  40],
      ['Apr',  55],
      ['May',  75],
      ['Jun',  this.props.health.data.score],
    ];
    let pieOptions = {
      legend: 'none',
      title: 'Total',
      pieHole: 0.80,
      pieSliceTextStyle: {
        color: '#03C9A9',
        fontSize: 36,
      },
      tooltip: {text: 'percentage'},
      slices: {
        0: { color: '#03C9A9' },
        1: { color: '#eef2f5', textStyle: { color: 'transparent' } }
      },
    };

    let pieData = [
      ['Score', 'Percentage'],
      ['Your Score', this.props.health.data.score],
      ['Room To Grow', 100 - this.props.health.data.score],
    ];

    let barOptions = {
      isStacked: 'percent',
      title: 'Categories',
      series: {
        0:{color: '#03C9A9', visibleInLegend: false},
        1:{color: '#eef2f5', visibleInLegend: false}
      },
      bars: 'horizontal', // Required for Material Bar Charts.
      bar: { groupWidth: "85%" }
    };

    let barData = [
      ['Category', 'Your Score', 'Room To Grow'],
      ["Respect", this.props.health.data.respect_score, 100 - this.props.health.data.respect_score],
      ["Communication", this.props.health.data.communication_score, 100 - this.props.health.data.communication_score],
      ["Intimacy", this.props.health.data.intimacy_score, 100 - this.props.health.data.intimacy_score],
      ["Generosity", this.props.health.data.generosity_score, 100 - this.props.health.data.generosity_score],
      ['Spontaneity', this.props.health.data.spontaneity_score, 100 - this.props.health.data.spontaneity_score]
    ];

    // If using material bar chart pass this variable to chartPackages prop
    // Also need to pass "Bar" rather than "BarChart" to chartType prop
    let materialBarPackages = ['bar'];
    
    return (
      <div>
        <div className="data">
          <div className="data__header">Relationship Health Meter</div>
          <div className="data_chart data_chart--half data_chart--left">
            <Chart chartType = "PieChart" data = {pieData} options = {pieOptions} width={"100%"} height={"250px"} chartPackages={undefined}/>
          </div>
          <div className="data_chart data_chart--half">
            <Chart chartType = "BarChart" data = {barData} options = {barOptions} width={"100%"} height={"250px"} chartPackages={undefined}/>
          </div>
          <div className="data_chart data_chart--top">
            <Chart chartType = "AreaChart" data = {areaData} options = {areaOptions} width={"100%"} height={"150px"} chartPackages={undefined}/>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (!this.props.health) {
      return (
        <div>
          <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div><div className="gap-patch">
                <div className="circle"></div>
              </div><div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div>
        {this.renderStats()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    health: state.meter.health,
    user: state.auth.user,
  };
};
export default connect(mapStateToProps, actions)(Meter);
