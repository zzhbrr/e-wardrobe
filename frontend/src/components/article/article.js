// article
import React from "react";
import "./article.css";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';             // markdown 对表格/删除线/脚注等的支持
import remarkMath from 'remark-math'
import MarkNav from 'markdown-navbar';          // markdown 目录

export default function ArticleDetail(props){
    const params=useParams();
    const navigate=useNavigate();
    const eid=params.eid;
    const [article_detail, set_article_detail] = React.useState({
        eid: eid, 
        title: "Title",
        uid:      0,
        username: "Tom",
        content_src:    "https://www.baidu.com/", 
        time: "2022-12-01"
    })
    const [md, handleMD] = React.useState('loading... ...');
    const [comment_list, set_comment_list] = React.useState([{
        time: "2022-12-01",
        content: "good good good.",
        uid:      0,
        username: "Tom",
    }])

    React.useEffect(() => {
        props.socket.off('getArticleDetailSuccess');
        props.socket.on('getArticleDetailSuccess', (res) => {
            set_article_detail(res);
            console.log(props);
            fetch(res.content_src)
                .then((resp) => resp.text())
                .then((txt) => handleMD(txt));
        })
        props.socket.emit('getArticleDetail', {eid: eid});
    }, [])
    React.useEffect(() => {
        props.socket.off('getArticleCommentsSuccess');
        props.socket.on('getArticleCommentsSuccess', (res) => {
            set_comment_list(res.comments);
            console.log(res);
        })
        props.socket.emit('getArticleComments', {eid: eid});
    }, [])

    const handleDeleteArticle = () => {
        console.log('删除文章');
        props.socket.emit('deleteArticle', {eid: eid});
        props.socket.off('deleteArticleSuccess');
        props.socket.on('deleteArticleSuccess', (res) => {
            console.log(res);
            navigate('/usercenter');
        })
    }

    
    return(
        <div>
            <div className="Article_head">
                <h1 className="Article_title">{article_detail.title}</h1>
                <h4 className="Article_time">
                    {article_detail.username}&nbsp;编辑于&nbsp;{article_detail.time}&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href={article_detail.content_src} target="content" className="Article_download">下载文章</a>&nbsp;&nbsp;&nbsp;&nbsp;
                    {props.uid === article_detail.uid && <a onClick={handleDeleteArticle}>删除文章</a>}
                </h4>
            </div>
            <div className="Article_body">
                {/* <MarkNav source={article_detail.content_src} ordered={true}/> */}
                <ReactMarkdown escapeHtml={false} remarkPlugins={[remarkGfm]}>
                    {md}
                </ReactMarkdown>
                {/* <ReactMarkdown escapeHtml={false} remarkPlugins={[remarkGfm]}>{article_detail.content_src}</ReactMarkdown> */}
                {/* <iframe src={article_detail.content_src} width="800" height="400" name="content"></iframe> */}
            </div>
            <div>
                <h2>相关评论</h2>
                {comment_list.map((comment)=>{return (
                    <div className="Comment_block" key={comment.eid}>
                        <p className="Comment_username">{comment.username}&nbsp;编辑于&nbsp;{comment.time}</p>
                        <div className="Comment_content">{comment.content}</div>
                    </div>
                )})}
            </div>
        </div>
    )
}