export default function Status(props){
  return (
    <div className="status-container">
      <p>Rolls: {props.rolls}</p>
        <p className="time">
        Timer:&nbsp;
        {("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:
        {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}:
        {("0" + ((props.time / 10) % 100)).slice(-2)}
        </p>
    </div>
  )
}