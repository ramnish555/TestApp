
const Timestamp = ({time})=>{
    return (
        <div className="col-sm">
            <p>Start:      <b>{time.start}</b></p>
            <p>End:        <b>{time.end}</b></p>
            <p>Start Save: <b>{time.startSave}</b></p>
            <p>End Save:   <b>{time.endSave}</b></p>
        </div>
    );
}
  
export default Timestamp;
  