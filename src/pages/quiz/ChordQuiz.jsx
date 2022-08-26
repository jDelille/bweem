import React, { useEffect, useState } from 'react'
import Chord from '../../components/chord/Chord';
import $ from 'jquery';

import './chordQuiz.scss';

const ChordQuiz = () => {

 const [chord, setChord] = useState([])
 const [selected, setSelected] = useState(false)

 useEffect(() => {
  fetch(`https://api.uberchord.com/v1/chords?nameLike=Bb`)
   .then((res) => res.json())
   .then((data) => setChord(data))
   .catch((error) => console.error(error))
 }, [])

 let currentChordName = ''

 let chordNames = [];

 chord.forEach(chord => {
  chordNames.push(chord?.chordName)
 })

 // if a pick (radio button) is checked (yellow background) add to setPick array
 function handleSubmit() {
  let radios = document.querySelectorAll('#radio');
  for (let i = 0; i < radios.length; i++) {
   if (radios[i].checked) {
    setSelected((prevState) => [...prevState, radios[i].value]);
   }
  }
 }

 // set background color for selected teams.
 $(document).ready(function () {
  $('input:radio').change(function () {
   var $this = $(this);
   $this.closest('.game').find('label.highlight').removeClass('highlight');
   $this.closest('.box').addClass('highlight');
   var numItems = $('.highlight').length;
   setSelected(numItems);
  });
 });

 return (
  <div className='page secondary'>
   <h1> Chord Quiz </h1>
   <h1> Guess the correct chord to earn a point</h1>
   <div className="show-chord">
    {chord.map((chord, i) => {
     if (i === 1) {
      currentChordName += (chord?.chordName)
      return <Chord chord={chord} />
     }
    })}
   </div>
   <div className="show-options">
    <label>
     <input
      type='radio'
      name='option'
      id='radio'
      value={chordNames[Math.floor(Math.random() * (chordNames.length - 1 + 1) + 1)]}
      defaultValue={null}
      required
     />
     <h1>{chordNames[Math.floor(Math.random() * (chordNames.length - 1 + 1) + 1)]}</h1>
    </label>

    <option>{currentChordName}</option>
    <option>{chordNames[Math.floor(Math.random() * (chordNames.length - 1 + 1) + 1)]}</option>
    <option>{chordNames[Math.floor(Math.random() * (chordNames.length - 1 + 1) + 1)]}</option>
    <option>{chordNames[Math.floor(Math.random() * (chordNames.length - 1 + 1) + 1)]}</option>
   </div>
   <div className="next">
    <button>Next</button>
   </div>
  </div>
 )
}

export default ChordQuiz