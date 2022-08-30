import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React from 'react'
import { AiOutlineStar } from 'react-icons/ai'
import { db } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import './chord.scss';

const Chord = ({ chord, hideInfo }) => {
  const { user } = useAuthContext();


  let numOfstrings = 6;
  let getStrings = chord?.strings;
  let getFingering = chord?.fingering;
  let getName = chord?.chordName;

  // remove spaces || commas
  let string_position = "";
  if (getStrings) string_position += getStrings.replace(/\s/g, '');
  let fingering = "";
  if (getFingering) fingering += getFingering.replace(/\s/g, '')
  let chord_name = "";
  if (getName) chord_name += getName.replace(/,/g, '');



  // get the highest string number and add 2 to it
  let stringArray = string_position.split("")
  let maxNum = 0;

  stringArray.forEach(string => {
    if (string === 'X') string = 0;
    if (string > maxNum) maxNum = string;
  })

  // set max number
  let max = parseInt(maxNum)

  // add favorite chord to firestore
  // const addFavorite = async (name) => {
  //   let chord_name = name.replace(/,/g, '');
  //   await updateDoc(userRef, {
  //     favorite_Chords: arrayUnion(chord_name)
  //   })
  // }

  return (
    <div className='diagram'>
      <div className='chord'>
        <div className="fret-labels">
          {Array.from(Array(6), (label, index) => {
            return <div className="label">
              <p>{index}</p>
            </div>
          })}
        </div>
        {Array.from(Array(numOfstrings), (item, idx) => {
          return <div className="string">
            {Array.from(Array(6), (fret, index) => {
              return <div className="fret secondary">
                {string_position[idx] == index ?
                  <p className={string_position[idx] == 0 ? "open" : "closed"}>
                    <span>{fingering[idx]}</span>
                  </p> : null}
              </div>
            })}
          </div>
        })}

      </div>
      {!hideInfo && (
        <div className="chord-info">
          <h2>{chord_name}</h2>
          {/* <AiOutlineStar onClick={() => addFavorite(chord.chordName)} /> */}
        </div>
      )}



    </div>

  )
}

export default Chord