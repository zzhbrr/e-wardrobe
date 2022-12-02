import "./navi_bar.css"
import React from "react";

export default function NaviBar(props){
    // console.log(props)
    const items=props.items;
    const item_selected=props.item_selected;
    const selectItem=props.selectItem;
    return(
        <div className="navi_bar">
            {items.map((item)=>{return(
                <div className={item_selected===item?"navi_content selected":"navi_content"} 
                key={item}
                onClick={()=>selectItem(item)}>
                    {item}
                </div>
            )})}
        </div>
    )
}