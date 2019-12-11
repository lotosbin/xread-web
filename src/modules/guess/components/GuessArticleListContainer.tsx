import React from "react";
import {useTranslation} from "react-i18next";
import Typography from "@material-ui/core/Typography";
import styles from "./Guess.module.css";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ReadFilters from "../../../components/ReadFilters";
import ViewModeSwitch from "../../../components/ViewModeSwitch";
import {ArticlePriorityList} from "./ArticlePriorityList";


const GuessArticleListContainer = (props: any) => {
    const {t} = useTranslation("", {useSuspense: false});
    const [expanded, setExpanded] = React.useState<string>('panel1');
    const handleChange = (panel: string) => (event: any, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : "");
    };
    return (
        <div className={styles.container}>
            <div>
                <ReadFilters/><ViewModeSwitch/>
            </div>
            <div className={styles.article_list}>
                <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography>{t("Guess Read")}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={styles.expansion_container}>
                        <ArticlePriorityList  priority={"1"}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography>{t("Guess Spam")}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={styles.expansion_container}>
                        <ArticlePriorityList  priority={"-1"}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography>{t("Guess Normal")}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={styles.expansion_container}>
                        <ArticlePriorityList  priority={"0"}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        </div>
    );
};
export default GuessArticleListContainer;
