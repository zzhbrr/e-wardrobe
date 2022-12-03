import React from "react";
import "./ClothBar.css"

export default function NaviBar2(props){
    const item_selected=props.item_selected;
    const selectItem=props.selectItem;
    const items=props.items;
    return(
        <div className="clothbar">
            {items.map((item)=>{
                return(
                    <div className={item_selected==item ? "clothbar_item cloth_item_selected" : "clothbar_item"}
                    onClick={()=>selectItem(item)} key={item}>
                    {item}</div>)
            })}
        </div>
    )
}