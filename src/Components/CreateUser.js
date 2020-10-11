import React, { Component } from 'react';
import PropTypes from 'prop-types';
require('dotenv').config();
let apiKey='668185276221433622';
class CreateUser extends Component{
  constructor(props) {
    super(props);
    this.formRef=React.createRef();
    this.state = {
        firstName: '',
        lastName: '',
        email: '',
        DOB: '',
        phoneNumber: '', 
        uploadState:false,
        errorResponse:'',
        successResponse:'',
    };

    this.handleChange=this.handleChange.bind(this);
    this.submitData=this.submitData.bind(this);
    this.sendData=this.sendData.bind(this);
    this.dateFocus=this.dateFocus.bind(this);
    this.dateBlur=this.dateBlur.bind(this);
    this.inputFocus=this.inputFocus.bind(this);
    this.blurInput=this.blurInput.bind(this);
  };

    //Mounted method
    componentDidMount(){

      console.log('Api url: ' + process.env.REACT_APP_API_URL);
     
    }

  render (){
    return(
      
      <div style={{ width: '100%', height: '100%' }}>
       
        <div style={formBox}>
        <form method="post" action="/" ref={this.formRef} className="theform">
        <span style={formHead}>add new user</span>
          <div style={msgContainer}>
              <div style={errorStyle}>{this.state.errorResponse}</div>
              <div style={successStyle}>{this.state.successResponse}</div>
          </div>
            <div style={inputContainer}>
                <input type="text" name="firstName" value={this.state.firstName} placeholder="" onChange={this.handleChange} onFocus={this.inputFocus} onBlur={this.blurInput}  style={input}/>
                <label style={inputLabel}>First Name</label>
            </div>
            <div  style={inputContainer}>
                <input type="text" name="lastName" value={this.state.lastName}  onChange={this.handleChange} onFocus={this.inputFocus} onBlur={this.blurInput}  style={input} />
                <label style={inputLabel}>Last Name</label>
            </div>
            <div  style={inputContainer}>
                <input type="email" name="email" value={this.state.email}  onChange={this.handleChange} onFocus={this.inputFocus} onBlur={this.blurInput}  style={input} />
                <label style={inputLabel}>Email</label>
            </div>
            <div  style={inputContainer}>
                <input type="tel" name="phoneNumber" value={this.state.phoneNumber}   onChange={this.handleChange} onFocus={this.inputFocus} onBlur={this.blurInput}  style={input}/>
                <label style={inputLabel}>Mobile Phone</label>
                <small style={formatText}>Format: 447512345678</small>
            </div>
            <div>
                <label style={DOBLabel}>Date of birth</label>
                <input type="date" name="DOB" value={this.state.DOB} style={dateInput} onChange={this.handleChange} onFocus={this.dateFocus} onBlur={this.dateBlur}/ >
            </div>
            <button onClick={this.submitData} style={btn}>Submit</button>
        </form>
        </div>
    </div>

    );
  };

  
//Styling date input on focus
  dateFocus= (e)  =>{
    e.target.style.border='1px solid #e61961';
  }

//Styling date input after clicking away
  dateBlur=(e)  =>{
    e.target.style.border='1px solid #fff';
  }

//Input focus styling
  inputFocus=(e)  =>{
    e.target.style.border='none';
    e.target.style.outline='none';
    e.target.style.borderBottom='1px solid #e61961';
    e.target.parentElement.querySelectorAll('label')[0].style.top='-12px';
    e.target.parentElement.querySelectorAll('label')[0].style.fontSize='12px';
  }

//Styling after clicking away from input
  blurInput=(e) =>{
    e.target.style.border='none';
    e.target.style.outline='none';
    e.target.style.borderBottom='1px solid #fff';

    if(e.target.value.length === 0){

    e.target.parentElement.querySelectorAll('label')[0].style.top='0px';
    e.target.parentElement.querySelectorAll('label')[0].style.fontSize='16px';
    }
  }

  //Handling input change
  handleChange=(e) =>{
    let value=e.target.value;
    let inpName=e.target.name;

    this.setState({
      [inpName]:value
    });
   
  }

  //Data sending
  sendData=() =>{
    this.props.informSending();
    let that=this;
    let  formData = new FormData(this.formRef.current);
    let xhr=new XMLHttpRequest();
    xhr.responseType='text';
    xhr.onload=function(){

       //do some stuffs
       if (xhr.readyState === xhr.DONE) {
              if (xhr.status === 200) {
                  console.log(xhr.response);
                  that.setState({successResponse: xhr.response});
                  that.state.firstName='';
                  that.state.lastName='';
                  that.state.email='';
                  that.state.DOB='';
                  that.state.phoneNumber='';
                  document.querySelectorAll('.theform')[0].reset();
                  that.setState({successResponse:xhr.responseText}, () => {console.log(that.state.successResponse)});
                  //that.props.confirmUpdate();
                  that.props.sendingFinished();
              }else{
               let errorMsg='';
               let errors=JSON.parse(xhr.responseText).errors;
                for(let key in errors){
                  errorMsg += "\n" + key + " : " + errors[key];
                }
                that.setState({errorResponse:errorMsg}, () => {console.log(that.state.errorResponse)});
                  console.log(errorMsg);

                that.props.sendingFinished();
              }
       }
   };
   xhr.open('POST',process.env.REACT_APP_API_URL + 'add-user?api_key=' + apiKey,true);
   xhr.setRequestHeader('Accept', 'application/json');
   xhr.send(formData);
  }

//Data validation before sending it to the server
  submitData=(e) =>{
    e.preventDefault();
    this.setState({
      successResponse:'',
      errorResponse:'',
    })
    let that=this;

    //Validate first name input and add it to the user object
    if(this.state.firstName.length > 0 && /^[A-Za-z]+$/.test(this.state.firstName)){
      console.log('First name valid');
    }else{
     alert("Names can contain only upper or lowecase letters: " + that.state.firstName);
     // this.setState({firstName:''});
      return;  
    }
    //Validate last name input and add it to the user object
    if(this.state.lastName.length > 0 && /^[A-Za-z]+$/.test(this.state.lastName)){
     console.log('Lat Name valid');
    }else{
      alert("Names can contain only upper or lowecase letters: " + that.state.lastName);
     // this.setState({lastName:''});
      return;  
    }

    //Validate email and add it to the user object
    if(this.state.email.length > 0 && this.state.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
     console.log('Email valid');
    }else{
      alert("The given email address is not valid: " + that.state.email);
     // that.setState({email:''});
      return; 
    }

    //Validate phone number and add value to the user object
    if(this.state.phoneNumber.length > 0 &&  /^447\d{9}$/.test(this.state.phoneNumber)){
     console.log('Mobile Phone number is valid');
    }else{
      alert("Unvalid mobile phone number, the valid pattern is:447512345678 ");
      //that.setState({phoneNumber:''});
      return; 
    }

       //Validate add input and add the value to the user object
       if(this.state.DOB.length > 0){
        console.log('Date of birth valid');
       }else{
         alert("Add your date of birth: ");
         //that.setState({DOB:''});
         return; 
       }
    //Send the user object to the API server
    
    this.sendData();
  }   
}

CreateUser.propType={
  firstName:PropTypes.string.isRequired,
  lastName:PropTypes.string.isRequired,
  email:PropTypes.string.isRequired,
  DOB:PropTypes.string.isRequired,
  phoneNumber:PropTypes.number.isRequired,
}

const msgContainer={
    position:'relative',
    width:'100%',
    textAlign:'center',
    marginTop:'3px',
    marginBottom:'20px',
};

const errorStyle={
  color:'#bf081d',
  fontStyle:'italic',
};

const successStyle={
  color:'#10752b',
  fontWeight:'bold',
  marginTop:'0',
};

const formBox={
  position:'absolute',
	left:'50%',
	top:'150px',
	transform: 'translate(-50%,0%)',
  backgroundColor: 'rgba(0, 0, 0, 0.89)',
	borderRadius:'3px',
	padding:'70px 100px',
};

const inputContainer={
  position:'relative',
  marginBottom:'25px'
  
};

const inputLabel={
  position:'absolute',
	top:'0px',
	left:'0px',
	fontSize:'16px',
	color:'#fff',	
  pointerEvent:'none',
  transition: 'all 0.3s ease-in-out',

}

const input={
  border:'0',
  borderBottom:'1px solid #555',  
  background:'transparent',
  width:'100%',
  padding:'8px 0 5px 0',
  fontSize:'16px',
  color:'#fff',
};

const btn={
  color:'#fff',
	backgroundColor:'#e74c3c',
	outline: 'none',
  border:'0',
	padding:'10px 20px',
	textTransform:'uppercase',
	marginTop:'50px',
	borderRadius:'2px',
	cursor:'pointer',
	position:'relative',
}

const formHead={
    color:'#fff',	
	  textTransform:'uppercase',
    fontSize: '23px',
    margin: '-40px 0 0px 0',
    display: 'block',
    textAlign: 'center',
}

const formatText={
  color:'#fff',
  fontStyle:'italic',
  fontSize:'11px',
}

const dateInput={
  appearance: 'none',
  color: '#fff',
  fontFamily: '"Helvetica", arial, sans-serif',
  fontSize: '18px',
  border:'1px solid #fff',
  background:'transparent',
  padding:'5px',
  display: 'inline-block !important',
  visibility: 'visible !important',
}

const DOBLabel={
  fontSize:'17px',
  color:'#fff',	
  margin:'10px 20px auto auto',
}

export default CreateUser;