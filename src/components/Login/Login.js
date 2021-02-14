import React, { useState } from 'react'
import { Grid,Paper, Avatar, TextField, Button} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import api from '../../api/local';

async function loginUser(username, password) {
    const res = await api.post('/api/v1/login/user', {
        params: { 
            username : username,
            password: password
        }
    });
    console.log(res)
    if (res.statusText === 'OK') {
        return res.data.token
    }
   }

export default function Login({setToken}){
    const paperStyle={padding :20,height:'45vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const textStyle={margin:'8px auto'}
    const btnstyle={margin:'8px 0'}

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser(
          username,
          password
        );
        setToken(token);
      }

    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField
                    style={textStyle}
                    label='Username'
                    placeholder='Enter username'
                    fullWidth
                    required
                    onChange={e => setUserName(e.target.value)}
                />
                <TextField
                    style={textStyle}
                    label='Password'
                    placeholder='Enter password'
                    type='password'
                    fullWidth
                    required
                    onChange={e => setPassword(e.target.value)}
                />
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                <Button
                    type='submit'
                    color='primary'
                    variant="contained"
                    style={btnstyle}
                    fullWidth
                    onClick={handleSubmit}
                >
                    Sign in
                </Button>
            </Paper>
        </Grid>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }