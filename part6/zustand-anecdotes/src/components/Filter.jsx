import { useFilterAction } from "../store";
const Filter = () => {
  const setFilter = useFilterAction();
  const handleChange = (event) => {
    // the value of the input field is in event.target.value
    const filtro = event.target.value;

    setFilter(filtro);
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
