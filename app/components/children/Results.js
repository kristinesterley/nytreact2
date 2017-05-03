// Include React
var React = require("react");
var helpers = require("../utils/helpers");


// This is the Results component. It will be used to show articles resulting from the search.
var Results = React.createClass({
    getInitialState: function() {
    return { 
      message: "Searching...",
      results: []
    };
  },

  componentWillMount: function(){
    console.log("mounting Results component");
    console.log(this.props.params.searchString);

    helpers.runQuery(this.props.params.searchString).then(function(data) {
        if (data !== this.state.results) {
          console.log(data);
          this.setState({ results: data });  
          if (data.length == 0){
            this.setState({ message: "No Articles Found."})
          }

          
        }
        // This code is necessary to bind the keyword "this" when we say this.setState
        // to actually mean the component itself and not the runQuery function.
      }.bind(this));

  },

  saveClick: function(index) {
    var {results} = this.state;
    var selected = results[index];

    var article = {
      title: selected.headline.main,
      url: selected.web_url,
      date: selected.pub_date

    }

    //this code removes the saved artilce from the list, so that user knows that it has saved.
    // behave like moving a file to a different directory

    helpers.postSavedArticle(article);
    var array=this.state.results;
    array.splice(index,1);
    this.setState({results:array});


  },
  // Here we describe this component's render method
  
  render: function() {
    
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Search Results</h3>
        </div>
        <div className="panel-body text-left">

            {/* if we got results back from the search, render those results */}

            {this.state.results.length > 0 &&

              <ul className="list-group">
                {this.state.results.map( function(results, index){
                  // console.log("_id", results._id, index)
                  return <div className="resultList" key={index} >
                      <li className="list-group-item" >
                        <p className="info" style={{fontSize: 25}}>{results.headline.main} ({new Date(results.pub_date).toDateString()})</p>
                        <p>{results.snippet}</p>
                        <a style={{dislay:'inline-block'}} target='_blank' href={results.web_url}>{results.web_url}</a>
                        <br/>
                        <button type="button" className="btn btn-default" style={{marginTop: 15}} onClick={()=>this.saveClick(index)} value={index}>Save</button>
                      </li>
                    </div>
                  }.bind(this))
                }
              </ul>
            }

            {/* if we got no results from the search, render appropriate message */}    
            {this.state.results.length == 0 &&
              <h2>
                {this.state.message}
              </h2>
            } 


        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Results;