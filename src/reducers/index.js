const initialState = {
    filesToProcess: 0,
    fileProcessed: 0,
    activeCardNr: 0,
    fullScreen: false,
    loaderScreen: false,
    activeItems:[],
    centerPosition: [],
    bottomGalleryItems: [],
    noExifDataFileNames: [],
    
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case ('REMOVE_ITEM'):
            return {
                ...state,
               activeItems: [...state.activeItems.filter(item => item.imageUrl !== action.payload.imageUrl)],
            };
        case ('CLICK_ITEM'):
            return {
                ...state,
                activeItems: [...state.bottomGalleryItems.filter(item => item.imageUrl === action.payload.imageUrl)],
            };
        case ('MODAL_FULL_SCREEN_TOGGLE'):
            return {
                ...state,
                [action.payload.screenType]: action.payload.trueOrFalse
            }
        case ('SET_BOTTOM_GALLERY_ITEMS'):
            return {
                ...state,
                bottomGalleryItems: [...action.payload.bottomGalleryItems]
            }
        case ('FILES_TO_PROCESS'):
            return {
                ...state,
                filesToProcess: action.payload.filesToProcess
            }
        case ('FILE_PROCESSED'):
            return {
                ...state,
                fileProcessed: [state.fileProcessed +1]
            }
        case ('DELETE_ACTIVE_ITEMS'):
            return {
                ...state,
                activeItems: []
            }
        case ('PUT_NAMES_NO_EXIF'):
            return {
                ...state,
                noExifDataFileNames: [...state.noExifDataFileNames, action.payload]
            }
        case ('ADD_ACTIVE_FILE'):
            return {
                ...state,
                activeItems: [...state.activeItems, action.payload.file]
            }
        case ('SET_CENTER_POSITION'):
            return {
                ...state,
                centerPosition: [action.payload.lat, action.payload.lng]
            }
        case ('SET_ACTIVE_CARD_NR'):
            return {
                ...state,
                activeCardNr: [action.payload.number]
            }
        case ('RESET_STATE_VALUE'):
            return {
                ...state,
                [action.payload.name]: [action.payload.value]
            }
            default :
                return state;
    }
};

export default rootReducer