import React from 'react'
import './chord.scss';

const Chord = ({ chord }) => {
 let numOfstrings = 5;
 let getStrings = chord?.strings

 // remove spaces
 let strings = "";
 if (getStrings) strings += getStrings.replace(/\s/g, '');

 // get the highest string number and add 2 to it
 let stringArray = strings.split("")
 let maxNum = 0;

 stringArray.forEach(string => {
  if (string === 'X') string = 0;
  if (string > maxNum) maxNum = string;
 })

 let max = parseInt(maxNum)



 return (
  <div className='diagram'>
   <div className='chord'>
    <div className="fret-labels">
     {Array.from(Array(max + 2), (label, index) => {
      return <div className="label">
       <p>{index}</p>
      </div>
     })}
    </div>
    {Array.from(Array(numOfstrings), (item, idx) => {
     return <div className="string">
      {Array.from(Array(max + 2), (fret, index) => {
       return <div className="fret primary">
        {strings[idx] == index ? <p className={strings[idx] == 0 ? "open" : "closed"}>  </p> : null}
       </div>
      })}
     </div>
    })}



   </div>
   <h1>{chord.chordName}</h1>

  </div>

 )
}

export default Chord