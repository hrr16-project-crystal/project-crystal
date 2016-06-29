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
      isStacked: 'percent',
      title: 'Relationship Snapshots',
      // titlePosition: 'none',
      chartArea: {
        // backgroundColor: '#eef2f5',
        // left: 0,
        // top: 0,
        // width: '100%',
        // height:'100%',
      },
      legend: {
        position: 'none'
      },
      hAxis: {
        // textPosition: 'none',
      },
      // axisTitlesPosition: 'in',
      vAxis: {
        minValue: 0,
        baselineColor: '#fff',
        gridlines: {
          color: '#ccc',
          count: 0,
        },
        // textPosition: 'none',
      },
      fontSize: 12,
      titleTextStyle: {
        fontSize: 12,
      },
      animation: {
        startup: true, 
        duration: 3000, 
        easing: 'linear'
      },
      series: {
        0: {color: '03c9a9'},
        1: {color: 'ee6e73'},
        2: {color: 'eef2f5'},
      },
    };

    let areaData = [
      ['Month', 'Your Score', 'Partner Score', 'Room To Grow'],
      ['Jan',  20, 80, 50],
      ['Feb',  25, 55, 75],
      ['Mar',  20, 60, 70],
      ['Apr',  40, 100, 10],
      ['May',  50, 80, 30],
      ['Jun',  this.props.health.data.score, 100, 15],
    ];
    let pieOptions = {
      legend: 'none',
      // pieSliceText: 'value',
      title: 'Sparkq Score',
      pieHole: 0.75,
      animation: {
        startup: true, 
        duration: 3000, 
        easing: 'linear'
      },
      pieSliceTextStyle: {
        color: '#03C9A9',
        fontSize: 16,
      },
      tooltip: {
        text: 'percentage'
      },
      slices: {
        0: { 
          color: '#03C9A9' 
        },
        1: { 
          color: '#eef2f5',
          textStyle: { 
            color: 'transparent'
          }
        }
      },
    };

    let pieData = [
      ['Score', 'Percentage'],
      ['Your Score', this.props.health.data.score],
      ['Room To Grow', 100 - this.props.health.data.score],
    ];

    let barOptions = {
      isStacked: 'percent',
      title: 'Personal Scores',
      animation: {
        startup: true, 
        duration: 3000,
        easing: 'linear'
      },
      series: {
        0: {
          color: '#03C9A9', 
          visibleInLegend: false
        },
        1: {
          color: '#eef2f5', 
          visibleInLegend: false
        }
      },
      // bars: 'horizontal', // Required for Material Bar Charts.
      bar: { 
        // groupWidth: "55%" 
      },
      hAxis: {
        baselineColor: '#fff',
        gridlines: {
          color: '#ccc',
          count: 0,
        },
        // textPosition: 'none',
      },
      // axisTitlesPosition: 'in',
      // chartArea:{left:0,top:0,width:'100%',height:'100%'},
      vAxis: {
        // textPosition: 'none',
      },
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
            <Chart chartType = "AreaChart" data = {areaData} options = {areaOptions} width={"100%"} height={"250px"} chartPackages={undefined}/>
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
