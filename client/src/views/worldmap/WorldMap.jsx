import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { ComposableMap, ZoomableGroup, Geographies,Geography,
} from "react-simple-maps"
import { scaleLinear } from "d3-scale"
import * as d3 from "d3";

const styles = {
  root: {
    display: 'flex',
    margin: 'auto',
    width: 1000,
    marginTop: '170px'
  }
};

class WorldMap extends Component {
  getRandomColour = (length) => {
    var clr = d3.scaleLinear()
    .range(["white", "black"])
    .domain([0, length]);

    let colourArray = d3.range(length).map(function(d) {
      return clr(d)  
    })

    return colourArray[Math.floor(Math.random()*colourArray.length)];
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
                  console.log(geography.properties.name),
                  <Geography
                    key={ i }
                    geography={ geography }
                    projection={ projection }
                    style={{
                      default: {
                        stroke: '#000',
                        strokeWidth: 0.5,
                        outline: "none",
                        fill: this.getRandomColour(geographies.length)
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
      </div>
      );
  }
}

export default withStyles(styles)(WorldMap)


