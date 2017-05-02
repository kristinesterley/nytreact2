
// Include React
var React = require("react");
import {browserHistory} from 'react-router';
var Results = require("./Results");

// Creating the Search component
var Search = React.createClass({

  // Here we set a generic state associated with the text being searched for
  getInitialState: function() {
    return { 
      searchQuery: "",
      term: "",
      begin: 20170101,
      end: 20171231,

    };
  },

//Note: I had originally called the helpers search method below from compoenentDidUpdate, but I couldn't find a way to 
//pass the array of object sthat were the results to the Results child maintaining the data in an array. The data structure
// changed when it passed through the react route from [Object, Object] to [object Object], [object Object] which .map doesn't like
// so I sent the query string over via params instead. Now the search is run in componentWillMount in the Results component.

  componentDidUpdate: function(prevProps, prevState) {
    // If we have a new search term, run a new search
    if (prevState.searchQuery !== this.state.searchQuery) {
      console.log("UPDATED");
      //send the query to the results module to run
      browserHistory.push('/Search/'+ this.state.searchQuery);
    }
  },

  handleChange: function(event){
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  },

  // When a user submits...
  handleSubmit: function(event) {
    // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
    // clicking the button
    event.preventDefault();
    var newQuery = "&q="+this.state.term+"&begin_date="+this.state.begin+"&end_date="+this.state.end;
   
    this.setState ({
      searchQuery: newQuery
    });
  },

  // Here we describe this component's render method
  render: function() {
    return (
      <div>
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Search</h3>
        </div>
        <div className="panel-body text-center">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <h4 className="">
                <strong>Topic</strong>
              </h4>
              <input
                type="text"
                onChange={this.handleChange}
                className="form-control text-left"
                id="term"
                required
              />
            <div className="row">
              <div className="col-md-6">
                 <h4 className="">
                      <strong>Start Date (YYYYMMDD)</strong>
                    </h4>
                    <input
                      value={this.state.begin}
                      onChange={this.handleChange}
                      type="number"
                      className="form-control text-center"
                      id="begin"
                      required
                    />
               </div> 
               <div className="col-md-6">     
                <h4 className="">
                  <strong>End Date (YYYYMMDD)</strong>
                </h4>
                <input
                  value={this.state.end}
                  onChange={this.handleChange}
                  type="number"
                  className="form-control text-center"
                  id="end"
                  required
                />  
                </div> 
              </div>  

              <br />
              <button
                className="btn btn-primary"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>


      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Search;
