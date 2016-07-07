import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import { connect } from 'react-redux';
import * as actions from './meterAction';
import './meter.css';

class Meter extends Component {
  componentWillMount() {
    this.props.getHealth(this.props.user.data.couple_id);
  }

  renderStats() {
    /*
     * SPARK SCORE ALGORITHM
     * ==============================
     * If wanting more points taken off high score differences and less points
     * taken off low score differences, then multiply by more than 0.10 in
     * tenthOfDiff, and multiply that result by more than 3 in tripled. For
     * example, 0.20 multiplied by 8.
     */
    // TODO: deduct points for low category-specific scores
    // one point if below 50 (for each category)?
    // two points if below 25?
    // do we do this for both user and partner, though? take it off for
    // each individual before the average is calculated?
    const userScore = this.props.health.data.score;
    const partnerScore = 60; // change this to whatever the prop is
    const averageScore = Math.ceil((userScore + partnerScore) / 2);
    const diff = Math.max(partnerScore, userScore) - Math.min(partnerScore, userScore);
    const tenthOfDiff = Math.floor(diff * 0.10);
    const tripled = tenthOfDiff * 3;
    const sparkScore = averageScore - tripled;
    
    // /couples/sparkscore/:coupleId/
    
    // Dynamically get past 6 months from current date.
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
      'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    function getMonthName(month) {
      return monthNames[month];
    }

    // Area chart options
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
        duration: 1000,
        easing: 'linear'
      },
      series: {
        0: {color: 'f44336'},
        1: {color: '00bcd4'},
        2: {color: 'eef2f5'},
      },
    };

    // Area chart data
    let areaData = [
      ['Month', 'Your Score', 'Partner Score', 'Room To Grow'],
      [getMonthName(currentMonth - 5),  20, 80, 50],
      [getMonthName(currentMonth - 4),  25, 55, 75],
      [getMonthName(currentMonth - 3),  20, 60, 70],
      [getMonthName(currentMonth - 2),  40, 100, 10],
      [getMonthName(currentMonth - 1),  50, 80, 30],
      [getMonthName(currentMonth),  this.props.health.data.score, 100, 15],
    ];

    // Pie chart options
    let pieOptions = {
      legend: 'none',
      pieSliceText: 'value',
      title: 'Sparkq Score ™',
      pieHole: 0.75,
      animation: {
        startup: true,
        duration: 1000,
        easing: 'linear'
      },
      pieSliceTextStyle: {
        color: '#f44336',
        fontSize: 24,
      },
      tooltip: {
        text: 'percentage'
      },
      slices: {
        0: { 
          color: '#f44336',
          textStyle: {
            color: '#f44336'
          },
        },
        1: { 
          color: '#eef2f5',
          textStyle: { 
            color: 'transparent'
          },
        }
      },
    };

    // Pie chart data
    let pieData = [
      ['Score', 'Percentage'],
      ['Your Score', this.props.health.data.score],
      ['Room To Grow', 100 - this.props.health.data.score],
    ];

    // Bar chart options
    let barOptions = {
      isStacked: 'percent',
      title: 'Personal Scores',
      animation: {
        startup: true,
        duration: 1000,
        easing: 'linear'
      },
      series: {
        0: {
          color: '#f44336', 
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

    // Bar chart data
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
    // TODO: Uncomment personalScore span once we figure out how to position it.
    // Then in pie options, make slice 0 text color trandparent.
    return (
      <div>
        <div className="data">
          <div className="data__header">Relationship Health Meter</div>
          <div className="data_chart data_chart--half data_chart--left valign-wrapper">
            {/*<span className="personalScore valign">{sparkScore}</span>*/}
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
          <div className="center-align quiz-spinner">
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
      <div className="col s12">
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
