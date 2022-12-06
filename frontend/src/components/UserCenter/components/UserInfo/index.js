import React from "react"
import "./user_info.css"
import ChangeInfo from "../ChangeInfo"
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";

export default function UserInfo(props){
    const userInfo=props.user_info;
    const reqUserInfo=props.reqUserInfo;
    const reqUserInfoChange=props.handleChangeInfo;
    const navigate=useNavigate();
    // if(userInfo==null){
    //     reqUserInfo()
    // }
    React.useEffect(()=>{
        if(userInfo.uid===-1&&!props.init_state){
            console.log(userInfo)
            reqUserInfo(userInfo.username)

        }
    })

    React.useEffect(()=>{
        props.socket.off('logoutSuccess');
        props.socket.on('logoutSuccess', (data) => {
            alert(data.username + ' logout success');
            localStorage.clear();
            props.handleLogout();
            navigate('/login');
        });
        props.socket.off('logoutFailed');
        props.socket.on('logoutFailed', (data) => {
            alert(data.message);
        });
    }, [])

    const handleLogout = ()=> {
        props.socket.emit('logout', {uid: userInfo.uid, username: userInfo.username.replace(/\s+/g, "")});
    }

    return(
        <div className="user_info">
            <h1 className=" user left">{userInfo.username} </h1>
            <div className="uid left">uid：{userInfo.uid}</div>
            <div className="user_content left">性别：{userInfo.gender}</div>
            <div className="user_content left">年龄：{userInfo.age}</div>
            <div className="user_content left">职业：{userInfo.profession}</div>
            {/* <button className="change_btn">修改信息</button> */}
            <ChangeInfo className="change_btn left" handleChangeInfo={reqUserInfoChange}/>
            <button className="change_btn left" onClick={handleLogout}>
                <LogoutIcon style={{float:"left",marginRight:"5px"}}/>Logout
            </button>
        </div>
    )
}