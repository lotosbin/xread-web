import gql from "graphql-tag";
import {fragment_article_list_item} from "../../../components/ArticleListItem";
import {useTranslation} from "react-i18next";
import React from "react";
import {useQuery} from "react-apollo-hooks";
import Typography from "@material-ui/core/Typography";
import QueryContext from "../../../contexts/QueryContext";
import ArticleList from "../../../components/ArticleList";

let query = gql`query articles($cursor: String="",$box:String="all",$read:String="all",$priority:Int,$score:Float) {
    articles(last:10,before: $cursor,box:$box,read:$read,priority:$priority,search:{
        score:$score
    }) {
        pageInfo{
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
        }
        edges{
            cursor
            node{
                ...fragment_article_list_item
            }
        }
    }
}
${fragment_article_list_item}
`;
export const ArticlePriorityList = ({priority = "0"}: any) => {
    let read = "unread";
    let box = "inbox";
    const {t} = useTranslation("", {useSuspense: false});
    const variables = {cursor: null, read: read, priority: parseInt(priority), box: box};
    const {data, fetchMore, refetch, loading, error} = useQuery(query, {variables});
    if (loading) return (<Typography component="p">{t('Loading')}...</Typography>);
    if (error) return (<Typography component="p">{t('Error')} !!!</Typography>);
    let {articles} = (data || {}) || {};

    return <QueryContext.Provider value={{query, variables}}>
        <ArticleList
            refetch={() => refetch()}
            data={articles}
            loadMore={() => fetchMore({
                variables: {
                    cursor: articles.pageInfo.endCursor
                },
                updateQuery: (previousResult, {fetchMoreResult}) => {
                    const newEdges = fetchMoreResult.articles.edges;
                    const pageInfo = fetchMoreResult.articles.pageInfo;

                    return newEdges.length
                        ? {
                            // Put the new comments at the end of the list and update `pageInfo`
                            // so we have the new `endCursor` and `hasNextPage` values
                            articles: {
                                __typename: previousResult.articles.__typename,
                                edges: [...previousResult.articles.edges, ...newEdges],
                                pageInfo
                            }
                        }
                        : previousResult;
                }
            })}
        />
    </QueryContext.Provider>;
};
