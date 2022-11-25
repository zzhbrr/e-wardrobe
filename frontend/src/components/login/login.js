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
const md5 = require('md5');

// const useStyles = makeStyles((theme) => ({
//     submit: {
//       margin: theme.spacing(3, 0, 2),
//       palette: {}
//     },
// }));

export default function Login({socket}) {
    // const classes = useStyles();
    const [username, setUsername] = React.useState('')
    const [info, setInfo] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [allreadyLogin, setAllreadyLogin] = React.useState(false)
    const navigate = useNavigate()

    function handleLoginClick(){
        console.log("login clicked");
        if (password === "" || username === ""){
            setInfo("Please Enter All Your Login Information!");
            return ;
        } else {
            socket.on('loginSuccess', (data) => {
                console.log("login success");
                navigate("/usercenter");
            });
            socket.on('loginFailed', (data) => {
                setInfo(data.message);
            });
            console.log('handling login button');
            socket.emit('login', {username: username, password: md5(password)})
        }
    }

    function handleRegisterLink() {
        console.log("register clicked");
        navigate("/register");
    }

    // React.useEffect(() => {
    //     socket.on('loginSuccess', (data) => {
    //         console.log("login success");
    //         navigate("/usercenter");
    //     });
    //     socket.on('loginFailed', (data) => {
    //         setInfo(data.message);
    //     });
    // }, []);

    React.useEffect(() => {
        if (allreadyLogin) {
            navigate("/usercenter");
        }
    });


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
                            onChange = {e => setUsername(e.target.value)}/>
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

