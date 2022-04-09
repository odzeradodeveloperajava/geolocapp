import store from '../../store';
import { toggleTheme } from '../../actions';


export const themeToggle = () => {
    if(store.getState().activeTheme === 'lightTheme'){
        store.dispatch(toggleTheme('darkTheme'))
    }
    else{
        store.dispatch(toggleTheme('lightTheme'));
    }
}
