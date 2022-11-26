import React from "react"
import "./user_info.css"
import ChangeInfo from "../ChangeInfo"

export default function UserInfo(props){
    const [userInfo,set_userInfo]=React.useState({
        uid:        0,
        name:       "User",
        gender:     "Unknown",
        age:        0,
        profession: "Unknown"
    });
    function handleUserInfoChange(data){
        const tmp = {
            uid:        userInfo.uid,
            name:       userInfo.name,
            gender:     data.gender, 
            age:        data.age,
            profession: data.profession
        }
        set_userInfo(tmp);
    }
    return(
        <div className="user_info">
            <h1 className=" user left">{userInfo.name}</h1>
            <div className="uid left">uid：{userInfo.uid}</div>
            <div className="user_content left">性别：{userInfo.gender}</div>
            <div className="user_content left">年龄：{userInfo.age}</div>
            <div className="user_content left">职业：{userInfo.profession}</div>
            {/* <button className="change_btn">修改信息</button> */}
            <ChangeInfo className="change_btn" handleChangeInfo={handleUserInfoChange}/>
        </div>
    )
}