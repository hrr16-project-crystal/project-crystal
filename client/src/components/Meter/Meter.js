import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import { connect } from 'react-redux';
import * as actions from './meterAction';
import './meter.css';
import _ from 'underscore';

class Meter extends Component {
  constructor(props) {
    super(props);
    this.renderChart=this.renderChart.bind(this);
    this.state = {
      coolChart: '',
      resize: false,
    };
  }

  componentWillMount() {
    this.props.getHealth(this.props.user.data.couple_id);
  }
  componentDidMount() {
    const waitRender = _.debounce(() => this.setState({ resize: true }), 500);
    const that = this;
    !function () {
      $(window).resize(function(){
        waitRender();
      });
    }();
  }

  renderChart() {
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
      // pieSliceText: 'value',
      title: 'Sparkq Score ™',
      pieHole: 0.75,
      animation: {
        startup: true,
        duration: 1000,
        easing: 'linear'
      },
      pieSliceTextStyle: {
        color: '#f44336',
        fontSize: 16,
      },
      tooltip: {
        text: 'percentage'
      },
      slices: {
        0: { 
          color: '#f44336',
          textStyle: {
            color: 'transparent'
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

    return <Chart chartType = "AreaChart" data = {areaData} options = {areaOptions} width={"100%"} height={"250px"} chartPackages={undefined}/>
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
    return (
      <div className="card col s12">
        <div className="card-content">
          <div className="card__header">Relationship Health Meter</div>
          <div className="card col s12 m6 l6">
            <span className="personalScore">{sparkScore}</span>
            <Chart chartType = "PieChart" data = {pieData} options = {pieOptions} width={"100%"} height={"250px"} chartPackages={undefined}/>
          </div>
          <div className="card col s12 m6 l6">
            <Chart chartType = "BarChart" data = {barData} options = {barOptions} width={"100%"} height={"250px"} chartPackages={undefined}/>
          </div>
          <div className="card col s12 m12 l12">
            {this.state.resize===true? <Chart chartType = "AreaChart" data = {areaData} options = {areaOptions} width={"100%"} height={"250px"} chartPackages={undefined}/>:this.renderChart()}
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
