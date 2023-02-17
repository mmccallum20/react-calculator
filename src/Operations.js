export default function Operations({ setOperation, operation }) {
  return <button onClick={() => setOperation(operation)}>{operation}</button>;
}
