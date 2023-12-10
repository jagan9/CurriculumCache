import React, {Component} from 'react';
import { Container,Box } from '@mui/material';
import {TextField} from '@mui/material';
import {Typography} from '@mui/material';
import {Button} from '@mui/material';
import {CircularProgress} from '@mui/material';
import {Snackbar} from '@mui/material';
import {Link, redirect} from 'react-router-dom';
import Logo from "../logo.svg";
import { firebaseAuth } from '../firebase';

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function checkPassword(str)
{
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(str);
}


class Login extends Component {

	constructor(props) {
		super(props)
	
		this.state = {
			 show_progress:false,
			 snakbar:false,
			 email:"",
			 password:"",
             err:false,
             login:"login"
		}
	}

	handleChange = (e) =>{
		this.setState({
			[e.target.name]:e.target.value,
		})
        this.state.email_error=null;
		this.state.password_error=null;
        this.state.err=false;   
	}

	handleClose = () => {
     this.setState({ 
     	snakbar:false
     });
    };

   

	formSubmitted=()=>{
        let validData=true;

		this.state.email_error=null;
		this.state.password_error=null;

		if (this.state.email === "") {
			this.state.email_error="Requried";
			validData=false;			
		}

        if(!validateEmail(this.state.email)){
            this.state.email_error="invalid";
			validData=false;		
        }

		if (this.state.password === "") {
			this.state.password_error="Requried";
			validData=false;			
		}

		this.setState({
			update:true,
		})

		if (validData) {
			this.setState({
                login:"loading..."
			})

		}

        if(validData){
            firebaseAuth.signInWithEmailAndPassword(this.state.email,this.state.password).then((user)=>{
                console.log("success from login");
                this.props.loginsuccess();
            }).catch(e=>{
                this.setState({
                    login:"login",
                    err:true
                })
                console.log(e.message);
            })
        }
	}


	render() {
		return (
		    <Container 
		    maxWidth="xs" 
		    style={{marginTop:"60px",
		    textAlign:"center"}} >

			 <Box 
			 bgcolor="white" 
			 boxShadow="2" 
			 textAlign="center" 
			 p="24px" 
			 borderRadius="13px">
			 <img 
			 src={Logo} 
			 alt="logo" 
			 height="60px" 
			 width="60px"/>
			 <br/>
			 <Typography 
			 variant="h4" 
			 color="secondary">
             LOGIN 
             </Typography>
             <br/><br/>
			  <TextField
	          label="Email"
	          fullWidth
	          error={this.state.email_error!=null}
	          helperText={this.state.email_error}
	          type="email"
	          onChange={this.handleChange}
	          name="email"
	          placeholder="email"
	          variant="outlined"
	          size="small"
	          />
	          <br/><br/>
	          <TextField
	          label="Password"
	          error={this.state.password_error!=null}
	          helperText={this.state.password_error}
	          type="password"
	          onChange={this.handleChange}
	          name="password"
	          fullWidth
	          placeholder="password"
	          variant="outlined"
	          size="small"
	          />
	          <br/><br/>
	          
	          {this.state.err===true && <Typography  variant="caption" display="block" gutterBottom style={{color:"red"}}>Wrong Credentials</Typography>}
	          <Button 
	          fullWidth
	          variant="contained" 
	          color="secondary"
	          onClick={this.formSubmitted}>
              {this.state.login}
              </Button>
              <br/><br/>
              <Typography>
              Do not have an account ?  
              <Link to="/signup" >
               create account
              </Link>
              </Typography>
              <Link to="/forgotpassword">
                forgot Password 
              </Link>  
              <Snackbar
		        anchorOrigin={{
		          vertical: 'bottom',
		          horizontal: 'left',
		        }}
		        open={this.state.snakbar}
		        autoHideDuration={1000}
		        onClose={e=>this.setState({
		          snakbar:false
		        })}
		        message={this.state.snackbar_error}
		        
        	/>
			 </Box>
			 <br/><br/><br/>
			</Container>
		)
	}
}

export default Login;