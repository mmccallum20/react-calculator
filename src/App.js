import "./styles.css";
import "./App.css";
import { useReducer } from "react";
import Digits from "./Digits";
import Operations from "./Operations";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  DELETE_DIGIT: "delete-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  EVALUATE: "evaluate",
};

export function actionReducer(initialState = 0, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (initialState.resetValue) {
        return {
          ...initialState,
          display: payload.digit,
          resetValue: false,
        };
      }

      if (payload.digit === "0" && initialState.display === "0") {
        return initialState;
      }

      if (payload.digit === "." && initialState.display.includes(".")) {
        return initialState;
      }

      return {
        ...initialState,
        display: `${initialState.display || ""}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (initialState.display === null && initialState.previousCalc === null) {
        return initialState;
      }
      if (initialState.display == null) {
        return { ...initialState, operation: payload.operation };
      }
      if (initialState.previousCalc == null) {
        return {
          ...initialState,
          operation: payload.operation,
          previousCalc: initialState.display,
          display: null,
        };
      }
      return {
        ...initialState,
        previousCalc: calculate(initialState),
        operation: payload.operation,
        display: null,
      };

    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.EVALUATE:
      if (
        initialState.operation == null ||
        initialState.display == null ||
        initialState.previousCalc == null
      ) {
        return initialState;
      }
      return {
        ...initialState,
        resetValue: true,
        previousCalc: null,
        operation: null,
        display: calculate(initialState),
      };
    case ACTIONS.DELETE_DIGIT:
      if (initialState.resetValue === true) {
        return {
          ...initialState,
          resetValue: false,
          display: null,
        };
      }

      if (initialState.display == null) {
        return initialState;
      }
      if (initialState.display.length === 1) {
        return {
          ...initialState,
          display: null,
        };
      }

      return {
        ...initialState,
        display: initialState.display.slice(0, -1),
      };

    default:
      return initialState;
  }
}

function calculate({ display, previousCalc, operation }) {
  const prev = parseFloat(previousCalc);
  const current = parseFloat(display);

  if (isNaN(prev) || isNaN(current)) {
    return "";
  }

  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "x":
      computation = prev * current;
      break;
    case "/":
      computation = prev / current;
      break;
  }
  return computation.toString();
}

function App() {
  const [{ display = 0, previousCalc, operation }, dispatch] = useReducer(
    actionReducer,
    {}
  );

  function setOperation(operation) {
    dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } });
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
      <Digits id="one" digit="1" dispatch={dispatch} />
      <Digits id="two" digit="2" dispatch={dispatch} />
      <Digits id="three" digit="3" dispatch={dispatch} />
      <Operations id="subtract" operation="-" dispatch={dispatch} />

      <Digits id="four" digit="4" dispatch={dispatch} />
      <Digits id="five" digit="5" dispatch={dispatch} />
      <Digits id="six" digit="6" dispatch={dispatch} />
      <Operations id="multiply" operation="x" dispatch={dispatch} />

      <Digits id="seven" digit="7" dispatch={dispatch} />
      <Digits id="eight" digit="8" dispatch={dispatch} />
      <Digits id="nine" digit="9" dispatch={dispatch} />
      <Operations id="divide" operation="/" dispatch={dispatch} />

      <Digits id="zero" digit="0" dispatch={dispatch} />
      <Digits id="decimal" digit="." dispatch={dispatch} />
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

const mapStateToProps = (state) => ({
  operation: state.operation,
});

export default connect(mapStateToProps)(App);
