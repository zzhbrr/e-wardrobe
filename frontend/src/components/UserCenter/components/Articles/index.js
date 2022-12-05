import React from "react";
import "./index.css"
import { useNavigate } from "react-router-dom";
import AddArticle from "./AddArticle";
import AddCircleIcon from '@mui/icons-material/AddCircle';



export default function Articles(props){    
    const article_list=props.article_list;
    // console.log(article_list)
    const reqArticles=props.reqArticles;
    const navigate=useNavigate();

    React.useEffect(()=>{
        if(article_list==false&&!props.init_state){
            reqArticles();
        }
    });
    console.log('uid : '+props.uid)
    // const [article_list,setArticles]=React.useState(defalut_article_list);

    function handleAddArticle(data) {
        props.reqAddArticle(data);
    }

    return(
        <div className="articles">
            <h1>我发布的文章</h1>
            <AddArticle className="button" socket={props.socket} uid={props.uid} handleAddArticle={handleAddArticle}>
                新建文章
                <AddCircleIcon style={{float:"left",marginRight:"5px"}} />
            </AddArticle>
            <div className="article_list">
                {article_list.map((article)=>{return (
                    <div className="article_block" key={article.eid} onClick={()=>window.open(`/article/${article.eid}/${article.uid}`)}>
                        <h3 className="title">{article.title}</h3>
                        <div className="author">{article.time}</div>
                    </div>
                )})}
            </div>
        </div>
    )
}