import React from "react";
import NaviBar2 from "../../NaviBar2";
import { useNavigate } from "react-router-dom";
import './index.css'
import AddGroup from "./AddGroup";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchGroup from "./SearchGroup";

const items=['我加入的组','我创建的组']
export default function UserGroups(props){
    const [item_selected,selectItem]=React.useState(items[0])
    const user_lists=props.user_lists;
    const navigate=useNavigate()

    function handleAddGroup(data) {
        user_lists['我加入的组'].push({gid:data.gid, group_name:data.group_name, intro:data.intro});
        user_lists['我创建的组'].push({gid:data.gid, group_name:data.group_name, intro:data.intro});
    }

    return(
        <div className="user_group">
            <h1>我的组</h1>
            <AddGroup className="button" socket={props.socket} uid={props.uid} handleAddGroup={handleAddGroup}>
                新建组
                <AddCircleIcon style={{float:"left",marginRight:"5px"}} />
            </AddGroup>
            <SearchGroup className="button" socket={props.socket} uid={props.uid} handleAddGroup={handleAddGroup}></SearchGroup>
            <NaviBar2 item_selected={item_selected} selectItem={selectItem} items={items} />
            <div className="group_list">
                {user_lists[item_selected].map((group)=>{return (
                    <div className="group_block" key={group.gid} onClick={()=>{navigate(`${group.gid}/${props.uid}`)}}>
                        <h3 className="group_name">{group.group_name}</h3>
                        <div className="intro">{group.intro}</div>
                    </div>
                )})}
            </div>
        </div>
    )
}