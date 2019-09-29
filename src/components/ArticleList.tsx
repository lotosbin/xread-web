import React, {useContext, useEffect} from "react";
import ArticleListItem from "./ArticleListItem";
import styles from "./ArticleList.module.css"
import Typography from "@material-ui/core/Typography";
import {useTranslation} from "react-i18next";
import {ViewModeContext} from "../contexts";
import ArticleSingleLineListItem from "./ArticleSingleLineListItem";
import ButtonAllMarkSpam from "./ButtonAllMarkSpam";
import ButtonAllMarkRead from "./ButtonAllMarkRead";
import Button from "./Button";

interface TArticleListProps {
    data: any,
    refetch?: (() => {}),
    loadMore?: (() => {}),
    onClickItem?: (() => void),
}


const ArticleList = ({data = {}, loadMore, refetch, onClickItem}: TArticleListProps) => {
    const articles = (data.edges || []).map((it: { node: any; }) => it.node);
    const {hasNextPage = false, hasPreviousPage = true} = data.pageInfo || {};
    // const {edges = [], pageInfo = {}} = articles;
    // useEffect(() => {
    //     const run = async () => {
    //         console.log(`useEffect run:${(edges || []).length},${pageInfo.hasNextPage}`);
    //         console.dir(data);
    //         if (edges.length === 0 && pageInfo.hasNextPage) {
    //             console.log(`useEffect run refetch`);
    //             refetch && refetch();
    //         }
    //     };
    //     // noinspection JSIgnoredPromiseFromCall
    //     run()
    // }, [articles]);
    const {t, ready} = useTranslation("", {useSuspense: false});
    const {mode: viewMode} = useContext(ViewModeContext);
    // @ts-ignore
    return <div className={styles.container}>
        <div className={styles.refetch_container}>
            <Button className={styles.refetch} variant="outlined" onClick={refetch}>{t('Refetch')}</Button>
        </div>
        {articles.map((article: { id: string | number | undefined; }) => {
            switch (viewMode) {
                case "single_line":
                    return <ArticleSingleLineListItem key={article.id} data={article} onClickItem={onClickItem}/>;
                default:
                    return <ArticleListItem key={article.id} data={article} onClickItem={onClickItem}/>;
            }
        })}
        <div className={styles.more_container}>
            <div>
                <ButtonAllMarkSpam ids={articles.map((it: { id: any; }) => it.id)}/>
                <ButtonAllMarkRead ids={articles.map((it: { id: any; }) => it.id)}/>
            </div>
            <div>
                {(!articles.length && !hasNextPage) ? <Typography>{t('Empty')}</Typography> : null}
                {hasNextPage ? <Button className={styles.more} variant="outlined" onClick={loadMore}> {t('More')} </Button> : <Typography>{t('No More Content')}</Typography>}
            </div>
            <div></div>
        </div>
    </div>;
};
export default ArticleList;
