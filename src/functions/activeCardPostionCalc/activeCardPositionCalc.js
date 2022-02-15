import { activeCardScroll } from "../activeCardScrollHandler/activeCardScrollHandler";


export const activeCardCalculate = (state, e) => {
    let newActiveCardNumber = state.activeCard +e;
    let position = (state.activeCard +e)*400;
    activeCardScroll(position);
    return newActiveCardNumber;
}

//e = 1 or -1