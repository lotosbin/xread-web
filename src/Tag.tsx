import React, {useState} from 'react';
import {Query} from "react-apollo";
import gql from "graphql-tag";
import {Link, Route, withRouter} from "react-router-dom";
import styles from "./Tag.module.css"
import {useQuery} from "react-apollo-hooks";
import TagArticleListContainer from "./components/TagArticleListContainer";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {useTranslation} from "react-i18next";
import Typography from "@material-ui/core/Typography";
import {ButtonBaseProps} from "@material-ui/core/ButtonBase";

const query = gql`{
    tags{
        edges{
            node{
                id
                name
            }
        }
    }
}`;
const Tag = () => {
    const {t, ready} = useTranslation("", {useSuspense: false});
    const [keyword, setKeyword] = useState<string>("");
    let variables = {};
    const {data: {tags}, fetchMore, refetch, loading, error} = useQuery<any>(query, {variables});
    if (loading) return (<Typography component="p">{t('Loading')}...</Typography>);
    if (error) return (<Typography component="p">{t('Error')} !!!</Typography>);
    let list = tags.edges.map((it: { node: any; }) => it.node);
    if (keyword) {
        list = list.filter((it: { name: { toLowerCase: () => { indexOf: (arg0: any) => number; }; }; }) => it.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1)
    }
    // @ts-ignore
    return <div className={styles.container}>
        <div className={styles.left}>
            <TextField
                label={t("Filter")}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                margin="normal"
                variant="outlined"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton aria-label={t("Filter")} onClick={() => setKeyword('')}>
                                <DeleteIcon/>
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <List component={"nav"} className={styles.tag_list}>
                {list.map((it: { name: React.ReactNode; }) => {
                    const SomePathLink = (props: ButtonBaseProps) => <Link to={`/tag/${it.name}`} {...props} />;
                    return <ListItem button className={styles.tag} component={SomePathLink}><ListItemText>{it.name}</ListItemText></ListItem>;
                })}
            </List>
        </div>
        <div className={styles.right}>
            <Route path="/tag/:tag" component={TagArticleListContainer}/>
        </div>
    </div>
};
export default withRouter(Tag);
