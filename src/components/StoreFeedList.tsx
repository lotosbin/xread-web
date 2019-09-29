import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import styles from './StoreFeedList.module.css'

const StoreFeedList = ({data, subscribeToNewFeeds}: any) => {
    useEffect(() => subscribeToNewFeeds());
    return data.map((it: { id: string | number | undefined; title: any; link: any; }) => <div className={styles.list_item} key={it.id}><Link to={`/store/feed/${it.id}`}>{it.title || it.link}</Link><span><Link to={`/feed/subscribe?url=${it.link}`}>subscribe</Link></span></div>)
};
export default StoreFeedList;
