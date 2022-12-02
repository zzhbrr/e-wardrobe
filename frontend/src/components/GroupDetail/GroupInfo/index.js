import React from "react"
import "./index.css"
// import ChangeInfo from "../ChangeInfo"

export default function GroupInfo(props){
    const group_info=props.group_info;
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

    return(
        <div className="group_info">
            <h1 className=" group left">{group_info.groupname} </h1>
            <div className="gid left">gid：{group_info.gid}</div>
            <div className="group_content left">简介：{group_info.intro}</div>
            {/* <button className="change_btn">修改信息</button> */}
            {/* <ChangeInfo className="change_btn left" handleChangeInfo={reqGroupInfoChange}/> */}
        </div>
    )
}