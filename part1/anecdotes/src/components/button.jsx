import { setValue } from "../functions";

const Button = (props) => {
  return (
    <button onClick={() => setValue(props.funct, props.value)}>
      {props.text}
    </button>
  );
};

export default Button;
