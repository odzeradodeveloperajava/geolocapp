import activeCardScroll from "../activeCardScroll/activeCardScroll";

const activeCardCalculate = (state, e) => {
        let newActiveCardNumber = state.activeCard +e;
        let position = (state.activeCard +e)*400;
        activeCardScroll(position);
        return newActiveCardNumber;
}

const changeActiveCardRightHandler = (state, direction) => {
  if (direction === 'right'){
    if (state.activeCard +1 < state.items.length){
        return activeCardCalculate(state, 1);
      }
     else{
        return state.activeCard;
      }
    }
    else{
      if (state.activeCard > 0){
          return activeCardCalculate(state, -1);
        }
      else {
      return state.activeCard;
    }
  }
}

export default changeActiveCardRightHandler;
