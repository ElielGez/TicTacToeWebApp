import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import LoginBG from '../../assets/login_bg.jpg';
import './login.css';
import { TextField } from '@material-ui/core';
import { validateEmail } from '../../util/validate';
import { localSDK } from '../../sdk';
import { useHistory } from 'react-router-dom';
import { PagesRoutes } from '../../routing/PagesRoutes';



const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState<string | undefined>();
    const handleLoginBtn = () => {
        if (!validateEmail(email)) {
            setEmailErr("Invalid email address");
            return;
        }
        localSDK.auth().login(email).then(() => {
            history.push(PagesRoutes.Game);
        });

    }
    return (
        <div className="login-container">
            <Card className="login-card">
                <CardMedia
                    component="img"
                    alt="tic tac toe"
                    height="140"
                    image={LoginBG}
                />
                <CardContent className="card-content">
                    <TextField fullWidth error={!!emailErr} helperText={emailErr} label="Email" placeholder="Enter email" value={email} onChange={(e) => {
                        setEmailErr(undefined);
                        setEmail(e.currentTarget.value);
                    }} />
                </CardContent>
                <CardActions className="card-actions" onClick={handleLoginBtn}>
                    <Button size="small" color="primary">
                        Login
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default Login;