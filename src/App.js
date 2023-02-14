import "./styles.css";
import "./App.css";
import { useReducer } from "react";
import Digits from "./Digits";
import Operations from "./Operations";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  DELETE_DIGIT: "delete-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.resetValue) {
        return {
          ...state,
          display: payload.digit,
          resetValue: false,
        };
      }

      if (payload.digit === "0" && state.display === "0") {
        return state;
      }

      if (payload.digit === "." && state.display.includes(".")) {
        return state;
      }

      return {
        ...state,
        display: `${state.display || ""}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.display === null && state.previousCalc === null) {
        return state;
      }
      if (state.display == null) {
        return { ...state, operation: payload.operation };
      }
      if (state.previousCalc == null) {
        return {
          ...state,
          operation: payload.operation,
          previousCalc: state.display,
          display: null,
        };
      }
      return {
        ...state,
        previousCalc: calculate(state),
        operation: payload.operation,
        display: null,
      };

    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.display == null ||
        state.previousCalc == null
      ) {
        return state;
      }
      return {
        ...state,
        resetValue: true,
        previousCalc: null,
        operation: null,
        display: calculate(state),
      };
    case ACTIONS.DELETE_DIGIT:
      if (state.resetValue === true) {
        return {
          ...state,
          resetValue: false,
          display: null,
        };
      }

      if (state.display == null) {
        return state;
      }
      if (state.display.length === 1) {
        return {
          ...state,
          display: null,
        };
      }

      return {
        ...state,
        display: state.display.slice(0, -1),
      };

    default:
      return state;
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
    reducer,
    {}
  );

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
      <Operations id="add" operation="+" dispatch={dispatch} />
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

export default App;
