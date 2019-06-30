import React, { Component } from "react";
import { withStyles } from '@material-ui/styles';
import Slider from "@material-ui/lab/Slider";

const styles = {
  slider: {
    paddingLeft: '25%',
    paddingRight: '25%',
    paddingTop: '20px'
  }
};

class SliderComponent extends Component {
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, value) {
    console.log('slid to value: ', value);
  }

  render() {
    const { classes, onChange, year } = this.props;
    return (
      <div className={classes.slider} >
        <Slider 
          aria-label="Slider" 
          defaultValue={year} 
          max={2016}
          min={1751}
          onChange={onChange}
          valueLabelDisplay="on" />
      </div>
    )
  }
}

export default withStyles(styles)(SliderComponent)

