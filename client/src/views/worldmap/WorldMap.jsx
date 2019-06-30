import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { ComposableMap, ZoomableGroup, Geographies,Geography,
} from "react-simple-maps"
import { scaleLinear } from "d3-scale"

import * as d3 from "d3";

// Import Components
import SliderComponent from '../components/SliderComponent'

// Import Modules
import Api from '../../modules/api';

const styles = {
  root: {
    display: 'flex',
    margin: 'auto',
    width: 1000,
    marginTop: '170px',
    flexDirection: 'column',
  }
};

class WorldMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      year: 2016
    }
  }

  async componentWillMount() {
    const SERVER_URL='https://9fwwprofzl.execute-api.ap-southeast-2.amazonaws.com/dev'
    const { year } = this.state;
    // const emissionData = await Api(`${SERVER_URL}/getEmissions/${year}`, 'GET');
    const rangeData = await Api(`${SERVER_URL}/getRange/${year}`, 'GET');

    await this.getEmissions();
    this.setState({
      // data: emissionData.body,
      range: rangeData.body[0]
    })
  }

  calculateEmissions = (country) => {
    const { data } = this.state;
    const countryData = data.find(entry => entry.entity === country);
    const emissionCount = countryData && countryData.emissions || 0;
    return emissionCount;
  }

  getEmissions = async () => {
    const SERVER_URL='https://9fwwprofzl.execute-api.ap-southeast-2.amazonaws.com/dev'
    const { year, data } = this.state;
    const emissionData = await Api(`${SERVER_URL}/getEmissions/${year}`, 'GET');

    console.log('updating data: ', emissionData.body[0])
    this.setState({ data: emissionData.body })
  }

  renderHeatmap = (country) => {
    const { year, range, data} = this.state; 
    const { max, min } = range;

    const emissionCount = data.length && this.calculateEmissions(country);
    const maxShorten = emissionCount/max * 100;

    const red = 'rgb(255, 0, 0)';
    const yellow = 'rgb(255, 255, 0)';
    const green = 'rgb(0, 255, 0)';
    const grey = 'rgb(66, 66, 66)';

    if(maxShorten < 15) {
        return green
    } else if (maxShorten < 30) {
        return yellow;
    } else if( maxShorten > 30) {
        return red;
    } else {
        return grey;
    }
  }
  
  updateYear = async (event, value) => {
    await this.getEmissions();
    this.setState({ year: value })
  }

  render() {
      const { classes } = this.props;
      const { data, year } = this.state;
      console.log('year: ', year);

      console.log('im gonna re-render');
      return (
        <div className={classes.root}>
          {
            data.length && (
              <ComposableMap
                projectionConfig={{
                  scale: 205,
                  rotation: [-11,0,0],
                }}
                width={980}
                height={551}
                style={{
                  width: "100%",
                  height: "auto",
                }}
              >
              <ZoomableGroup center={[0,20]}>
                <Geographies geography={ "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/examples/choropleth-map/static/world-50m-with-population.json" }>
                  {(geographies, projection) => geographies.map((geography, i) => {
                      console.log('found data');
                      return (
                        <Geography
                            key={ i }
                            geography={ geography }
                            projection={ projection }
                            style={{
                            default: {
                                stroke: '#000',
                                strokeWidth: 0.5,
                                outline: "none",
                                fill: this.renderHeatmap(geography.properties.name)
                            },
                            hover: {
                                fill: "#263238",
                                stroke: "#fff",
                                strokeWidth: 1.5,
                                outline: "none",
                            },
                            pressed: {
                                fill: "#263238",
                                stroke: "#607D8B",
                                strokeWidth: 0.75,
                                outline: "none",
                            }
                            }}
                        />
                      )
                    }
                  )}
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
            )
          }
          
          <SliderComponent onChange={this.updateYear}/>
        </div>
      );
  }
}

export default withStyles(styles)(WorldMap)


