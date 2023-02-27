
export const ACTIONS = {
    ADD_DIGIT: "add-digit",
    DELETE_DIGIT: "delete-digit",
    CHOOSE_OPERATION: "choose-operation",
    CLEAR: "clear",
    EVALUATE: "evaluate",
};

//all logic for calculations and display reside here

export function actionReducer(initialState = 0, { type, payload }) {
    switch (type) {
        case ACTIONS.ADD_DIGIT:

            // If the state of the app has been reset after the last calculation
            if (initialState.resetValue) {
                // if the decimal button is pressed
                if (payload.digit === '.') {

                    console.log('The payload digit is a decimal');

                    //the display will show "0.", and reset will be turned off
                    return {...initialState,
                        display: payload.digit = "0.",
                        resetValue: false,

                    }
                }
                //if decimal isn't pressed (but app HAS been reset), display any digit pressed, turn off the reset
                return {
                    ...initialState,
                    display: payload.digit,
                    resetValue: false,
                };
            }

            // if the decimal button is pressed and the display is in an undefined state
            // (ie, when the page reloads or the AC button has been pressed)

            if (payload.digit === "." && initialState.display === undefined) {
                console.log("The initial state display is undefined")

                //return "0." in the display
                return {...initialState,
                    display: "0.",
                }
            }

            if (payload.digit === ".") {
                console.log("This is working")
                if (payload.digit === "." && initialState.display.includes(".")) {
                    return initialState;
                }

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

            //if the display is empty and the previous display is empty, return nothing

            if (initialState.display === null && initialState.previousCalc === null) {
                return initialState;
            }

            //if the display is empty (but the previous calculation is NOT empty)

            if (initialState.display == null) {

                // a) if the operation is a minus (-), the operation is now
                // the initial operation + the payload operation ie a double operation
                if (payload.operation === '-') {
                    return {
                        ...initialState,
                        operation: initialState.operation + payload.operation
                    }
                }

                // b) otherwise override the initial state with whatever the last operation typed was
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
            case "+-":
                computation = prev +- current;
                break;
            case "--":
                computation = prev + current;
                break;
            case "x-":
                computation = prev *- current;
                break;
            case "/-":
                computation = prev /- current;
                break;
            default:
                computation = 0;
        }
        return computation.toString();
    }

}
