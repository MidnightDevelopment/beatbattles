import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import routes from './pages/routes'
import Create from "./pages/create_battle/Create"
import MainPage from "./pages/MainPage";
import Submission from "./pages/Submission";
import BattleCreated from "./pages/create_battle/BattleCreated";
import Results from "./pages/Results";

const App = () => {
  return (
        <>
            <Route exact path = {routes.landingPage}><MainPage/></Route>
            <Route exact path = {routes.submitBeat}><Submission/></Route>
            <Route exact path = {routes.create}><Create/></Route>
            <Route exact path = {routes.battleCreated}><BattleCreated/></Route>
            <Route exact path = {routes.results}><Results/></Route>
           {/* <Redirect exact path = {routes.landingPage}><MainPage/></Redirect>*/}
        </>

  );
};

export default App;
