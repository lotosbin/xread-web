import React from 'react';
import {Query, QueryResult} from "react-apollo";
import gql from "graphql-tag";
import {Link, Route, withRouter} from "react-router-dom";
import styles from "./TopicNav.module.css"
import {useTranslation} from "react-i18next";
import Typography from "@material-ui/core/Typography";

interface ITagConnection<TNode = any> {
    edges: [INode<TNode>]
}

interface INode<TNode = any> {
    node: TNode
}

interface ITag {
    id: string,
    name: string
}

interface IData {
    tags: ITagConnection<ITag>,
}

const TopicNavContainer = () => {
    const {t, ready} = useTranslation("", {useSuspense: false});
    return <div className={styles.container}>
        <Query query={gql`{
    tags:topics{
        edges{
            node{
                id
                name
            }
        }
    }
}`}>
            {({loading, error, data}: QueryResult<IData>) => {
                if (loading) return <Typography component="p">{t('Loading')}...</Typography>;
                if (error) return <Typography component="p">{t('Error')} !!!</Typography>;
                if (!data || !data.tags.edges.length) return <Typography component="p">{t('Empty')} !!!</Typography>;
                const list = data.tags.edges.map((it: { node: any; }) => it.node);
                return list.map(it => <span className={styles.tag}><Link to={`/article/topic/${it.name}`}>{it.name}</Link></span>)
            }}
        </Query>
    </div>
};
export default withRouter(TopicNavContainer);
