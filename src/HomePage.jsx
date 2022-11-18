import React ,{useEffect,useState}from "react";
import {useNavigate} from 'react-router-dom'
import './homepage.css';

const FULL_TEXT="Sorting Visualizer| "

export const HomePage = () =>{
    const navigate = useNavigate();
    const [delta, setDelta] = useState(200 - Math.random() * 100);
    const [text, setText] = useState("");
    const [showDescription,setShowDescription]=useState(false)
    useEffect(() => {
      let ticker = setInterval(() => {
        tick();
      }, delta);
  
      return () => {
        clearInterval(ticker);
      };
    }, [text]);

    function tick(){
      let updatedText = FULL_TEXT.substring(0, text.length + 1);
      setText(updatedText);
      if(FULL_TEXT.length===text.length){
        setDelta(300)
        updatedText = FULL_TEXT.substring(0, text.length-2);
        setText(updatedText);
        setShowDescription(true);
      }
    }
    return (
      <div>
        <h1>{text}</h1>
        {
          showDescription&&
        <div className="container">
        <span className="description">
          Sorting Visualizer is a web app for visualizing a bunch of different
          sorting algorithms Like Bubble Sort, Insertion Sort,
          Merge Sort, Quick Sort, with the functionality of Array Size Control.
        </span>

        <button
          className="start-button"
          onClick={() => {
            navigate("/sorting");
          }}
        >
          Start Visualizing
        </button>
        </div>
}
      </div>
    );
}