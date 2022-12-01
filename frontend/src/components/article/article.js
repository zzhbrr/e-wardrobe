// article
import React from "react";
import "./Article.css";
import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';             // markdown 对表格/删除线/脚注等的支持
import gfm from 'remark-gfm';
import MarkNav from 'markdown-navbar';          // markdown 目录

export default function ArticleDetail(props){
    const [article_detail, set_article_detail] = React.useState({
        eid: -1, 
        title: "Title",
        uid:      0,
        username: "Tom",
        content_src:    "https://www.baidu.com/", 
        time: "2022-12-01"
    })
    const [md, handleMD] = React.useState('loading... ...');

    React.useEffect(() => {
        props.socket.on('getArticleDetailSuccess', (res) => {
            set_article_detail(res);
            console.log(props);
            fetch(res.content_src)
                .then((resp) => resp.text())
                .then((txt) => handleMD(txt));
        })
        props.socket.emit('getArticleDetail', {eid: 1});
    }, [])

    return(
        <div>
            <div className="title">
                <h1>{article_detail.title}</h1>
                <h2>{article_detail.author}</h2>
            </div>
            <div>
                <p>{article_detail.username}</p>
                <p>{article_detail.time}</p>
                <MarkNav source={article_detail.content_src} ordered={true}/>
                {/* <ReactMarkdown src={article_detail.content_src} escapeHtml={false} remarkPlugins={[remarkGfm]}>
                    {md}
                </ReactMarkdown> */}
                <ReactMarkdown remarkPlugins={[remarkGfm]}># *React-Markdown* $now$ supports ~strikethrough~. Thanks to gfm plugin.</ReactMarkdown>
                {/* <iframe src={article_detail.content_src} width="800" height="400" name="content"></iframe> */}
                <p><a href={article_detail.content_src} target="content">{article_detail.content_src}</a></p>
            </div>
        </div>
    )
}