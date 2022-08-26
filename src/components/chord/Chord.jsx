import React from 'react'
import './chord.scss';

const Chord = ({ chord }) => {
 let numOfstrings = 5;
 let getStrings = chord?.strings
 let getName = chord?.chordName;

 // remove spaces || commas
 let string_position = "";
 if (getStrings) string_position += getStrings.replace(/\s/g, '');
 let chord_name = "";
 if (getName) chord_name += getName.replace(/,/g, '');


 // get the highest string number and add 2 to it
 let stringArray = string_position.split("")
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
      {Array.from(Array(4), (fret, index) => {
       return <div className="fret primary">
        {string_position[idx] == index ?
         <p className={string_position[idx] == 0 ? "open" : "closed"}>
          <span>{string_position[idx]}</span>
         </p> : null}
       </div>
      })}
     </div>
    })}



   </div>
   <h1>{chord_name}</h1>

  </div>

 )
}

export default Chord