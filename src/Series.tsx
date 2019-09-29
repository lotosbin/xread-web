import React from 'react';
import gql from "graphql-tag";
import {Link, Route, withRouter} from "react-router-dom";
import styles from "./Series.module.css"
import {useQuery} from "react-apollo-hooks";
import List from "@material-ui/core/List";
import {ListItem} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import {useTranslation} from "react-i18next";
import Typography from "@material-ui/core/Typography";
import SeriesArticleListContainer from './components/SeriesArticleListContainer'
import {ButtonBaseProps} from "@material-ui/core/ButtonBase";

const query = gql`{
    tags:series{
        edges{
            node{
                id
                name:title
            }
        }
    }
}`;

interface TNode<TNodeData> {
    node: TNodeData
}

interface TSeries {
    id: string,
    name: string
}

interface TData {
    tags: { edges: [TNode<TSeries>] }
}

const Topic = () => {
    const {t, ready} = useTranslation("", {useSuspense: false});
    let variables = {};
    const {data, fetchMore, refetch, loading, error} = useQuery<TData>(query, {variables});
    if (loading) return (<Typography component="p">{t('Loading')}...</Typography>);
    if (error) return (<Typography component="p">{t('Error')} !!!</Typography>);
    if (!data || !data.tags || !data.tags.edges.length) return (<Typography component="p">{t('Error')} !!!</Typography>);
    let {tags} = data;
    const list = tags.edges.map(it => it.node);
    // @ts-ignore
    return <div className={styles.container}>
        <List component={"nav"} className={styles.left}>
            {list.map(it => {
                const SomePathLink = (props: ButtonBaseProps) => <Link to={`/series/${it.name}`} {...props} />;
                return <ListItem key={it.id} button component={SomePathLink} className={styles.tag}><ListItemText>{it.name}</ListItemText></ListItem>;
            })}
        </List>
        <div className={styles.right}>
            <Route path="/series/:tag" component={SeriesArticleListContainer}/>
        </div>
    </div>
};
export default withRouter(Topic);
