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
      sliderValue: 200,
      running:false,
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < this.state.sliderValue; i++) {
      array.push(randomNumfromInterval(5, 550));
    }
    this.setState({ array });
  }

  MergeSort() {
    const animations = mergeSort(this.state.array);
    var temp;
    var temp2;
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
        }, i * 500/this.state.sliderValue);
      } else {
        temp2 = setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * 500/this.state.sliderValue);
      }
      // this.setState({running:false});
    }
  }

  QuickSort() {
    const myanimations = Qsort(this.state.array);
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
        },i * 500/this.state.sliderValue);
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

            i * 500/this.state.sliderValue
          );
        }
      }
    }
  }

  BubbleSort() {
    const myanimations = BSort(this.state.array);
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
        }, i * 500/this.state.sliderValue);
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

            i * 500/this.state.sliderValue
          );
        }
      }
    }

    //console.log(myanimations);
  }

  InsertionSort() {
    const [animations, sortedArray] = insertionSort(this.state.array);

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
        }, i * 500/this.state.sliderValue);
      } else {
        const [temp, barIndex, newHeight] = animations[i];
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * 500/this.state.sliderValue);
      }
    }
  }

  StopFunc() {
    this.setState({ stop: true });
  }

  handleChangeStart = () => {
  
  };

  handleChange = (value) => {
    this.setState({
      sliderValue: value,
    });

    if (value < 200 && value > 0) {
      this.resetArray();
    }
  };

  handleChangeComplete = () => {
  
  };

  render() {
    const { array, sliderValue,running } = this.state;


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
                  document.getElementsByClassName("arraycontainer")[0]
                    .clientWidth /
                    sliderValue /
                    2
                }px`,
              }}
            ></div>
          ))}
        </div>
        <section className="footer">
          <div className="slider">
            {
              !this.state.running&&
              <Slider
                min={0}
                max={200}
                value={sliderValue}
                onChangeStart={this.handleChangeStart}
                onChange={this.handleChange}
                onChangeComplete={this.handleChangeComplete}
              />
            }
          </div>
          <div class="buttoncontainer">
            <button class="button" disabled={this.state.running} onClick={() => this.resetArray()}>
              Generate new array
            </button>
            <button class="button" disabled={this.state.running} onClick={() => {
              // this.setState({ running: true })
              this.MergeSort()
              // this.setState({ running: false })
              }}>
              Merge Sort
            </button>
            <button class="button"  disabled={this.state.running} onClick={() => {
              // this.setState({ running: true })
              this.BubbleSort()
              // this.setState({ running: false })
            }
              
              }>
              Bubble Sort
            </button>
            <button
              class="button"
              disabled={this.state.running}
              onClick={() => {
                // this.setState({ running: true })
                this.QuickSort();
                // this.setState({ running: false })
              }}
            >
              Quick Sort
            </button>
            <button class="button"  disabled={this.state.running} onClick={() => {
              // this.setState({ running: true })
              this.InsertionSort()
              // this.setState({ running: false })
              }}>
              Insertion Sort
            </button>
          </div>
        </section>
      </div>
    );
  }
}

function randomNumfromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
