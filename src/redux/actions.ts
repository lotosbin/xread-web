export const TOGGLE_THEME = 'TOGGLE_THEME';
export const TOGGLE_LANGUAGE = 'TOGGLE_LANGUAGE';

export const toggleTheme = (theme: any) => ({type: TOGGLE_THEME, payload: theme});
export const toggleLanguage = (language: any) => ({type: TOGGLE_LANGUAGE, payload: language});
