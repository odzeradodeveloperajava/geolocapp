const changeActiveCardLeftHandler = (state) => {
    if (state.activeCard > 0){
        let position = (state.activeCard-1)*400;
        let newActiveCardNumber = state.activeCard -1;
        let container = document.getElementById('imageContainer');
        container.scroll({
          top: 0,
          left: position,
          behavior: 'smooth'
        });
        return newActiveCardNumber;
    }
    else {
      return state.activeCard;
    }
}

export default changeActiveCardLeftHandler
