import './App.css';
import Images from './images';
import { useState , useEffect} from 'react';
import { shuffle } from 'lodash';

function App() {
  const [cards, setCards] = useState([...Images, ...Images]);
  const [clicks, setClicks] = useState(0)
  const [activeCards, setActiveCards] = useState([])
  const [foundPairs, setFoundPairs] = useState([])
  const [won, setWon] = useState(false)

  function flipCard(index){
  if (won){
    setCards(shuffle([...Images, ...Images]));
    setFoundPairs([]);
    setActiveCards([]);
    setWon(false);
    setClicks(0);
  }

    if (activeCards.length === 0){
      setActiveCards([index])
    } 
    if (activeCards.length === 1){
      const firstIndex = activeCards[0];
      const secondIndex = index;
      if (cards[firstIndex] === cards[secondIndex]){
        if (foundPairs.length + 2 ===cards.length) {
          setWon(true)
        }
        setFoundPairs([...foundPairs, firstIndex, secondIndex]);
      }
      setActiveCards([...activeCards, index]);
    } if (activeCards.length === 2){

      setActiveCards([index])
    }
    setClicks(clicks + 1)
    
  }
  
 
  return (
    <div>
      <div className="board">
        {cards.map((card, index) => {
          const flippedToFront = (activeCards.indexOf(index) !== -1) || (foundPairs.indexOf(index) !== -1) 
          return (
            <div className={"card-outer " + (flippedToFront? 'flipped': '')} onClick={()=> flipCard(index)}>
              <div className="card">
                <div className="front">
                  <img src={card} alt="" />
                </div>
                <div className="back" />
              </div>
            </div>
          )
        } )}
        
      </div>
      <div className="stats">
        {won && ( <> You won the game! Congratulation! <br/> </>)
        }
        Clicks: {clicks} <br/>
        Found pairs: {foundPairs.length/2}/18
      </div>
    </div>
  );
}



export default App;
