import React from 'react';
import { makeStyles } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './register.css'
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import {
    useNavigate
} from "react-router-dom";

export default function Register({socket}) {
    const [userName, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [c_password, setCPassowrd] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [info, setInfo] = React.useState("");
    const navigate = useNavigate()

    function handleRegClick(e) {
        const data = { userName: userName, password: password, email: email };
        if (userName === "" || password === "" || email === "") {
            setInfo("Please Fill All the Field!");
          }
          else if (password !== c_password) {
            setInfo("Confirm Password Does Not Match the Password!");
          }
          else if (!(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email))) {
            setInfo("Please Enter a Vaild Email Address!");
          }
      
          if ((userName !== "") & (password !== "") & (email !== "") & (/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email))) {
            if (password === c_password) {
            //   socket.emit("register", data);
            }
          }
    }

    function handleLoginLink(e) {
        navigate("/login");
    }

    return (
        <div className="card">
            <Container component="main" maxWidth="xs" className="loginCard">
                <div className='card-header'>
                    <p className="title">Sign up</p>
                    {info==="" ? "" : 
                        <Alert severity="error" 
                            sx={{
                                'text-align': 'center',
                            }}>{info}</Alert>
                    }
                </div>
                <div className='card-body'>
                    <div>
                        <label>USERNAME</label> <br></br>
                        <TextField margin="normal" required fullwidth 
                            id = "Username"
                            label = ""
                            autoFocus
                            onChange = {e => setUsername(e.target.value)}/>
                    </div>
                    <br></br>
                    <div>
                        <label>EMAIL</label> <br></br>
                        <TextField margin="normal" required fullwidth 
                            id = "EMAIL"
                            label = ""
                            onChange = {e => setEmail(e.target.value)}/>
                    </div>
                    <br></br>
                    <div>
                        <label>PASSWORD</label> <br></br>
                        <TextField margin="normal" required fullwidth 
                            id = "PASSWORD"
                            label = ""
                            type={"password"}
                            onChange = {e => setPassword(e.target.value)}/>
                    </div>
                    <br></br>
                    <div>
                        <label>CONFIRM PASSWORD</label> <br></br>
                        <TextField margin="normal" required fullwidth 
                            id = "CONFIRM"
                            label = ""
                            onChange = {e => setCPassowrd(e.target.value)}/>
                    </div>
                </div>
                <button type="submit" variant="contained" margin="normal" className='btn_sign-up'
                    onClick={() => handleRegClick()}> 
                    REGISTER 
                </button>
                <p className="login_link"><a onClick={handleLoginLink}>Login</a></p>
            </Container>
        </div>
    )
}