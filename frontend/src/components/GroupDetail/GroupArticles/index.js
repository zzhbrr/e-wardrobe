import React from "react";
import "../../UserCenter/components/Articles/index.css"
import { useNavigate } from "react-router-dom";

export default function GroupArticles(props){    
    const article_list=props.article_list;
    const navigate=useNavigate();
    // console.log(article_list)
    // const reqArticles=props.reqArticles;

    // React.useEffect(()=>{
    //     if(article_list==false&&!props.init_state){
    //         reqArticles();
    //     }
    // });
    
    // const [article_list,setArticles]=React.useState(defalut_article_list);
    return(
        <div className="articles">
            <h1>全部文章</h1>
            <div className="list">
                {article_list.map((article)=>{return (
                    <div className="article_block" key={article.eid} onClick={()=>navigate("/article/"+`${article.eid}`)}>
                        <h3 className="title">{article.title}</h3>
                        <div className="author">{`${article.username} - ${article.time.substr(0,10)}`}</div>
                    </div>
                )})}
            </div>
        </div>
    )
}