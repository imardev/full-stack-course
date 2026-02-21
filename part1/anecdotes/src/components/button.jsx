import { setValue } from "../functions";

const Button = (props) => {
  return (
    <button onClick={() => setValue(props.funct, props.value)}>
      Next anecdote
    </button>
  );
};

export default Button;
