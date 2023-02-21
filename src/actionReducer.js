
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
            console.log(payload.operation);

            //if the display is empty and the previous display is empty, return nothing

            if (initialState.display === null && initialState.previousCalc === null) {
                console.log('first');
                return initialState;
            }

            //if the display is empty (but the previous calculation is NOT empty)
            //return the initial state but with the operation as payload.operation
            //ie whatever operation you just typed in

            if (initialState.display == null) {
                console.log('second');
                if (payload.operation === '-') {
                    return {
                        ...initialState,
                        operation: initialState.operation + payload.operation
                    }
                }

                return { ...initialState, operation: payload.operation };
            }

            if (initialState.previousCalc == null) {
                console.log('third');

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
