export default function Operations({ setDigit, digit }) {
  return <button onClick={() => setDigit(digit)}>{digit}</button>;
}
