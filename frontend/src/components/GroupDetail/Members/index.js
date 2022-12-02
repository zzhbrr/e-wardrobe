import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./index.css"

export default function Members(props){    
    const member_list=props.member_list;
    console.log(member_list)
    // const reqMembers=props.reqMembers;

    // React.useEffect(()=>{
    //     if(menber_list==false&&!props.init_state){
    //         reqMembers();
    //     }
    // });
    
    return(
        <div className="members">
            <h1>全部成员</h1>
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