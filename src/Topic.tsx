import React from 'react';
import {Query} from "react-apollo";
import gql from "graphql-tag";
import {Link, Route, withRouter} from "react-router-dom";
import styles from "./Topic.module.css"
import {useQuery} from "react-apollo-hooks";
import TopicArticleListContainer from "./components/TopicArticleListContainer";
import List from "@material-ui/core/List";
import {ListItem} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import {useTranslation} from "react-i18next";
import Typography from "@material-ui/core/Typography";
import {ButtonBaseProps} from "@material-ui/core/ButtonBase";

const query = gql`{
    tags:topics{
        edges{
            node{
                id
                name
            }
        }
    }
}`;
const Topic = () => {
    const {t, ready} = useTranslation("", {useSuspense: false});
    let variables = {};
    const {data: {tags}, fetchMore, refetch, loading, error} = useQuery<any>(query, {variables});
    if (loading) return (<Typography component="p">{t('Loading')}...</Typography>);
    if (error) return (<Typography component="p">{t('Error')} !!!</Typography>);
    const list = tags.edges.map((it: { node: any; }) => it.node);
    // @ts-ignore
    return <div className={styles.container}>
        <List component={"nav"} className={styles.left}>
            {list.map((it: { id: string | number | undefined; name: React.ReactNode; }) => {
                const SomePathLink = (props: ButtonBaseProps) => <Link to={`/topic/${it.name}`} {...props} />;
                return <ListItem key={it.id} button component={SomePathLink} className={styles.tag}><ListItemText>{it.name}</ListItemText></ListItem>;
            })}
        </List>
        <div className={styles.right}>
            <Route path="/topic/:tag" component={TopicArticleListContainer}/>
        </div>
    </div>
};
export default withRouter(Topic);
