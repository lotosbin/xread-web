import React from 'react';
import {Query, QueryResult} from "react-apollo";
import gql from "graphql-tag";
import {Link, Route, withRouter} from "react-router-dom";
import FeedSubscribeContainer from "./components/FeedSubscribeContainer";
import FeedList from "./components/FeedList";
import styles from './Feed.module.css'
import FeedArticleListContainer from "./components/FeedArticleListContainer";
import {FeedListDataItem} from "./components/FeedList";
import Button from "@material-ui/core/Button";
import {useTranslation} from "react-i18next";
import Typography from "@material-ui/core/Typography";
import ReadFilters from "./components/ReadFilters";
import {ButtonBaseProps} from "@material-ui/core/ButtonBase";

const query = gql`{
    feeds(last:100){
        edges{
            node{
                id
                link
                title
            }
        }
    }
}`;
const subscription = gql`subscription onFeedAdded {
    feedAdded {
        id
        link
        title
    }
}`;

const SomePathLink = (props: ButtonBaseProps) => <Link to="/feed/subscribe" {...props} />;

const Feed = ({history}: { history: any }) => {
    const {t, ready} = useTranslation("", {useSuspense: false});
    // @ts-ignore
    return <div className={styles.container}>
        <div className={styles.left}>
            <Button variant={"outlined"} component={SomePathLink}>{t('subscribe')}</Button>
            <div>
                <Query query={query}>
                    {({loading, error, data: {feeds = {edges: []}} = {}, fetchMore, refetch, subscribeToMore}: QueryResult<any>) => {
                        if (loading) return <Typography component="p">{t('Loading')}...</Typography>;
                        if (error) return <Typography component="p">{t('Error')} !!!</Typography>;
                        const list = (feeds || []).edges.map((it: { node: any; }) => it.node);
                        return <FeedList
                            data={list}
                            subscribeToNewFeeds={() => subscribeToMore({
                                document: subscription,
                                updateQuery: (prev, {subscriptionData}) => {
                                    if (!subscriptionData.data) return prev;
                                    const newFeed = subscriptionData.data.feedAdded;
                                    const newEdge = {cursor: newFeed.id, node: newFeed};
                                    return Object.assign({}, prev, {
                                        feeds: {
                                            edges: [newEdge, ...prev.feeds.edges]
                                        }
                                    });
                                }
                            })}
                            onClick={(item: FeedListDataItem) => history.push(`/feed/${item.id}/article`)}
                        />
                    }}
                </Query>
            </div>
        </div>
        <div className={styles.right}>
            <div>
                <ReadFilters/>
            </div>
            <Route path={`/feed/:feedId/article`} component={FeedArticleListContainer}/>
            <Route path="/feed/subscribe" component={FeedSubscribeContainer}/>
        </div>
    </div>
};
export default withRouter(Feed);
