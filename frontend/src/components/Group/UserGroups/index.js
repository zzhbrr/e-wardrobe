import React from "react";
import NaviBar2 from "../../NaviBar2";
import { useNavigate } from "react-router-dom";
import './index.css'

const items=['我加入的组','我创建的组']
export default function UserGroups(props){
    const [item_selected,selectItem]=React.useState(items[0])
    const user_lists=props.user_lists;
    const navigate=useNavigate()
    return(
        <div className="user_group">
            <h1>我的组</h1>
            <NaviBar2 item_selected={item_selected} selectItem={selectItem} items={items} />
            <div className="group_list">
                {user_lists[item_selected].map((group)=>{return (
                    <div className="group_block" key={group.gid} onClick={()=>{navigate(`${group.gid}`)}}>
                        <h3 className="group_name">{group.group_name}</h3>
                        <div className="intro">{group.intro}</div>
                    </div>
                )})}
            </div>
        </div>
    )
}