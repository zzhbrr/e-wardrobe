import React from "react"
import "./index.css"
// import ChangeInfo from "../ChangeInfo"
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate} from "react-router-dom";

export default function GroupInfo(props){
    const group_info=props.group_info;
    const navigate=useNavigate();
    // const reqGroupInfo=props.reqGroupInfo;
    // const reqGroupInfoChange=props.handleChangeInfo;
    // if(group_info==null){
    //     reqGroupInfo()
    // }
    // React.useEffect(()=>{
    //     if(group_info.uid===-1&&!props.init_state){
    //         reqGroupInfo(group_info.gid)
    //     }
    // })

    const handleDeleteGroup = ()=> {
        props.socket.emit('deleteGroup', {gid: group_info.gid});
        props.socket.off('deleteGroupSuccess');
        props.socket.on('deleteGroupSuccess', (data)=>{
            // navigate('/group');
            window.close();
        });
    }

    return(
        <div className="group_info">
            <h1 className=" group left">{group_info.groupname} </h1>
            <div className="gid left">gid：{group_info.gid}</div>
            <div className="group_content left">简介：{group_info.intro}</div>
            {/* <button className="change_btn">修改信息</button> */}
            {/* <ChangeInfo className="change_btn left" handleChangeInfo={reqGroupInfoChange}/> */}
            {Number(props.uid) === Number(group_info.creatorid) && 
                <button className="change_btn left" onClick={handleDeleteGroup}>
                    <DeleteIcon style={{float:"left",marginRight:"5px"}}/>
                    删除组
                </button>}
        </div>
    )
}