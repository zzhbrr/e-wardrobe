import React from 'react';
import { makeStyles } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './login.css'
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import {
    useNavigate
} from "react-router-dom";

// const useStyles = makeStyles((theme) => ({
//     submit: {
//       margin: theme.spacing(3, 0, 2),
//       palette: {}
//     },
// }));

export default function Login({socket}) {
    // const classes = useStyles();
    const [username, handleUsernameChange] = React.useState('')
    const [info, setInfo] = React.useState("")
    const [password, setPassword] = React.useState("")
    const navigate = useNavigate()

    function handleLoginClick(){
        console.log("login clicked");
        if (password === "" || username === ""){
            setInfo("Please Enter All Your Login Information!");
            return ;
        } else {
            // socket.emit('login', {username: username, password: password})
        }
    }

    function handleRegisterLink() {
        console.log("register clicked");
        navigate("/register");
    }

    return (
        <div>
            <Container component="main" maxWidth="xs" className="loginCard">
                <div className='card-header'>
                    <p className="title">Login</p>
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
                            onChange = {e => handleUsernameChange(e.target.value)}/>
                    </div>
                    <br></br>
                    <div>
                        <label>PASSWORD</label> <br></br>
                        <TextField margin="normal" required fullwidth 
                            id = "Password"
                            label = ""
                            type={"password"}
                            onChange = {e => setPassword(e.target.value)}/>
                    </div>
                </div>
                <button type="submit" variant="contained" margin="normal" className='btn_sign-up'
                    onClick={() => handleLoginClick()}> 
                    LOGIN 
                </button>
                <p className="register_link"><a onClick={handleRegisterLink}>Register</a></p>
            </Container>
        </div>
    )
}

