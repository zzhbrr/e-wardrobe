import React from "react"
import "./index.css"
// import ChangeInfo from "../ChangeInfo"

export default function GroupInfo(props){
    const group_info=props.group_info;
    const reqGroupInfo=props.reqGroupInfo;
    const reqGroupInfoChange=props.handleChangeInfo;
    // if(group_info==null){
    //     reqGroupInfo()
    // }
    React.useEffect(()=>{
        if(group_info.uid===-1&&!props.init_state){
            reqGroupInfo(group_info.groupname)

        }
    })

    return(
        <div className="group_info">
            <h1 className=" group left">{group_info.groupname} </h1>
            <div className="gid left">gid：{group_info.uid}</div>
            <div className="group_content left">性别：{group_info.gender}</div>
            <div className="group_content left">年龄：{group_info.age}</div>
            <div className="group_content left">职业：{group_info.profession}</div>
            {/* <button className="change_btn">修改信息</button> */}
            {/* <ChangeInfo className="change_btn left" handleChangeInfo={reqGroupInfoChange}/> */}
        </div>
    )
}