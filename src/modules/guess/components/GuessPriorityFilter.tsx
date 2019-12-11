import queryString from "query-string";
import {useTranslation} from "react-i18next";
import React, {Fragment} from "react";
import Button from "@material-ui/core/Button";
import {Link, withRouter} from "react-router-dom";

interface TPros {
    priority: number
}

const GuessPriorityFilter = ({priority}: TPros) => {
    const {t} = useTranslation("", {useSuspense: false});
    return <Fragment>
        <Button color={priority === 1 ? "primary" : "default"} component={(props) => <Link to={`/guess/priority_1`} {...props}/>}>{t("Guess Read")}</Button>
        <Button color={priority === 0 ? "primary" : "default"} component={(props) => <Link to={`/guess/priority_0`}{...props}/>}>{t('Guess Normal')}</Button>
        <Button color={priority === -1 ? "primary" : "default"} component={(props) => <Link to={`/guess/priority_-1`}{...props}/>}>{t('Guess Spam')}</Button>
    </Fragment>
};
export default GuessPriorityFilter;
