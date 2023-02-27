import "./styles.css";
import "./App.css";
import { useReducer } from "react";
import {actionReducer} from "./actionReducer";
import {ACTIONS} from "./actionReducer";
import Digits from "./Digits";
import Operations from "./Operations";
import { connect } from "react-redux";




function App() {
  const [{ display = 0, previousCalc, operation }, dispatch] = useReducer(
    actionReducer,
    {}
  );

    function setOperation(operation) {

        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } });
    }

  function setDigit(digit) {
    //can we use the hook useDispatch here?

    dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } });
  }

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-calc">
          {previousCalc}
          {operation}
        </div>
        <div id="display" className="current-calc">
          {display}
        </div>
      </div>
      <button
        id="clear"
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
        DEL
      </button>
      <Operations id="add" operation="+" setOperation={setOperation} />
      <Digits id="one" digit="1" setDigit={setDigit} />
      <Digits id="two" digit="2" setDigit={setDigit} />
      <Digits id="three" digit="3" setDigit={setDigit} />
      <Operations id="subtract" operation="-" setOperation={setOperation}/>

      <Digits id="four" digit="4" setDigit={setDigit} />
      <Digits id="five" digit="5" setDigit={setDigit} />
      <Digits id="six" digit="6" setDigit={setDigit} />
      <Operations id="multiply" operation="x" setOperation={setOperation} />

      <Digits id="seven" digit="7" setDigit={setDigit} />
      <Digits id="eight" digit="8" setDigit={setDigit} />
      <Digits id="nine" digit="9" setDigit={setDigit} />
      <Operations id="divide" operation="/" setOperation={setOperation} />

      <Digits id="zero" digit="0" setDigit={setDigit} />
      <Digits id="decimal" digit="." setDigit={setDigit} />
      <button
        id="equals"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
        className="span-two"
      >
        =
      </button>
    </div>
  );
}

//is this needed?
const mapStateToProps = (state) => ({
  operation: state.operation,
});

export default connect(mapStateToProps)(App);
