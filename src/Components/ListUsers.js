import React, { Component } from 'react';
import UserRow from './UserRow';
import PropTypes from 'prop-types';


class ListUsers extends Component{
  constructor(props){
    super(props);
    this.updateTrigger=this.updateTrigger.bind(this);
    this.load=this.load.bind(this);
    this.updateComplete=this.updateComplete.bind(this);
    this.deleteClicked=this.deleteClicked.bind(this);
    this.state={
      loading:false
    };
  }
  

  render (){
    return(
           <div style={mainContainer}>
           <div style={formBox} className="overflowScroll">
           <span style={formHead}>edit user</span>
           <span style={formHeadAdditional}>click on the field you need to change and click save after all modifications are made on the row</span>
    <table style={dataTable}>
      <thead>
      <tr>
        <th><b style={headerText}>First Name</b></th>
        <th><b style={headerText}>Last Name</b></th>
        <th><b style={headerText}>Email</b></th>
        <th><b style={headerText}>Date of Birth</b></th>
        <th><b style={headerText}>Phone Number</b></th>
      </tr>
      </thead>
      <tbody>
    { this.props.users.map((user) =>{
      return(
       <UserRow key={user.id} user={user} deleteClicked={this.props.removeUser} updateUser={this.updateTrigger} updateResponse={this.updateComplete} updateTriggered={this.load} />
      );
     })
    }
    </tbody>
    </table>
      </div>
      </div>
    );
  };

  //Loader starter
  load=() =>{
     this.props.updateInformApp();
  }

   
//Update complete confirmatin
   updateComplete=() =>{
      this.props.updComplete();
   }

  //Update started
    updateTrigger=() =>{
      this.props.updateInformApp();
   
    }

  //Delete event started
    deleteClicked= () =>{
      this.setState({
        loading:true,
      });
    }
}

ListUsers.propType={
  users:PropTypes.array.isRequired,
}

const mainContainer={
  display:'block',
  position:'relative',
  width:'100%',
  height:'100vh',
  margin:'0',
  paddingTop:'140px',
}

const formBox={
  display:'block',
  position:'relative',
  width:'90%',
  height:'480px',
	//left:'50%',
	//top:'150px',
  //transform: 'translate(-50%,0%)',
  margin:'0 auto',
  backgroundColor: 'rgba(0, 0, 0, 0.89)',
	borderRadius:'3px',
	padding:'20px 50px',
};

const dataTable={
  width:'100%',
}

const headerText={
  color:'#fff',

}


const formHead={
  color:'#fff',	
  textTransform:'uppercase',
  fontSize: '23px',
  margin: '20px 0 20px 0',
  display: 'block',
  textAlign: 'center',
}

const formHeadAdditional={
  color:'#fff',	
  textTransform:'uppercase',
  fontSize: '16px',
  marginBottom: '20px',
  display: 'block',
  textAlign: 'center',
}

export default ListUsers;