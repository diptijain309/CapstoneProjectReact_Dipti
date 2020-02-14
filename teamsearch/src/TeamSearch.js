import React, { Component } from 'react';

class TeamSearch extends React.Component {
    state = {
      query: "",
      data: [],
      text:"",
      filteredData: []
    };
  
    handleInputChange = event => {
      const query = event.target.value;
      var arr=query.split(" ");

      this.setState(prevState => {
        var filteredData = prevState.data.filter(element => {
          return (
            element.fname.toLowerCase().includes(query.toLowerCase()) ||
            element.lname.toLowerCase().includes(query.toLowerCase())||
            element.role.toLowerCase().includes(query.toLowerCase())||
            element.product.toLowerCase().includes(query.toLowerCase())||
            element.scrumteamname.teamname.toLowerCase().includes(query.toLowerCase())
                );
        });
        if(arr.length > 1){
        filteredData = prevState.filteredData.filter(element => {
          return (
            element.lname.toLowerCase().includes(arr[1].toLowerCase())
             );
        });
      }
        if(query === ""){
          
          this.setState({filteredData: []})
          this.setState({query:""})
          return query, filteredData
        }
        else{
          return {
          query,
          filteredData
        };
      }   
      }); 
    };

    inputSubmit= event => {
      console.log("Enter event")
      this.setState({text: ''});
  }

    handleKeyDown= event => {
      if (event.keyCode === 13 ) {
        console.log("event.keyCode" +event.keyCode)
        event.preventDefault();
          return this.inputSubmit();
      }
  }

    getData = () => {
      fetch(`http://localhost:7778/searchteams`)
        .then(response => response.json())
        .then(data => {
          const { query } = this.state;        
          this.setState({
            data          
            });
        
        });
    };
  
    UNSAFE_componentWillMount() {
      this.getData();
    }
  
    renderTableHeader() {
      if(this.state.query !== ""){
      return (
     <tr><th>First Name</th><th>Last Name</th><th>Role</th><th>Product</th><th>Scrum Team</th></tr>)
      }}

   renderTableData() {
    return this.state.filteredData.map(i =>       
      <tr>
         <td>{i.fname}</td>
         <td>{i.lname}</td>
         <td>{i.role}</td>
         <td>{i.product}</td>
         <td>{i.scrumteamname.teamname}</td>
      </tr>)}

    render() {
      return (
        <body>
        <div>
        <h2 class="top">John Deere Teams</h2>    
        <img  class="top" id="jdlogo" alt="John Deere" title="John Deere" src={ require('./JohnDeereLogo.png')} />
        </div>
        <br/>
        <div id="pagebreak"><hr /></div>
        <div class="searchForm" >   
        <br/>
       <input type="text" class="searchTerm" placeholder=" Search for first name, last name, role, product, scrum teams..."  value={this.state.query} 
             onChange={this.handleInputChange}
              onKeyDown={this.handleKeyDown}/>    
     <br/>
     <br/>
        <div>
          <table border="1" class="datatable">
            <tbody> {this.renderTableHeader()}</tbody> 
                    {this.renderTableData()}
          </table>
          </div>
        </div> 
        </body> 
      );
    }
  }

  export default TeamSearch;
