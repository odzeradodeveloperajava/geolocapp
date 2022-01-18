const activeCardScroll = (position) => {
    let container = document.getElementById('imageContainer');
    container.scroll({
      top: 0,
      left: position,
      behavior: 'smooth'
    });
    return null
}

const activeCardCalculate = (state, e) => {
    let newActiveCardNumber = state.activeCard +e;
    let position = (state.activeCard +e)*400;
    activeCardScroll(position);
    return newActiveCardNumber;
}


function liftingUpStateHandler(type, e, state){
    switch(type){
        case 'imageClickHandler':
            let array = state.bottomGalleryItems;
            let index = array.findIndex((object) => object.cardId === e);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return  ['items', [state.bottomGalleryItems[index]]]
        case 'loaderScreenHandler':
            return ['loader', e]
        case 'modalCloseHandler':
            return ['noexifdatafilenames', []]
        case 'markerFlyerTo':
            let marketLat = e.latlng.lat;
            let marketLon = e.latlng.lon;
            let markerArray = state.items;
            let markerIndex = markerArray.findIndex((object, object1) => object.lat === marketLat & object1.lon === marketLon);
            let position = markerIndex * 400;
            const indexx = markerIndex < 0 ? 0 : markerIndex;
            activeCardScroll(position)
            return ['activeCard', indexx];
        case 'fullScreenOpenHandler':
            return ['fullScreen', true]
        case 'fullScreenCloseHandler':
            return ['fullScreen', false]
        case 'changeActiveCardHandler':
            if (e === 'right'){
                if (state.activeCard +1 < state.items.length){
                    return ['activeCard', activeCardCalculate(state, 1)]
                  }
                 else{
                    return ['activeCard', state.activeCard]
                  }
                }
                else{
                  if (state.activeCard > 0){
                      return ['activeCard', activeCardCalculate(state, -1)]
                    }
                  else {
                  return ['activeCard', state.activeCard]
                }
              }
        case 'countFilesToProcess':
            return ['processing', state.processing + e]
        case 'countFilesProcessed':
            return ['processed', state.processed + 1]
        case 'deleteItem':
            const deleteItemArray = state.items;
            const deleteItemIndex = deleteItemArray.findIndex((object) => object.cardId === e);
            deleteItemArray.splice(deleteItemIndex, 1);
            activeCardScroll(e)
            return ['items', deleteItemArray, 'activeCard', 0];
        case 'setNoExifData':
            return['noexifdatafilenames', e, true]
        case 'newItemHandler':
            return['items', e, true]
        case 'centerPosition':
            return['centerPosition', [e.lat.toFixed(3), e.lon.toFixed(3)]]
        case 'activeCard':
            return['activeCard', 0]
        case 'deleteItems':
            return['items', []]
        default:
            return null;
    }
}
export default liftingUpStateHandler;