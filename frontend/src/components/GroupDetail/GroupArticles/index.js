import React from "react";
import "./index.css"

export default function GroupArticles(props){    
    const article_list=props.article_list;
    // console.log(article_list)
    const reqArticles=props.reqArticles;

    React.useEffect(()=>{
        if(article_list==false&&!props.init_state){
            reqArticles();
        }
    });
    
    // const [article_list,setArticles]=React.useState(defalut_article_list);
    return(
        <div className="articles">
            <h1>全部文章</h1>
            <div className="list">
                {article_list.map((article)=>{return (
                    <div className="article_block" key={article.eid}>
                        <h3 className="title">{article.title}</h3>
                        <div className="author">{`${article.author} ${article.time.substr(0,10)}`}</div>
                    </div>
                )})}
            </div>
        </div>
    )
}