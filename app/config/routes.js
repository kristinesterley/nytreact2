// Include the React library
var React = require("react");

// Include the react-router module
var router = require("react-router");

// Include the Route component for displaying individual routes
var Route = router.Route;

// Include the Router component to contain all our Routes
// Here where we can pass in some configuration as props
var Router = router.Router;
// Include the hashHistory prop to handle routing client side without a server
// https://github.com/ReactTraining/react-router/blob/master/docs/guides/Histories.md#hashhistory
var browserHistory = router.browserHistory;


// Include the IndexRoute (catch-all route)
var IndexRoute = router.IndexRoute;

// Reference the high-level components
var Main = require("../components/Main");
var Search = require("../components/children/Search");
var Saved = require("../components/children/Saved");
var Results = require("../components/children/Results");


// Export the Routes
module.exports = (

  // The high level component is the Router component
  <Router history={browserHistory}>
    
      <Route path="/" component={Main}>
      <IndexRoute component={Search} />

      {/* children */}
      <Route path="/Search" component={Search} />
      <Route path="/Search/:searchString" component={Results}/>
      <Route path="/Results" component={Results} />
      <Route path="/Saved" component={Saved} />


      {/* If user selects any other path... we get the Search Route */}
      

    </Route>
   </Router>

);