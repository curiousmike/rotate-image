import React from "react";
import Matrix from "./matrix.component";
import "./rotateImageContainer.component.css";

const MIN_DATA_SIZE = 3;
const MAX_DATA_SIZE = 5;
const Directions = {
  left: 1,
  right: 2,
};

let data = [];
class RotateImageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      timerId: 0,
      rotatedData: [],
      dataSize: 3,
      rotationDirection: Directions.left,
    };
  }
  componentDidMount() {
    this.resetData();
  }

  resetData() {
    data = [];
    for (let r = 0; r < this.state.dataSize; r++) {
      data[r] = [];
      for (let c = 0; c < this.state.dataSize; c++) {
        data[r][c] = this.state.dataSize * r + c + 1;
      }
    }

    clearInterval(this.state.timerId);
    this.setState({
      count: 0,
      timerId: 0,
      rotateData: [],
    });
    let cleanData = [];
    for (let n = 0; n < data.length; n++) {
      cleanData[n] = [];
      for (let m = 0; m < data.length; m++) {
        cleanData[n][m] = "";
      }
    }
    this.setState({
      rotatedData: cleanData,
    });

    let intervalTimer = setInterval(() => {
      this.updateRotation();
    }, 1000);

    this.setState({ timerId: intervalTimer });
    if (this.state.dataSize < MAX_DATA_SIZE) {
      this.setState({ dataSize: this.state.dataSize + 1 });
    } else {
      this.setState({ dataSize: MIN_DATA_SIZE });
    }
  }

  updateRotation() {
    if (this.state.count < data.length) {
      this.setState({
        rotatedData: this.applyRotation(
          data,
          this.state.rotationDirection,
          this.state.count
        ),
        count: this.state.count + 1,
      });
    } else {
      clearInterval(this.state.timerId);
      setTimeout(() => this.resetData(), 2000);
    }
  }

  applyRotation(input, direction, curStep) {
    const output = [];
    for (let n = 0; n < input.length; n++) {
      output[n] = [];
      for (let m = 0; m < input[0].length; m++) {
        output[n][m] = "";
      }
    }
    let currentRow = 0;
    let currentCol = input.length - 1;
    while (currentRow < curStep + 1) {
      for (let rowCounter = 0; rowCounter < input.length; rowCounter++) {
        output[currentRow][rowCounter] = input[rowCounter][currentCol];
      }
      currentCol--;
      currentRow++;
    }
    return output;
  }

  render() {
    return (
      <div className="mainContainer">
        <Matrix
          className="outerContainer"
          data={data}
          highlightCol={true}
          highlightRow={false}
          colToHighlight={data.length - this.state.count}
        />
        <Matrix
          className="outerContainer"
          data={this.state.rotatedData}
          highlightRow={true}
          highlightCol={false}
          rowToHighlight={this.state.count - 1}
        />
      </div>
    );
  }
}

export default RotateImageContainer;
