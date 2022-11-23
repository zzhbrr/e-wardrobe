import React from 'react';
import { makeStyles } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './login.css'
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import {
  useHistory
} from "react-router-dom";

export default function Login({socket, handleLogin}) {
    const [username, handleUsernameChange] = React.useState('')
    const [info, setInfo] = React.useState("")
    const [password, setPassword] = React.useState("")

    function handleLoginClick(){
        console.log("login clicked");
        if (password === "" || username === ""){
            setInfo("Please Enter All Your Login Information!");
            return ;
        } else {
            // socket.emit('login', {username: username, password: password})
        }
    }

    return (
        <div className="card">
            <Container component="main" maxWidth="xs" className="loginCard">
                <div>
                    <p>Login</p>
                </div>
                <div>
                    {info==="" ? "" : <Alert severity="error" className="margin_top">{info}</Alert>}
                    <TextField margin="normal" required fullwidth 
                        id = "Username"
                        label = "Username"
                        autoFocus
                        onChange = {e => handleUsernameChange(e.target.value)}/>
                    <TextField margin="normal" required fullwidth 
                        id = "Password"
                        label = "Password"
                        onChange = {e => setPassword(e.target.value)}/>
                </div>
                <Button type="submit" variant="contained" margin="normal"
                    onClick={() => handleLoginClick()}> 
                    LOGIN 
                </Button>
            </Container>
        </div>
    )
}

