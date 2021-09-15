
const changeActiveCardRightHandler = (state) => {
    if (state.activeCard +1 < state.items.length){
        let newActiveCardNumber = state.activeCard +1;
        let position = (state.activeCard +1)*400;
        let container = document.getElementById('imageContainer');
        container.scroll({
          top: 0,
          left: position,
          behavior: 'smooth'
        });
        return newActiveCardNumber;
      }
      else{
        return state.activeCard;
      }
}

export default changeActiveCardRightHandler;
