import React from "react"
import NaviBar from "./components/NaviBar"
import UserInfo from "./components/UserInfo"
import Articles from "./components/Articles"
import Outfits from "./components/Outfits"
import "./index.css"
import {
    useNavigate
} from "react-router-dom";

const SELECT_USERINFO = 0, SELECT_OUTFITS = 1, SELECT_ARTICLES = 2;

export default function UserCenter({socket, isLogin, userName, UID}){
    const [selected_content, set_selected_content]=React.useState(SELECT_USERINFO);
    const navigate = useNavigate()

    React.useEffect(()=>{
        socket.on("autoLoginFailed", ()=>{
            // console.log('usercenter: autologinFailed');
            navigate('/login');
        });
        socket.on('autoLoginSuccess', ()=>{
        });
    }, [])

    React.useEffect(()=>{
        if (isLogin) {
            console.log('already login');
        } else {
            console.log('usercenter: userName:', userName);
            console.log('usercenter: isLogin:', isLogin);
            socket.emit('autoLogin', {username:userName})
        }
    }, [])

    return(
        <div className="main_page">
            <h1 className="underline">个人中心</h1>
            <div className="flex-row">
                <NaviBar selected_content={selected_content} set_selected_content={set_selected_content} />
                {selected_content==SELECT_USERINFO?<UserInfo socket={socket} userName={userName}/>:
                    selected_content==SELECT_OUTFITS?<Outfits socket={socket} userName={userName} UID={UID}/>:
                        selected_content==SELECT_ARTICLES?<Articles />:
                            <div className="user_info">error</div>}
            </div>
        </div>
    )
}