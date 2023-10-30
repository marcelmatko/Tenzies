export default function Scoreboard(props) {
  return (
    <div className="scoreboard">
      <div className="stats-container">
      <p>Best rolls: &nbsp;
          <span>
          {props.bestRolls}
          </span>
        </p>
        <p>Best time: &nbsp;
          <span>
            {("0" + Math.floor((props.bestTime / 60000) % 60)).slice(-2)}:
            {("0" + Math.floor((props.bestTime / 1000) % 60)).slice(-2)}:
            {("0" + ((props.bestTime / 10) % 100)).slice(-2)}
        </span>
      </p>
      </div>
    </div>
  )
}