import React from 'react';
import {Route, withRouter} from "react-router-dom";
import styles from "./GuessContainer.module.css"
import List from "@material-ui/core/List";
import GuessPriorityFilter from "../components/GuessPriorityFilter";
import GuessPriorityArticleListContainer from "../components/GuessPriorityArticleListContainer";

const GuessContainer = (props: any) => {
    const {match: {params: {priority = "1"}}} = props;
    console.log(`priority:${priority}`);
    return <div className={styles.container}>
        <div className={styles.left}>
            <List component={"nav"} className={styles.left}>
                <GuessPriorityFilter priority={parseInt(priority)}/>
            </List>
        </div>
        <div className={styles.right}>
            <GuessPriorityArticleListContainer priority={parseInt(priority)}/>
        </div>
    </div>
};
export default withRouter(GuessContainer);
