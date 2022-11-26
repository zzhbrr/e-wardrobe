import React from "react";
import "./index.css"

export default function Articles(props){
    const default_article={
        title:  "Default Title",
        author: " Default User",
        src:    "../materials/defalut_article.html"
    }
    const defalut_article_list=[default_article,default_article,default_article,default_article];

    const [article_list,setArticles]=React.useState(defalut_article_list);

    return(
        <div className="articles">
            <h1>我发布的文章</h1>
            <div className="list">
                {article_list.map((article)=>{
                    <div className="article_block">
                        <h3>{article.title}</h3>
                        <div className="author">{article.author}</div>
                    </div>
                })}
            </div>
        </div>
    )
}