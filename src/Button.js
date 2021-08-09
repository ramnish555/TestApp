
const Button = ({value})=>{
    return (
      <div className="col-sm">
            <button className="btn btn-outline-primary" onClick={()=>{value.btnClick(value.name)}}>{value.name}</button>
      </div>
    );
}
  
export default Button;
  