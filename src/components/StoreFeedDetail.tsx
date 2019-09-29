import React, {useEffect} from "react";
import {Link} from "react-router-dom";

const StoreFeedDetail = ({data}: { data: any }) => {
    return <div>
        <h1>{data.title}</h1>
        {
            data.articles.edges.map((it: { node: any; }) => it.node).map((article: { title: React.ReactNode; }) => <div>{article.title}</div>)
        }
    </div>
};
export default StoreFeedDetail;
