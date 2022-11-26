import React from "react"
import "./user_info.css"
import ChangeInfo from "../ChangeInfo"

export default function UserInfo({socket, userName}){
    const [userInfo,set_userInfo]=React.useState({
        uid:        -1,
        username:       userName,
        gender:     "Unknown",
        age:        0,
        profession: "Unknown"
    });
    function handleUserInfoChange(data){
        if (data.gender === 0) data.gender = "男";
        else if (data.gender === 1) data.gender = "女";
        const tmp = {
            uid:        data.UID,
            username:       userInfo.username,
            gender:     data.gender, 
            age:        data.age,
            profession: data.profession
        }
        changInfo(tmp);
        askInfo();
    }

    function askInfo() {
        console.log('emit to ask info');
        socket.on('userInfoAskSuccess', (data)=>{
            if(data.userInfo.gender == 0) data.userInfo.gender = "男";
            else if (data.userInfo.gender == 1) data.userInfo.gender = "女";
            set_userInfo(data.userInfo);
        });
        socket.on('userInfoAskFailed', (data)=>{
            console.log(data.message);
        });
        socket.emit('userInfoAsk', {userName: userName});
    }

    function changInfo(data) {
        console.log('emit to change info');
        socket.on('userInfoChangeSuccess', (data) => {
            console.log('修改用户信息成功');
        });
        socket.on('userInfoChangeFailed', (data) => {
            console.log('修改用户信息失败');
            console.log(data.message);
        });
        socket.emit('userInfoChange', data);
    }

    React.useEffect(()=>{
        askInfo();
    },[]);

    return(
        <div className="user_info">
            <h1 className=" user left">{userInfo.username}</h1>
            <div className="uid left">uid：{userInfo.uid}</div>
            <div className="user_content left">性别：{userInfo.gender}</div>
            <div className="user_content left">年龄：{userInfo.age}</div>
            <div className="user_content left">职业：{userInfo.profession}</div>
            {/* <button className="change_btn">修改信息</button> */}
            <ChangeInfo className="change_btn" handleChangeInfo={handleUserInfoChange}/>
        </div>
    )
}