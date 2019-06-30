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
      range: {},
      year: 2015
    }
  }

  async componentWillMount() {
    const SERVER_URL='https://9fwwprofzl.execute-api.ap-southeast-2.amazonaws.com/dev'
    const { year } = this.state;

    const emissionData = await Api(`${SERVER_URL}/getEmissions/${year}`, 'GET');
    console.log(emissionData.body);

    const rangeData = await Api(`${SERVER_URL}/getRange/${year}`, 'GET');
    console.log(rangeData.body);

    this.setState({
      data: emissionData.body,
      range: rangeData.body
    })
  }

  calculateEmissions = async (country) => {
    const { data } = this.state;
    const countryData = data.find(entry => entry.entity === country);
    const emissionCount = countryData && countryData.emissions;
    return emissionCount;
  }

  renderHeatmap = async (country) => {
    const { year, range, data} = this.state; 

    const emissionCount = data.length && await this.calculateEmissions(country);
    // console.log(emissionCount);
    

    // var clr = d3.scaleLinear()
    // .range(["green", "red"])
    // .domain([0, 5]);

    // let colourArray = d3.range(5).map(function(d) {
    //   return clr(d)  
    // })

    // const finalColour = colourArray[Math.floor(Math.random()*colourArray.length)];

    // // console.log(`setting country ${country} to ${finalColour}`)
    // return finalColour;


    // const emissionData = data;
    // console.log(emissionData);
  }
  
  updateYear = (event, value) => {
    this.setState({ year: value })
  }

  render() {
      const { classes } = this.props;
      return (
        <div className={classes.root}>
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
                {(geographies, projection) => geographies.map((geography, i) => (
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
                ))}
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
          <SliderComponent onChange={this.updateYear}/>
        </div>
      );
  }
}

export default withStyles(styles)(WorldMap)


