import NaviBar2 from "../NaviBar2";
import { useNavigate } from "react-router-dom";
import React from "react";
import "./index.css"

const items=['个人中心','组']
const dest={
    '个人中心': '/usercenter',
    '组':       '/group'
}

export default function GlobalNaviBar(props){
    // console.log(props)
    const [item_selected,selectItem]=React.useState(props.cur_item);
    console.log(item_selected)
    const navigate=useNavigate();
    function clickItem(item){
        // selectItem(item);
        navigate(dest[item]);
    }
    return(
        <div className="clothbar">
            {items.map((item)=>{
                return(
                    <div className={item_selected==item?"globalbar_item globalbar_item_selected":"globalbar_item"}
                    onClick={()=>clickItem(item)}
                    key={item} >{item}</div>
            )})}
        </div>
    )
}