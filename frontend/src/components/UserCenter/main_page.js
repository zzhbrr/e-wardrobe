import React from "react"
import NaviBar from "./navi_bar"
import UserInfo from "./user_info"
import "./main_page.css"
import "./user_info.css"

const SELECT_USERINFO=0,SELECT_OUTFITS=1,SELECT_ARTICLES=2;

export default function MainPage(props){
    const [selected_content,set_selected_content]=React.useState(SELECT_USERINFO);
    return(
        <div className="main_page">
            <h1 className="underline">个人中心</h1>
            <div className="flex-row">
                <NaviBar selected_content={selected_content} set_selected_content={set_selected_content} />
                {selected_content==SELECT_USERINFO?<UserInfo />:
                    selected_content==SELECT_OUTFITS?<div className="user_info">outfit</div>:
                        selected_content==SELECT_ARTICLES?<div className="user_info">articles</div>:
                            <div className="user_info">error</div>}
            </div>
        </div>
    )
}