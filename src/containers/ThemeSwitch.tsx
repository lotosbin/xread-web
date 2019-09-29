// @flow
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {toggleTheme} from "../redux/actions";
import ThemeSwitch from "../components/ThemeSwitch";

const ThemeSwitchContainer = () => {
    const theme = useSelector((state: any) => state.theme);
    const dispatch = useDispatch();
    return <ThemeSwitch theme={theme} setTheme={(theme: any) => dispatch(toggleTheme(theme))}/>
};
export default ThemeSwitchContainer;
