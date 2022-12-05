import React from "react"
import "./user_info.css"
import ChangeInfo from "../ChangeInfo"

export default function UserInfo(props){
    const userInfo=props.user_info;
    const reqUserInfo=props.reqUserInfo;
    const reqUserInfoChange=props.handleChangeInfo;
    // if(userInfo==null){
    //     reqUserInfo()
    // }
    React.useEffect(()=>{
        if(userInfo.uid===-1&&!props.init_state){
            console.log(userInfo)
            reqUserInfo(userInfo.username)

        }
    })

    return(
        <div className="user_info">
            <h1 className=" user left">{userInfo.username} </h1>
            <div className="uid left">uid：{userInfo.uid}</div>
            <div className="user_content left">性别：{userInfo.gender}</div>
            <div className="user_content left">年龄：{userInfo.age}</div>
            <div className="user_content left">职业：{userInfo.profession}</div>
            {/* <button className="change_btn">修改信息</button> */}
            <ChangeInfo className="change_btn left" handleChangeInfo={reqUserInfoChange}/>
            <button className="change_btn left">修改密码</button>
        </div>
    )
}