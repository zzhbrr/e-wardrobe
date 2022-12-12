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
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
const ariaLabel = { 'aria-label': 'description' };

export default function ArticleDetail(props){
    const params=useParams();
    const navigate=useNavigate();
    const eid=params.eid;
    const uid=params.uid;
    const [new_comment, set_new_comment] = React.useState("");
    const [article_detail, set_article_detail] = React.useState({
        eid: eid, 
        title: "Init Title",
        uid:      uid,
        username: "Init",
        content_src:    "https://www.baidu.com/", 
        time: "2022-12-01"
    })
    const [md, handleMD] = React.useState('loading... ...');
    const [comment_list, set_comment_list] = React.useState([{
        time: "2022-12-01",
        content: "Loading...",
        uid:      uid,
        username: "Init",
    }])
    // 请求文章内容
    React.useEffect(() => {
        props.socket.off('getArticleDetailSuccess');
        props.socket.on('getArticleDetailSuccess', (res) => {
            set_article_detail(res);
            console.log('props:');
            console.log(props);
            fetch(res.content_src)
                .then((resp) => resp.text())
                .then((txt) => handleMD(txt));
        })
        props.socket.emit('getArticleDetail', {eid: eid});
    }, [])
    // 请求文章对应评论
    React.useEffect(() => {
        props.socket.off('getArticleCommentsSuccess');
        props.socket.on('getArticleCommentsSuccess', (res) => {
            set_comment_list(res.comments);
            console.log(res);
        })
        props.socket.emit('getArticleComments', {eid: eid});
    }, [])
    //发布评论
    const handleSubmit = () => {
        props.socket.emit('addCommentToArticle', {uid: uid, eid: eid, content: new_comment});
        console.log({uid: uid, eid: eid, add_new_content: new_comment});
        props.socket.off('addCommentToArticleSuccess');
        props.socket.on('addCommentToArticleSuccess', (data) =>{
            console.log(data);
            set_new_comment("");
            // 重新获取全部评论
            props.socket.off('getArticleCommentsSuccess');
            props.socket.on('getArticleCommentsSuccess', (res) => {
                set_comment_list(res.comments);
                console.log(res);
            })
            props.socket.emit('getArticleComments', {eid: eid});
        })
    }
    // 删除整篇文章
    const handleDeleteArticle = () => {
        console.log('删除文章');
        props.socket.emit('deleteArticle', {eid: eid});
        props.socket.off('deleteArticleSuccess');
        props.socket.on('deleteArticleSuccess', (res) => {
            console.log(res);
            window.close();
        })
    }

    console.log('params.uid: ', params.uid);
    console.log('article_detail.uid: ', article_detail.uid);
    
    return(
        <div>
            <div className="Article_head">
                <h1 className="Article_title">{article_detail.title}</h1>
                <h4 className="Article_time">
                    {article_detail.username}&nbsp;编辑于&nbsp;{article_detail.time}&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href={article_detail.content_src} target="content" className="Article_download">下载文章</a>&nbsp;&nbsp;&nbsp;&nbsp;
                    {Number(params.uid) === article_detail.uid && <a onClick={handleDeleteArticle}>删除文章</a>}
                </h4>
            </div>
            <div className="Article_body">
                <ReactMarkdown escapeHtml={false} remarkPlugins={[remarkGfm]}>
                    {md}
                </ReactMarkdown>
            </div>
            <div>
                <h2>相关评论</h2>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className="addComment_block">
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-with-sx" placeholder="添加评论" inputProps={ariaLabel} fullWidth
                        onChange={(e) => set_new_comment(e.target.value)} className="addComment_TextField">
                    </TextField>
                    <div className="addComment_enter">
                        <Button onClick={() => handleSubmit()} size='small' variant="contained" endIcon={<SendIcon />}>
                            提交
                        </Button>
                    </div>
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