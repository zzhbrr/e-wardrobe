// article
import React from "react";
import "./Article.css";

export default function ArticleDetail(props){
    const [article_detail, set_article_detail] = React.useState({
        eid: -1, 
        title: "Title",
        uid:      0,
        username: "Tom",
        content_src:    "https://www.baidu.com/", 
        time: "2022-12-01"
    })

    React.useEffect(() => {
        props.socket.on('getArticleDetailSuccess', (res) => {
            set_article_detail(res);
            console.log(props);
        })
        props.socket.emit('getArticleDetail', {eid: 0});
    }, [])

    return(
        <div>
            <div className="title">
                <h1>{article_detail.title}</h1>
                <h2>{article_detail.author}</h2>
            </div>
            <div>
                {/* key={article.eid}
                {article.title}
                {article.content_src}
                {article.uid}
                {article.username}
                {article.time} */}
                <p>{article_detail.username}</p>
                <p>{article_detail.time}</p>
                {/* <iframe src={article_detail.content_src} width="800" height="400" name="content"></iframe> */}
                <p><a href={article_detail.content_src} target="content">{article_detail.content_src}</a></p>
            </div>
        </div>
    )
}