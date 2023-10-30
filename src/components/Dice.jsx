
import React from "react";

export default function Dice(props) {

  let styles = {}
  if(props.isDarkMode & props.isHeld)
    styles = { backgroundColor: "#59E391"}
  else if(props.isDarkMode & !props.isHeld)
    styles = { backgroundColor: "white" }
  else if(!props.isDarkMode & props.isHeld)
    styles = { backgroundColor: "#59E391"}

    // Return type of dice on given number
    switch(props.value) {
      case 1:
        return (
          <div className="first-face dice" onClick={props.holdDice}  style={styles}>
            <span className="dot"></span>
          </div>
          )
      case 2:
        return (
          <div className="dice second-face" onClick={props.holdDice}  style={styles}>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        )
      case 3:
        return (
          <div className="dice third-face" onClick={props.holdDice}  style={styles}>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        )
      case 4:
        return (
            <div className="fourth-face dice" onClick={props.holdDice}  style={styles}>
              <div className="column">
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
              <div className="column">
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
        )
      case 5:
        return (
          <div className="fifth-face dice" onClick={props.holdDice}  style={styles}>
            <div className="column">
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
            <div className="column">
              <span className="dot"></span>
            </div>
            <div className="column">
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        )
      default:
        return (
          <div className="sixth-face dice" onClick={props.holdDice}  style={styles}>
            <div className="column">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
            <div className="column">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        )
    }
  }