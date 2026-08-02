const Button = ({ type, text, handle }) => {
  return (
    <button className={type} onClick={handle}>
      {text}
    </button>
  );
};

export default Button;
