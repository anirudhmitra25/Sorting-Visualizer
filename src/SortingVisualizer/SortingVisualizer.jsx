import React, {Component}from 'react';
import './SortingVisualizer.css';
import {mergeSort} from './MergesortAlgorithm.js';
import {BSort} from './BubbleSortAlgorithm.js';
import {Qsort} from './QuicksortAlgorithm.js';
import {insertionSort} from './InsertionSortAlgorithm.js';
import Slider from 'react-rangeslider'
 
// To include the default styles
import 'react-rangeslider/lib/index.css'

const SECONDARY_COLOR = "orange";
const PRIMARY_COLOR = "aqua";

//const START_TIME = 0;
//const END_TIME = 0;
//const TIME_ELAPSED = 0;


export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            array:[],
            value:200
        };
 
    }

    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        const array = [];
        for(let i=0;i<200;i++){
            array.push(randomNumfromInterval(5,550));
        }
        this.setState({array})
    }

    MergeSort(){
        //const testSortedarray = this.state.array.slice().sort((a,b)=>a-b);
        const myanimations = mergeSort(this.state.array);

        for(let i=0;i<myanimations.length;i++){
            const arraybars = document.getElementsByClassName('arraybar');

            const colorChange = i%3;
            if(colorChange===0){
                const[a,b]=myanimations[i];
                const barOneStyle = arraybars[a].style; 
                const barTwoStyle = arraybars[b].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;

            setTimeout(()=>{
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
            },i*2);

        }
        else{

           setTimeout(()=>{
                const[a,c]=myanimations[i];
                const barOneStyle = arraybars[a].style; 
                barOneStyle.height = `${c}px`;


            },i*2);
            continue;
        }


             
        }

    }

    QuickSort(){

        const myanimations = Qsort(this.state.array);
        for(let i=0;i<myanimations.length;i++){
            const arraybars = document.getElementsByClassName('arraybar');
            const colorChange = i%6===0||i%6===1?0:1;
            if(colorChange===0){

                const[a,b]=myanimations[i];

                if(a===-1){

                    continue;
                }

                const bar1Style = arraybars[a].style;
                const bar2Style = arraybars[b].style;

                const color = i%6===0?SECONDARY_COLOR:PRIMARY_COLOR;
                setTimeout(()=>{

                    
                    bar1Style.backgroundColor=color;
                    bar2Style.backgroundColor=color;
                

                },i*2);
            }
            else{
                const[a,b]=myanimations[i];

                if(a===-1){
                    continue;
                }

                else{
               setTimeout(()=>{


                    const bar1Style = arraybars[a].style;
                    bar1Style.height = `${b}px`;
                    }

                ,i*2);
            }

            }
        }
        


    }

    BubbleSort(){

        const myanimations = BSort(this.state.array);
        for(let i=0;i<myanimations.length;i++){

            
            const arraybars = document.getElementsByClassName('arraybar');
            const colorChange = i%4===0||i%4===1?0:1;
            if(colorChange===0){

                const[a,b]=myanimations[i];
                const bar1Style = arraybars[a].style;
                const bar2Style = arraybars[b].style;

                const color = i%4===0?SECONDARY_COLOR:PRIMARY_COLOR;
                setTimeout(()=>{
                    bar1Style.backgroundColor=color;
                    bar2Style.backgroundColor=color;
                    

                },i*2);
            }
            else{
                const[a,b]=myanimations[i];

                if(a===-1){
                    continue;
                }

                else{
               setTimeout(()=>{


                    const bar1Style = arraybars[a].style;
                    bar1Style.height = `${b}px`;
                    }

                ,i*2);
            }

            }
        }

        //console.log(myanimations);

    }

    SelectionSort(){

    }

    InsertionSort(){

        const [animations,sortedArray] = insertionSort(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            const isColorChange = (animations[i][0] === "comparision1") || (animations[i][0] === "comparision2");
            const arrayBars = document.getElementsByClassName('arraybar');
            if(isColorChange === true) {
                const color = (animations[i][0] === "comparision1") ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [temp, barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },i * 2);
            }
            else {
                const [temp, barIndex, newHeight] = animations[i];
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                },i * 2);  
            }
        }


    }


    render(){
        const {array}=this.state;


        return(
            <div className="arraycontainer">
                {array.map((value,idx) => (
                    <div className="arraybar" key={idx} style={{height: `${value}px`}}>
                        
                    </div>
                ))}
    <div class="buttoncontainer">
    <button class='button' onClick={()=>this.resetArray()}>Generate new array</button>
    <button class='button' onClick={()=>this.MergeSort()}>Merge Sort</button>
    <button class='button' onClick={()=>this.BubbleSort()}>Bubble Sort</button>
    <button class='button' onClick={()=>this.QuickSort()}>Quick Sort</button>
    <button class='button' onClick={()=>this.InsertionSort()}>Insertion Sort</button>
    </div>
    </div>
        );
                }

}
function randomNumfromInterval(min,max){
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
