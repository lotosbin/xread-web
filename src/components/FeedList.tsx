import React, {useEffect} from "react";
import styles from './FeedList.module.css'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

export interface FeedListDataItem {
    id: string,
    title: string,
    link: string,
}

type TProps = {
    data: [FeedListDataItem],
    subscribeToNewFeeds: () => void,
    onClick: (arg0: FeedListDataItem) => void
};
const FeedList = ({data, subscribeToNewFeeds, onClick}: TProps) => {
    useEffect(() => subscribeToNewFeeds());
    return <List component="nav">{data.map(it => <ListItem button className={styles.list_item} key={it.id} onClick={() => onClick(it)}><ListItemText primary={it.title}/></ListItem>)}
    </List>
};
export default FeedList;
