import React, { Component } from 'react';



class TopNav extends Component{
  constructor(props){
    super(props);
    this.optionClick=this.optionClick.bind(this);
  }


  render (){
    return(
    <ul style={listStyle}>
        <li style={listItem}><span style={listSpan} onClick={() => this.props.clickHandler('createuser')}>Add User</span></li>
        <li style={listItem} onClick={()  => this.props.clickHandler('listing')}><span style={listSpan}>List Users</span></li>
        <li style={listItem} onClick={()  => this.props.clickHandler('documentation')}><span style={listSpan}>Documentation</span></li>
        <li style={listItem}><span style={listSpan}><a href="https://github.com/domjanzsoo/job-assessm" target="_blank" rel="noopener noreferrer">GitHub</a></span></li>
    </ul>
    );
  };
   optionClick=(option)=>{

      this.props.clickHandler(option);
   }
}

const listStyle={
   
}

const listItem={   
    padding:'4px 10px',
    cursor:'pointer',
    listStyle:'none',
    float:'left',
   
    color:'#fff',
    fontSize:'15px',
    fontWeight:'bold',

}

const listSpan={
    
    transition:'0.4s ease',
    borderBottom:'1px solid #fff',
}

export default TopNav;