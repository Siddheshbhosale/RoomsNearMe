import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';

import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { authenticate, isAuthenticated, signin } from '../services/authenticate';
import {useNavigate} from 'react-router-dom';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const defaultTheme = createTheme();


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/Siddheshbhosale">
                Siddhesh Bhosale
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}




export default function SignIn() {
    const [progress, setprogress] = useState(0);
    const [open, setOpen] = useState(false);
    const [error, seterror] = useState("");
    const navigate = useNavigate();
    const ErrorHandleClick = () => {
        setOpen(true);
    };
    const ErrorHandleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    
    const handleSubmit = (event) => {
        event.preventDefault();
        setprogress(true);
        const data = new FormData(event.currentTarget);
        const user = {
            email: data.get('email'),
            password: data.get('password'),
        };
        // ErrorHandleClick();
        // const timer = setInterval(() => {
        //     setprogress((prevProgress) => {
        //         const newProgress = prevProgress >= 100 ? 0 : prevProgress + 10;
        //         if (newProgress === 0) {
        //             clearInterval(timer); // Stop the interval when progress resets to 0
        //         }
        //         return newProgress;
        //     });
        // }, 800);

        signin(user)
            .then(data => {
                if(data.Error){
                    seterror(data.Error);
                    ErrorHandleClick();
                }
                else{
                    console.log(data);
                    console.log("login in")
                    authenticate(data);
                    if(isAuthenticated())
                        navigate( '/roomate');
                }
            })
            .catch(err => {
                seterror(err);
                ErrorHandleClick();
                console.log(err);
            })
        setprogress(false);
    };
    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{
                height: '100vh', justifyContent: 'center'
            }}>
                <CssBaseline />
                {/* <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: 'url(https://www.google.com/imgres?imgurl=https%3A%2F%2Ft4.ftcdn.net%2Fjpg%2F01%2F19%2F11%2F55%2F360_F_119115529_mEnw3lGpLdlDkfLgRcVSbFRuVl6sMDty.jpg&tbnid=70zHF7-2yfVfGM&vet=12ahUKEwiGv9jA2b6DAxWPcmwGHUZ9DVgQMygBegQIARB1..i&imgrefurl=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Dlogin%2Bbackground%2Bimages&docid=kNwAItm8rdvlmM&w=540&h=360&q=background%20image%20for%20login%20page&ved=2ahUKEwiGv9jA2b6DAxWPcmwGHUZ9DVgQMygBegQIARB1)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                /> */}
                <Grid item xs={12} sm={8} md={4.5} sx={{ margin: '15px' }} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />


                            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={6000} onClose={ErrorHandleClose}>
                                <Alert onClose={ErrorHandleClose} severity="error" sx={{ width: '100%' }}>
                                  {`${error}`}
                                </Alert>
                            </Snackbar>

                            {progress == 0 && (
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                            )}
                            {progress > 0 && (
                                <Button
                                    type="submit"
                                    fullWidth
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    <CircularProgress />
                                </Button>
                            )}
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>

                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}