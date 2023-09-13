import './App.css'

import {Switch, Route, Redirect} from 'react-router-dom'

import Home from './Components/Home'
import Jobs from './Components/Jobs'

import DetailedJobDetails from './Components/DetailedJobDetails'

import ProtectedRoute from './Components/ProtectedRoute'

import LogIn from './Components/LogIn'

import NotFound from './Components/NotFound'

// These are the lists used in the application. You can move them to any component needed. import LogIn from './Components/LogIn'

// Replace your code here
const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={LogIn} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={DetailedJobDetails} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </>
)

export default App
