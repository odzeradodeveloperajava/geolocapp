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
        console.log('tak ustawil handler przerwacania kart', activeCardCalculate(state, 1))
        return activeCardCalculate(state, 1);
      }
     else{
      console.log('tak ustawil handler przerwacania kart', state.activeCard)
        return state.activeCard;
      }
    }
    else{
      if (state.activeCard > 0){
        console.log('tak ustawil handler przerwacania kart', activeCardCalculate(state, -1))
          return activeCardCalculate(state, -1);
        }
      else {
        console.log('tak ustawil handler przerwacania kart', state.activeCard)
      return state.activeCard;
    }
  }
}

export default changeActiveCardRightHandler;
