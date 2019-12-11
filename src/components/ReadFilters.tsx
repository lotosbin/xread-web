import queryString from "query-string";
import {useTranslation} from "react-i18next";
import React, {Fragment} from "react";
import Button from "@material-ui/core/Button";
import {Link, withRouter} from "react-router-dom";
import {query_set} from "../utils";

const ReadFilters = ({location: {search}}: any) => {
    let {read = "all"} = queryString.parse(search);
    let searchParams = new URLSearchParams(search);
    const {t} = useTranslation("", {useSuspense: false});
    return <Fragment>
        <Button color={read === "all" ? "primary" : "default"} component={props => <Link to={`?${query_set('read', 'all', searchParams)}`} {...props}/>}>{t('All')}</Button>
        <Button color={read === "unread" ? "primary" : "default"} component={props => <Link to={`?${query_set('read', 'unread', searchParams)}`} {...props}/>}>{t('Unread Only')}</Button>
        <Button color={read === "readed" ? "primary" : "default"} component={props => <Link to={`?${query_set('read', 'readed', searchParams)}`} {...props}/>}>{t('Read')}</Button>
    </Fragment>
};
export default withRouter(ReadFilters);
