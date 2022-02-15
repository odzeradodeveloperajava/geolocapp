export const removeItem = (imageUrl) => {
    return {
        type: 'REMOVE_ITEM',
        payload: { imageUrl },
    };
};
export const clickItem = (imageUrl) => {
    return {
        type: 'CLICK_ITEM',
        payload: { imageUrl },
    };
};
export const fullScreenToggle = (screenType, trueOrFalse) => {
    return {
        type: 'MODAL_FULL_SCREEN_TOGGLE',
        payload: { screenType, trueOrFalse },
    };
};
export const switchActiveCard = (cardNumber) => {
    return {
        type: 'SWITCH_ACTIVE_CARD',
        payload: { cardNumber },
    };
};
export const setBottomGalleryItems = (bottomGalleryItems) => {
    return {
        type: 'SET_BOTTOM_GALLERY_ITEMS',
        payload: { bottomGalleryItems },
    };
};
export const countFilesToProcess = (filesToProcess) => {
    return {
        type: 'FILES_TO_PROCESS',
        payload: {filesToProcess}
    };
};
export const fileProcessedAdder = () => {
    return {
        type: 'FILE_PROCESSED',
    };
};
export const deleteActiveItems = () => {
    return {
        type: 'DELETE_ACTIVE_ITEMS',
    };
};
export const putNamesNoExif = (name) => {
    return {
        type: 'PUT_NAMES_NO_EXIF',
        payload: {name}
    };
};
export const addActiveFile = (file) => {
    return {
        type: 'ADD_ACTIVE_FILE',
        payload: {file}
    };
};
export const setCenterPosition = (lat, lng) => {
    return {
        type: 'SET_CENTER_POSITION',
        payload: {lat, lng}
    };
};
export const setActiveCardNr = (number) => {
    return {
        type: 'SET_ACTIVE_CARD_NR',
        payload: {number}
    };
};
export const resetStateValue = (name, value) => {
    return {
        type: 'RESET_STATE_VALUE',
        payload: {name, value}
    };
};
export const swipeGallery = (leftOrRight) => {
    return {
        type: 'SWIPE_GALLERY',
        payload: {leftOrRight}
    };
};