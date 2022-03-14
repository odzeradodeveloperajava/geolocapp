import store from '../../store';
import { toggleTheme } from '../../actions';


export const themeToggle = () => {
    if(store.getState().activeTheme === 'lightTheme'){
        console.log('switched to black')
        store.dispatch(toggleTheme('darkTheme'))
    }
    else{
        store.dispatch(toggleTheme('lightTheme'));
        console.log('switched to light')
    }
}
