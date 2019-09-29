import {combineReducers} from 'redux'
import {TOGGLE_THEME, TOGGLE_LANGUAGE} from './actions'
import i18n from "i18next";


const theme = (state = "light", action: { type: any; payload: any; }) => {
    switch (action.type) {
        case TOGGLE_THEME:
            return action.payload;
        default:
            return state
    }
};
const language = (state = "en", action: { type: any; payload: string; }) => {
    switch (action.type) {
        case TOGGLE_LANGUAGE:
            i18n.changeLanguage(action.payload);
            return action.payload;
        default:
            return state
    }
};

const todoApp = combineReducers({
    theme,
    language
});

export default todoApp
