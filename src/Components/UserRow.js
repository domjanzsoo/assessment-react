import React, { Component } from 'react';
import PropTypes from 'prop-types';
require('dotenv').config();
let apiKey='668185276221433622';

class UserRow extends Component{
  constructor(props) {
    super(props);
    this.state={
      id:this.props.user.id,
      firstName:this.props.user.firstName,
      lastName:this.props.user.lastName,
      email:this.props.user.email,
      DOB:this.props.user.DOB,
      phoneNumber:this.props.user.phoneNumber,
      errorResponse:'',
      successResponse:'',
      changes:{},
    }
    this.handleDelete=this.handleDelete.bind(this);
    this.handleUpdateChange=this.handleUpdateChange.bind(this);
    this.sendUpdate=this.sendUpdate.bind(this);
    this.inputClicked=this.inputClicked.bind(this);
  };
  
  render (){
    return(
        
            
        <tr>
        <td style={tdStyle}><input type="text" style={inputStyle} data-field="firstName" placeholder={ this.props.user.firstName} onClick={this.inputClicked}  onChange={this.handleUpdateChange}></input></td>
        <td style={tdStyle}><input type="text" style={inputStyle} data-field="lastName" placeholder={ this.props.user.lastName} onClick={this.inputClicked}  onChange={this.handleUpdateChange}></input></td>
        <td style={tdStyle}><input type="text" style={inputStyle} data-field="email" placeholder={ this.props.user.email} onClick={this.inputClicked}  onChange={this.handleUpdateChange}></input></td>
        <td style={tdStyle}><input type="text" style={inputStyle} data-field="DOB" placeholder={ this.props.user.DOB} onClick={this.inputClicked}  onChange={this.handleUpdateChange}></input></td>
        <td style={tdStyle}><input type="text" style={inputStyle} data-field="phoneNumber" placeholder={ this.props.user.phoneNumber} onClick={this.inputClicked}  onChange={this.handleUpdateChange}></input></td>
        <td> <button onClick={this.sendUpdate} style={btn}>SAVE CHANGES</button></td> 
        <td> <button onClick={this.handleDelete} style={btn}>REMOVE USER</button></td> 
        </tr>

    
    );
  };

  inputClicked=(e)  =>{
 
  

      console.log('new object is: ');
  }

  handleUpdateChange=(e) =>{
    const changeObj=this.state.changes;
    changeObj[e.target.dataset.field]=e.target.value;
      this.setState({
        changes:changeObj,
      });

      console.log(e.target.dataset.field + ' has been changed');
      console.log('new object is: ' + JSON.stringify(this.state.changes));
  }

  sendUpdate=() =>{
    this.props.updateTriggered();
    let that=this;
    let xhr=new XMLHttpRequest();
    xhr.responseType='text';
    xhr.onload=function(){
      that.props.updateUser();
       //do some stuffs
       if (xhr.readyState === xhr.DONE) {
         that.props.updateResponse();
          if (xhr.status === 200) {
            console.log(xhr.response);
            that.setState({
                successResponse: xhr.response,
          });
           
          }else{
            let errorMsg='';
            that.props.updateResponse();
            console.log(xhr.responseText);
            let errors=JSON.parse(xhr.responseText).errors;
              for(let key in errors){
                errorMsg += "\n" + key + " : " + errors[key];
                }
                that.setState({errorResponse:errorMsg,loading:false}, () => {console.log(that.state.errorResponse)});
                console.log(errorMsg);
          }
}
};

//prepare data object
//let dataToSend={id:this.state.id};
let dataToSend=this.state.changes;
dataToSend.id=this.state.id;

/*this.state.changes.forEach(change =>{
  dataToSend[change]=that.state[change];
});*/



xhr.open('POST', process.env.REACT_APP_API_URL+ 'update-user?api_key=' + apiKey,true);
//xhr.setRequestHeader('Accept', 'application/json');

xhr.send(JSON.stringify(dataToSend));
console.table(dataToSend);
  }

   handleDelete=()=>{
      this.props.deleteClicked(this.props.user.id);
   }
}

UserRow.propType={
  user:PropTypes.object.isRequired,
}

const tdStyle={
    padding:'4px',
    borderBottom:'1px groove #111111',
    height:'17px',
    lineHeight:'17px'
}


const inputStyle={
  border:'0',
  background:'transparent',
  width:'100%',
  padding:'8px 0 5px 0',
  fontSize:'16px',
  color:'#fff',
  textAlign:'center',
};

const btn={
  color:'#fff',
	backgroundColor:'#e74c3c',
	outline: 'none',
  border:'0',
	padding:'10px 20px',
	textTransform:'uppercase',
	borderRadius:'2px',
  cursor:'pointer',
  marginRight:'12px',
	position:'relative',
}

export default UserRow;