import React, { Component } from "react";
import "./SortingVisualizer.css";
import { mergeSort } from "./MergesortAlgorithm.js";
import { BSort } from "./BubbleSortAlgorithm.js";
import { Qsort } from "./QuicksortAlgorithm.js";
import { insertionSort } from "./InsertionSortAlgorithm.js";
import Slider from "react-rangeslider";

// To include the default styles
import "react-rangeslider/lib/index.css";

const SECONDARY_COLOR = "orange";
const PRIMARY_COLOR = "#00FF00";

//const START_TIME = 0;
//const END_TIME = 0;
//const TIME_ELAPSED = 0;

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stop: false,
      array: [],
      sliderValue: 100,
      running: false,
      arrayContainerWidth: 0,
      arrayContainerHeight: 0,
    };
  }

  componentDidMount() {
    this.resetArray();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
    this.setState({
      arrayContainerWidth:
        document.getElementsByClassName("arraycontainer")[0].clientWidth,
      arrayContainerHeight:
        document.getElementsByClassName("arraycontainer")[0].clientHeight,
    });
  };

  resetArray(value) {
    const array = [];
    if (value) {
      for (let i = 0; i < value; i++) {
        array.push(randomNumfromInterval(5, 550));
      }
    } else {
      for (let i = 0; i < this.state.sliderValue; i++) {
        array.push(randomNumfromInterval(5, 550));
      }
    }
    this.setState({ array });
  }

  MergeSort() {
    const animations = mergeSort(this.state.array);
    var temp;
    var temp2;
    const totalTime = animations.length * (500 / this.state.sliderValue);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("arraybar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        temp = setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, (i * 500) / this.state.sliderValue);
      } else {
        temp2 = setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, (i * 500) / this.state.sliderValue);
      }
    }
    setTimeout(() => {
      this.setState({
        running: false,
      });
    }, totalTime);
  }

  QuickSort() {
    const myanimations = Qsort(this.state.array);
    const totalTime = myanimations.length * (500 / this.state.sliderValue);
    for (let i = 0; i < myanimations.length; i++) {
      const arraybars = document.getElementsByClassName("arraybar");
      const colorChange = i % 6 === 0 || i % 6 === 1 ? 0 : 1;
      if (colorChange === 0) {
        const [a, b] = myanimations[i];

        if (a === -1) {
          continue;
        }

        const bar1Style = arraybars[a].style;
        const bar2Style = arraybars[b].style;

        const color = i % 6 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          bar1Style.backgroundColor = color;
          bar2Style.backgroundColor = color;
        }, (i * 500) / this.state.sliderValue);
      } else {
        const [a, b] = myanimations[i];

        if (a === -1) {
          continue;
        } else {
          setTimeout(
            () => {
              const bar1Style = arraybars[a].style;
              bar1Style.height = `${b}px`;
            },

            (i * 500) / this.state.sliderValue
          );
        }
      }
    }
    setTimeout(() => {
      this.setState({
        running: false,
      });
    }, totalTime);
  }

  BubbleSort() {
    const myanimations = BSort(this.state.array);
    const totalTime = myanimations.length * (500 / this.state.sliderValue);
    for (let i = 0; i < myanimations.length; i++) {
      const arraybars = document.getElementsByClassName("arraybar");
      const colorChange = i % 4 === 0 || i % 4 === 1 ? 0 : 1;
      if (colorChange === 0) {
        const [a, b] = myanimations[i];
        const bar1Style = arraybars[a].style;
        const bar2Style = arraybars[b].style;

        const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          bar1Style.backgroundColor = color;
          bar2Style.backgroundColor = color;
        }, (i * 500) / this.state.sliderValue);
      } else {
        const [a, b] = myanimations[i];

        if (a === -1) {
          continue;
        } else {
          setTimeout(
            () => {
              const bar1Style = arraybars[a].style;
              bar1Style.height = `${b}px`;
            },

            (i * 500) / this.state.sliderValue
          );
        }
      }
    }
    setTimeout(() => {
      this.setState({
        running: false,
      });
    }, totalTime);

    //console.log(myanimations);
  }

  InsertionSort() {
    const [animations, sortedArray] = insertionSort(this.state.array);
    const totalTime = animations.length * (500 / this.state.sliderValue);

    for (let i = 0; i < animations.length; i++) {
      const isColorChange =
        animations[i][0] === "comparision1" ||
        animations[i][0] === "comparision2";
      const arrayBars = document.getElementsByClassName("arraybar");
      if (isColorChange === true) {
        const color =
          animations[i][0] === "comparision1" ? SECONDARY_COLOR : PRIMARY_COLOR;
        const [temp, barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, (i * 500) / this.state.sliderValue);
      } else {
        const [temp, barIndex, newHeight] = animations[i];
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, (i * 500) / this.state.sliderValue);
      }
    }
    setTimeout(() => {
      this.setState({
        running: false,
      });
    }, totalTime);
  }

  StopFunc() {
    this.setState({ stop: true });
  }

  handleChangeStart = () => {};

  handleChange = (value) => {
    if (value >= 2 || value <= 99) {
      this.updateDimensions();
      this.setState({
        sliderValue: value,
      });
      this.resetArray(value);
    }
  };

  handleChangeComplete = () => {};

  render() {
    const { array, sliderValue, running } = this.state;

    return (
      <div className="main-container">
        <div className="arraycontainer">
          {array.map((value, idx) => (
            <div
              className="arraybar"
              key={idx}
              style={{
                height: `${value}px`,
                width: `${
                  document.getElementsByClassName("arraycontainer")[0]
                    .clientWidth /
                    sliderValue -
                  3
                }px`,
              }}
            ></div>
          ))}
        </div>
        <section className="footer">
          {/* <div className="slider">
            {console.log("SHOWN value",this.state.sliderValue)}
          </div> */}
          <div class="buttoncontainer">
            {!this.state.running && (
              <Slider
                min={2}
                max={100}
                value={this.state.sliderValue}
                onChangeStart={this.handleChangeStart}
                onChange={this.handleChange}
                onChangeComplete={this.handleChangeComplete}
              />
            )}
            <button
              class="button"
              disabled={this.state.running}
              onClick={() => this.resetArray()}
            >
              Generate new array
            </button>
            <button
              class="button"
              disabled={this.state.running}
              onClick={() => {
                this.setState({ running: true }, () => {
                  this.MergeSort();
                });
              }}
            >
              Merge Sort
            </button>
            <button
              class="button"
              disabled={this.state.running}
              onClick={() => {
                this.setState({ running: true }, () => {
                  this.BubbleSort();
                });
              }}
            >
              Bubble Sort
            </button>
            <button
              class="button"
              disabled={this.state.running}
              onClick={() => {
                this.setState({ running: true }, () => {
                  this.QuickSort();
                });
              }}
            >
              Quick Sort
            </button>
            <button
              class="button"
              disabled={this.state.running}
              onClick={() => {
                this.setState({ running: true }, () => {
                  this.InsertionSort();
                });
              }}
            >
              Insertion Sort
            </button>
            {/* <button
              class="button"
              onClick={() => {
                this.StopFunc();
              }}
            >
              stop
            </button> */}
          </div>
        </section>
      </div>
    );
  }
}

function randomNumfromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
