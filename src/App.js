import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import React from 'react';
import Confetti from 'react-confetti';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import Dice from './components/Dice';
import Footer from './components/Footer';
import Scoreboard from "./components/Scoreboard";
import Status from "./components/Status";


export default function App() {
  
  // State to hold our array of numbers
  const [dice, setDice] = React.useState(allNewDice())
  
  // State to hold our game state
  const [tenzies, setTenzies] = React.useState(false)

  // States to hold rolls stats
  const [rolls, setRolls] = React.useState(0);
  const [bestRolls, setBestRolls] = React.useState(
    JSON.parse(localStorage.getItem("bestRolls")) || 0
  );
  
  // State to hold our timer
  const [time, setTime] = React.useState(0)
  const [isActive, setIsActive] = React.useState(false)

  // State to hold our best time
  const [bestTime, setBestTime] = React.useState(
    JSON.parse(localStorage.getItem("bestTime")) || 0
  );

  // State for our dark/light mode
  const [isDarkMode, setDarkMode] = React.useState(false);

  // 
  function setRecords() {
    // Check if bestRolls doesn't exist or newest rolls are better than bestRolls if so reassign the variable
    if (!bestRolls || rolls < bestRolls) {
      setBestRolls(rolls);
    }
    
    // Check if bestTime doesn't exist or newest time is lower than bestTime if so reassign the variable
    if (!bestTime || time < bestTime) {
      setBestTime(time);
    }
  }

  //-----DARK/LIGHT MODE----- //

  const handleChange = () => {
    setDarkMode((prevState) => !prevState);
  };

  React.useEffect(() => {
    if (!isDarkMode) {
      document.documentElement.style.setProperty('--bg', 'black');
      document.documentElement.style.setProperty('--color', '#fff');
      document.documentElement.style.setProperty('--dice--color', 'white');
      document.documentElement.style.setProperty('--dice--dot', 'black');
    } else {
      document.documentElement.style.setProperty('--bg', 'white');
      document.documentElement.style.setProperty('--color', '#000');
      document.documentElement.style.setProperty('--dice--color', 'black');
      document.documentElement.style.setProperty('--dice--dot', 'white');
    }
  }, [isDarkMode]);

    // Set bestRolls to localStorage
    React.useEffect(() => {
      localStorage.setItem("bestRolls", JSON.stringify(bestRolls));
    }, [bestRolls]);
  
    // Set bestTime to localStorage
    React.useEffect(() => {
      localStorage.setItem("bestTime", JSON.stringify(bestTime));
    }, [bestTime]);
  
  //-----DIE----- //
  React.useEffect(() => {

  // Check all dice are held
  const allHeld = dice.every(item => item.isHeld)
  const firstValue = dice[0].value
  // Check all dice have same value
  // Check if every die's value has the same one as the first die in dice array
  const allSameValue = dice.every(item => item.value === firstValue)
  if (allHeld && allSameValue) {
      setTenzies(true)
      setIsActive(false)
      setRecords();
  }
  }, [dice])

  //-----TIMER----- //
  React.useEffect(() => {

   let interval; 
   if(isActive){
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive])


  // Flip the `isHeld` property
  function holdDice(id) {
    // Start timer on first dice held
    setIsActive(true)
    // Update dice state
    setDice(oldDice => oldDice.map(item => {
      return item.id === id ? {...item, isHeld: !item.isHeld} : item
    }))
  }

  // Generates a new die
  function generateNewDice() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
}

  // Generates new set of dices
  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6), 
        isHeld: false,
        id: nanoid()
      })
    }
    return newDice
}

  // Increase rolls counter updating previous state
  function updateRolls() {
    return setRolls((oldRolls) => oldRolls + 1);
  }

  // Clicking the button should generate a new array of numbers
  // and set the `dice` state to that new array (thus re-rendering
  // the array to the page)
  function rollDice() {
    if(!tenzies)
    {
      // Update dice state using old one
      setDice(oldDice => oldDice.map(item => {
        return item.isHeld ? item : generateNewDice()
      }))
      updateRolls()
    } else {
      // Reset the game if user won
      setTenzies(false)
      setDice(allNewDice())
      setIsActive(false)
      setTime(0)
      setRolls(0)
    }

}
  // Map over the state numbers array to generate the array
  // of Die elements and render those in the App component
  const dices = dice.map(item => <Dice key={item.id} value={item.value} isHeld={item.isHeld} holdDice={() => holdDice(item.id)}/>)

  return ( 
    <motion.div 
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    >
    <div className="container">
      <main>
      <DarkModeSwitch
            moonColor={"black"}
            sunColor={"white"}
            checked={isDarkMode} onChange={handleChange}
            size={20}
        />
      {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
          <p className="instructions">{tenzies ? "YOU WON!" : "Roll until all dice are the same. Click each dice to freeze it at its current value between rolls."}</p>
          <Scoreboard bestRolls={bestRolls} bestTime={bestTime} />
        <div className='dice--container'>
          {dices}
        </div>
        <Status rolls={rolls} time={time}/>
        <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
        <Footer />
    </main>
    </div>
    </motion.div>
  )
}
