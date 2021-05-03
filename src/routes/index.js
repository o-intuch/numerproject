import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Homepage from '../home'
import root from '../pages/root'
import linear from '../pages/linear'
import Inter from '../pages/Inter'
import least from '../pages/least'
import Bisec from '../pages/root/bisection'
import Flase from '../pages/root/Flase'
import Onepoint from '../pages/root/onepoint'
import Newton from '../pages/root/Newton'
import Secant from '../pages/root/Secant'

import Cramer from '../pages/linear/Cramer'
import GuassElimination from '../pages/linear/Guass'
import GuassJordan from '../pages/linear/GuassJordan'
import Lu from '../pages/linear/Lu'
import Cholesky from '../pages/linear/Cholesky'
import Jacobi from '../pages/linear/Jacobi'
import Conjugate from '../pages/linear/Conjugate'

import Newtondivided from '../pages/Inter/Newtondivided'
import Lagrange from '../pages/Inter/Lagrange'
import Spline from '../pages/Inter/Spline'

import polynomials from '../pages/least/Polynomials'
import Multiplelinear from '../pages/least/Multiplelinear'
import LinearRe from '../pages/least/LinearRe'



export default () => (
  <Switch>
    <Route exact path="/" component={Homepage} />

    <Route exact path="/root" component={root} />
    <Route exact path="/bisec" component={Bisec} />
    <Route exact path="/Flase" component={Flase} />
    <Route exact path="/Onepoint" component={Onepoint} />
    <Route exact path="/Newton" component={Newton} />
    <Route exact path="/Secant" component={Secant} />

    <Route exact path="/linear" component={linear} />
    <Route exact path="/Cramer" component={Cramer} />
    <Route exact path="/GuassElimination" component={GuassElimination} />
    <Route exact path="/GuassJordan" component={GuassJordan} />
    <Route exact path="/Lu" component={Lu} />
    <Route exact path="/Cholesky" component={Cholesky} />
    <Route exact path="/Jacobi" component={Jacobi} />
    <Route exact path="/Conjugate" component={Conjugate} />

    <Route exact path="/Inter" component={Inter} />
    <Route exact path="/Newtondivided" component={Newtondivided} />
    <Route exact path="/Lagrange" component={Lagrange} />
    <Route exact path="/Spline" component={Spline} />

    <Route exact path="/Least" component={least} />
    <Route exact path="/LinearRe" component={LinearRe} />
    <Route exact path="/Polynomials" component={polynomials} />
    <Route exact path="/Multiplelinear" component={Multiplelinear} />

  </Switch>
)