import React, { Component } from 'react';
import LoadingMask from "react-loadingmask";
import "react-loadingmask/dist/react-loadingmask.css";
import ListUsers from './Components/ListUsers';
import CreateUser from './Components/CreateUser';
import TopNav from './Components/TopNav';
import Documentation from './Components/Documentation';
import './App.css';
require('dotenv').config();


let apiKey='668185276221433622';

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      users:[],
      selectedOption:'',
      loading:true,
    }

    this.reList=this.reList.bind(this);
    this.selectContent=this.selectContent.bind(this);
    this.userDelete=this.userDelete.bind(this);
    this.startLoading=this.startLoading.bind(this);
    this.stopLoading=this.stopLoading.bind(this);
    this.updateStart=this.updateStart.bind(this);
    this.userCreateDone=this.userCreateDone.bind(this);
  }

  //Mounted method
  componentDidMount(){
    console.log('Api url: ' + process.env.REACT_APP_API_URL);
   this.reList();
  }
  //Rendering method
  render() {
    if(this.state.selectedOption === 'listing'){
    return(
      <LoadingMask loading={this.state.loading} text={"let me process you request..."}>
        <div style={logo}><a href="/" ><span style={firstHalf}>APP</span>etite</a></div>
    <div style={appCont} className="App">
      <div className="navigationCont" >
        <TopNav clickHandler={this.selectContent} />
      </div>
        <ListUsers users={this.state.users} removeUser={this.userDelete} updateInformApp={this.updateStart} updComplete={this.stopLoading} />
        <p style={footer}>Development By Zsolt Domjan &#124; <span>Photo by <a href="https://unsplash.com/@enginakyurt?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">engin akyurt</a> on <a href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span></p>
      </div>
      </LoadingMask>
    );
    }else if(this.state.selectedOption === 'createuser'){
      return(
        <LoadingMask loading={this.state.loading} text={"let me process you request..."}>
           <div style={logo}><a href="/" ><span style={firstHalf}>APP</span>etite</a></div>
        <div style={appCont} className="App">
        <div className="navigationCont">
          <TopNav clickHandler={this.selectContent} /> 
        </div>
          <CreateUser confirmUpdate={this.reList} informSending={this.startLoading} sendingFinished={this.userCreateDone}/>
          <p style={footer}>Development By Zsolt Domjan &#124; <span>Photo by <a href="https://unsplash.com/@enginakyurt?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">engin akyurt</a> on <a href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span></p>

        </div>
        </LoadingMask>
      );
    }else if(this.state.selectedOption === 'documentation'){
      return(
        <div>
        <div style={logo}><a href="/" ><span style={firstHalf}>APP</span>etite</a></div>
        <div style={appCont} className="App">
        <div className="navigationCont">
        <TopNav clickHandler={this.selectContent} /> 
        </div>
        <Documentation />
        <p style={footer}>Development By Zsolt Domjan &#124; <span>Photo by <a href="https://unsplash.com/@enginakyurt?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">engin akyurt</a> on <a href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span></p>
        </div>
        </div>
      );
    }else{
      return(
        <div style={appCont} className="App">
           <div style={logo}><a href="/" ><span style={firstHalf}>APP</span>etite</a></div>
        <div className="navigationCont">
          <TopNav clickHandler={this.selectContent} /> 
        </div>
             <div style={mainContent}> 
             <h1 style={mainAppTitle} className="Appetite-Zsolt-Domjan"> Welcome to APPetite</h1>
             <h3 style={subAppTitle}>CREATED WITH APPETITE FOR CODING</h3>
             
             </div>
             <p style={footerMain}>Development By Zsolt Domjan &#124; <span>Photo by <a href="https://unsplash.com/@enginakyurt?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">engin akyurt</a> on <a href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span></p>
        </div>
        
      );
    }
}

//User upload confirmation
userCreateDone=() =>{
  this.stopLoading();
  this.reList();
}

//Loader start
startLoading=() =>{
  this.setState({
    loading:true,
  });
}

//Loader stop
stopLoading=()  =>{
  this.setState({
    loading:false,
  });
}

//Update starting information
updateStart=()  =>{
  this.startLoading();
  this.reList()
}
//Menu selection method
selectContent = (option) =>{
  this.setState({selectedOption:option});
}

//List re-fetching and re-rendering
reList=() =>{
  fetch(process.env.REACT_APP_API_URL + 'index?api_key='+apiKey,{
    method:'GET',
    headers:{
      'Content-Type':'application/json',
      'Accept': 'application/json',
    }
  })
  .then( res => res.json())
  .then(
    (data) =>{
      console.log(data);
      this.setState({
        users:data,
      });
      this.stopLoading()
    },
    (error) =>{
      this.setState({
        isLoaded:true,
        error
      });
      this.stopLoading();
      console.log(error);
    }
  ).then(() => { console.log(this.users)});
}

userDelete=(user) =>{
  let that=this;
  let xhr=new XMLHttpRequest();
  xhr.responseType='text';
 this.startLoading();
  xhr.onload=function(){

     //do some stuffs
     if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {
                console.log('All good \n' + xhr.response);
                let newList = that.state.users.filter((item) => item.id !== user);
                that.setState({
                  users:newList,
                });
                that.stopLoading();
            }else{
                console.log(xhr.responseText);
                that.stopLoading();
            }
     }
 };
 xhr.open('GET',process.env.REACT_APP_API_URL+'remove-user/' + user + '?api_key=' +apiKey,true);
 xhr.setRequestHeader('Accept', 'application/json');
 xhr.send();
}
}


const appCont={
  width:'100%',
  margin:'0',
  height:'100vh',
  backgroundImage:"linear-gradient(rgba(4, 31, 59,0.8),rgba(4, 31, 59,0.8)),url('https://images.unsplash.com/photo-1583744516579-9672cdf19420?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')",
  backgroundSize:'cover',
  overFlow:'scroll',
  backgroundPosition:'center',
  backgroundRepeat:'no-repeat'
}

const logo={
  display:'block',
  position:'absolute',
  top:'18px',
  left:'19px',
  fontSize:'32px',
  color:'#fff',
  fontFamily:'Mr Dafoe, cursive'
}

const firstHalf={
  color:'#e61961',
  

}

const mainContent={
  display:'block',
  position:'absolute',
  top:'27%',
  left:'30%',
  color:'#fff',
  fontFamily:'Nunito,sans-serif',
}

const mainAppTitle={
  fontSize:'75px',
  lineHeight:'70px',
}

const subAppTitle={
  fontSize:'28px',
  lineHeight:'20px',
}

const footer={
  width:'100%',
  color:'#fff',
  textAlign:'center',
  margin:'10px 0',
}

const footerMain={
  width:'100%',
  position:'absolute',
  bottom:'10px',
  color:'#fff',
  textAlign:'center',
}

export default App;
