import React, { Component } from 'react';

class Documentation extends Component{
    render (){

       

      return(
        <div style={container}>
        <div style={docContainer} className="documentCont">
        <span style={formHead}>documentation</span>
            <div style={docSegment}>
            <p>This section serves some information of this application built as an assessment task for the Junior Software Developer position with Intouch Games Ltd. The project consists of 2 applications; a laravel application serving as the API endpoint for request processing and data serving, and a front-end platform build in React, which interacts with the API.The data is stored in a third party MYSql server.</p>
            </div>
            <div style={docSegment}>
            <p>In the process of the back-end development I followed the steps below:</p>
            <ul style={List}>
                <li>Evironment Settings</li>
                <li>Customising the User model of the Laravel default structure and setting up/running up the migrations required</li>
                <li>Setting up the API Route pipeline with all required CRUD options</li>
                <li>Creating the Controller object and populate it with the http request handling methods </li>
                <li>Response serving to the client </li>
                <li>Adding the data validation rules and Eloquent data handling to the Controller methods </li>
                <li>Creating a middleware to check the api key passed to the application </li>
                <li>I saved the api key as an environment variable, then by a config option I passed it to the middleware. I'm aware of the fact, that it should be done with the implementation of an authentication platform, such as Passport, but I wanted to focus more on the request handling itself, rather than on authentication systems.  </li>
                <li>Setting up for deployment </li>
                <li>Deploying </li>
            </ul>
            <p>Steps missed:</p>
            <ul style={List}>
                <li>More secure authentication system implementation</li>
                <li>Unit testing: the application is tested manually, but I must confess, unit-test driven coding is one of my weaknesses, but I can promise, that I will get deeper into the topic until we meet face to face. </li>
            </ul>
            </div>
            <div style={docSegment}>
            <p>To serve a ui for testing purposes I made React application, which I deployed on Heroku. Being my first React web application, I'm really happy for this opportunity, as it gives me extra motivation to do things in a new way. </p>
            <p>Here are some details of the API in case you would like to test it from a different script.</p>
            <ul style={List}>
                <li>
                    API Key: I mentioned above, the application does not have an authentication system included, however I set up a middleware object to check any request for the existing api before it's passed.Here is the key: <span style={key}>668185276221433622</span>
                </li>
                <li>
                    User listing url:<span style={key}>
                    https://assessm-app.herokuapp.com/api/index?api_key=668185276221433622
                    </span>
                </li>
                <li>
                    Url for new user creation:<span style={key}>
                    https://assessm-app.herokuapp.com/api/add-user?api_key=668185276221433622
                    </span>
                </li>
                <li>
                    Url with deleting user functionality:<span style={key}>
                    https://assessm-app.herokuapp.com/api/remove-user?api_key=668185276221433622
                    </span>
                </li>
                <li>
                    Updating user data:<span style={key}>
                    https://assessm-app.herokuapp.com/api/update-user?api_key=668185276221433622
                    </span>
                </li>
            </ul>
            </div>
            <div style={docSegment}>
                Front-end technologies used: React, Sass, CSS, VanillaJs.
            </div>
        </div>
        </div>
      );
    };
  
  }

 

  const docContainer={
      display:'block',
      position:'relative',
      width:'68%',
      height:'450px',
      margin:'0 auto',
      overFlow:'hidden',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius:'3px',
        padding:'20px 50px',
  }

  const container={
      position:'relative',
      width:'100%',
      height:'100vh',
      margin:'0',
      paddingTop:'160px'

  }

  const docSegment={
      width:'100%',
      padding:'15px',
      color:'#fff',
      borderBottom:'1px groove #fff'

  }

  const List={
      width:'50%',
      fontSize:'14px'
  }

  const formHead={
    color:'#fff',	
    textTransform:'uppercase',
    fontSize: '23px',
    margin: '20px 0 20px 0',
    display: 'block',
    textAlign: 'center',
  }

  const key={
      color:'#e61961',
  }

  export default Documentation;