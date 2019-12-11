import React from "react";
import {useTranslation} from "react-i18next";
import Typography from "@material-ui/core/Typography";
import styles from "./Guess.module.css";
import ReadFilters from "../../../components/ReadFilters";
import ViewModeSwitch from "../../../components/ViewModeSwitch";
import {ArticlePriorityList} from "./ArticlePriorityList";


const GuessPriorityArticleListContainer = (props: any) => {
    const {priority} = props;
    const {t} = useTranslation("", {useSuspense: false});
    let key = "Guess Read";
    if (priority === 0) {
        key = "Guess Normal"
    } else if (priority === -1) {
        key = "Guess Spam"
    }

    return (
        <div className={styles.container}>
            <div className={styles.toolbar}>
                <span>{t(key)}</span><ReadFilters/><ViewModeSwitch/>
            </div>
            <div className={styles.article_list}>
                <ArticlePriorityList priority={priority}/>
            </div>
        </div>
    );
};
export default GuessPriorityArticleListContainer;
