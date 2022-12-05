import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./index.css"
import Icon from '@mui/material/Icon';
import Alert from '@mui/material/Alert';

export default function Members(props){
    const [alertInfo, setAlertInfo] = React.useState("");
    const member_list=props.member_list;
    console.log(member_list)
    // const reqMembers=props.reqMembers;

    // React.useEffect(()=>{
    //     if(menber_list==false&&!props.init_state){
    //         reqMembers();
    //     }
    // });

    
    const handleClickJoinGroup = ()=> {
        console.log('in handleJoinGroup');
        for (let i = 0; i < member_list.length; i++) {
            if (Number(member_list[i].uid) === Number(props.uid)) {
                setAlertInfo("您已经加入该组");
                console.log('您已经加入该组');
                return;
            }
        }
        props.socket.off('joinGroupSuccess');
        props.socket.on('joinGroupSuccess', (data) => {
            props.handleJoinGroup(data);
        });
        props.socket.emit('joinGroup', {uid: props.uid, gid: props.gid});
    }

    
    return(
        <div className="members">
            <h1>全部成员</h1>
            <button className="change_btn left" onClick={handleClickJoinGroup}>
                <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
                <Icon style={{float:"left",marginRight:"5px"}}>add_circle</Icon>
                    加入本组
            </button>
            {alertInfo==="" ? "" : 
                    <Alert severity="error"> {alertInfo} </Alert> }
            
            <div className="list">
                {member_list.map((member)=>{return (
                    <div className="member_block" key={member.uid}>
                        <h3 className="member_name">
                            <AccountCircleIcon style={{float:'left',marginRight:'5px',font:'medium'}}/>
                            {member.username}
                        </h3>
                        {/* <div className="author">{article.time.substr(0,10)}</div> */}
                    </div>
                )})}
            </div>
        </div>
    )
}