// article
import React from "react";
import "./Article.css";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';             // markdown 对表格/删除线/脚注等的支持
import remarkMath from 'remark-math'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Input from '@mui/material/Input';
const ariaLabel = { 'aria-label': 'description' };

export default function ArticleDetail(props){
    const params=useParams();
    const eid=params.eid;
    const uid=params.uid;
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
        props.socket.on('getArticleCommentsSuccess', (res) => {
            set_comment_list(res.comments);
            console.log(res);
        })
        props.socket.emit('getArticleComments', {eid: eid});
    }, [])
    React.useEffect((data) => {
        console.log('add comment')
        props.socket.emit('addCommentToArticle', {
            uid: 0,
            eid: eid,
            content: data
        });
        props.socket.on('addCommentToArticleSuccess', (res) => {
            set_comment_list(res.comments);
            console.log(res);
        })
    }, [])

    
    return(
        <div>
            <div className="Article_head">
                <h1 className="Article_title">{article_detail.title}</h1>
                <h4 className="Article_time">
                    {article_detail.username}&nbsp;编辑于&nbsp;{article_detail.time}&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href={article_detail.content_src} target="content" className="Article_download">下载文章</a>
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
                {/* <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className="addComment_block"> */}
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className="addComment_block">
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-with-sx" placeholder="添加评论" inputProps={ariaLabel} className="addComment_TextField"/>
                </Box>
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