import { activeCardScroll } from "../functions/activeCardScrollHandler/activeCardScrollHandler";

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
    activeTheme: 'lightTheme',
    lightTheme: {
        tiles: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    },
    darkTheme: {
        tiles: `https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=${process.env.REACT_APP_STADIAKEY}`,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    },
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case ('REMOVE_ITEM'):
            return {
                ...state,
               activeItems: [...state.activeItems.filter(item => item.imageUrl !== action.payload.imageUrl)],
               activeCardNr: state.activeCardNr > 0 ? state.activeCardNr -1 : 0
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
                fileProcessed: state.fileProcessed +1
            }
        case ('DELETE_ACTIVE_ITEMS'):
            return {
                ...state,
                activeItems: []
            }
        case ('PUT_NAMES_NO_EXIF'):
            console.log('klik',  action.payload.name)
            return {
                ...state,
                noExifDataFileNames: [...state.noExifDataFileNames, action.payload.name]
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
                activeCardNr: action.payload.number
            }
        case ('RESET_STATE_VALUE'):
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case ('TOGGLE_THEME'):
            return {
                ...state,
                activeTheme: action.payload.theme
            }
        case ('SWIPE_GALLERY'):
            if(action.payload.leftOrRight === 'right'){
                if(state.activeCardNr+1 < state.activeItems.length){
                activeCardScroll((state.activeCardNr+1)*350)
                return {
                    ...state,
                    activeCardNr: state.activeCardNr +1
                }
            }
            else{
                return{
                    ...state
                }
            }
            }
            else{
                if(state.activeCardNr > 0){
                    activeCardScroll((state.activeCardNr-1)*350)
                    return{
                        ...state,
                        activeCardNr: state.activeCardNr -1
                    }
                }
                else{
                    return {
                        ...state
                    }
                }
            }
        default :
           return state;
    }
};

export default rootReducer