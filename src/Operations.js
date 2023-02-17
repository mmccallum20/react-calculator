export default function Operations({ setOperation, operation }) {
  //let operation = "-";

  // next thing to do - choose from the four operations: + - x / s
  return <button onClick={() => setOperation(operation)}>{operation}</button>;
}
