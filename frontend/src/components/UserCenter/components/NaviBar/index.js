import "./navi_bar.css"
import React from "react";
const SELECT_USERINFO=0,SELECT_OUTFITS=1,SELECT_ARTICLES=2,SELECT_CLOTHES=3;

export default function NaviBar(props){
    console.log(props)
    const {selected_content,set_selected_content}=props;
    return(
        <div className="navi_bar">
            <div className={selected_content==SELECT_USERINFO?"navi_content selected":"navi_content"} 
            onClick={()=>set_selected_content(SELECT_USERINFO)}>
                个人信息
            </div>
            <div className={selected_content==SELECT_OUTFITS?"navi_content selected":"navi_content"} 
            onClick={()=>set_selected_content(SELECT_OUTFITS)}>
                全部穿搭
            </div>
            <div className={selected_content==SELECT_ARTICLES?"navi_content selected":"navi_content"} 
            onClick={()=>set_selected_content(SELECT_ARTICLES)}>
                我的文章
            </div>
            <div className={selected_content==SELECT_CLOTHES?"navi_content selected":"navi_content"} 
            onClick={()=>set_selected_content(SELECT_CLOTHES)}>
                我的衣服
            </div>
        </div>
    )
}