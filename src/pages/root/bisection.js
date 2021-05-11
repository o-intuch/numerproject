import React from "react";
import { InputGroup, InputGroupAddon, Input, Table } from "reactstrap";
import { Button, Alert } from "reactstrap";
import { evaluate } from "mathjs";
import createPlotlyComponent from "react-plotlyjs";
import Plotly from "plotly.js/dist/plotly-cartesian";
import axios from "axios";

const PlotlyComponent = createPlotlyComponent(Plotly);

class Bisec extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      xl: [],
      xr: [],
      xm: [],
      error: [],
      fxr: [],
      fxl: [],
      fxm: [],
      a: "",
      data: "",
      value: "",
      movie: "",
      apis: [],
    };

    this.Bisection = this.Bisection.bind(this);
    this.xl = this.xl.bind(this);
    this.xr = this.xr.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.plot = this.plot.bind(this);
  }

  handleChange({ target: { value } }) {
    this.setState({ data: value });
    console.log("1245757757575", this.state.value);
  }

  xl({ target: { value } }) {
    //this.setState({x[0]:value})
    this.state.xl[0] = parseFloat(value);
    this.state.xlapi = value;
  }
  xr({ target: { value } }) {
    this.state.xr[0] = parseFloat(value);
    this.state.xrapi = value;
  }

  apinumer = () => {
    axios.get("http://localhost:7879/get/service/numerlast").then((res) => {
      const apis = res.data;
      this.setState({ apis });
    });
  };

  Bisection = (e) => {
    var value = this.state.data;
    var xl = parseFloat(this.state.xl);
    var xr = parseFloat(this.state.xr);
    console.log(xl, xr);
    //console.log("this is value", value);
    var xm = 0,
      xm_old = 0,
      error = 0,
      fxl = 0,
      fxr = 0,
      fxm = 0,
      j = 0,
      fx = "",
      cal;

    if (value != "" && xl != "" && xr != "") {
      do {
        let scp = {
          x: xl,
        };
        console.log(value);
        cal = evaluate(value, scp);
        //console.log("this is fxl:", cal);
        fx = "";
        fxl = 0;
        fxl = parseFloat(cal);
        this.state.fxl[j] = fxl;
        console.log(fxl);
        cal = 0;

        let scp1 = {
          x: xr,
        };
        console.log(value);
        cal = evaluate(value, scp1);
        console.log(cal);
        fx = "";
        fxr = 0;
        fxr = parseFloat(cal);
        this.state.fxr[j] = fxr;
        cal = 0;

        xm = (xr + xl) / 2;

        let scp2 = {
          x: xm,
        };
        console.log(value);
        cal = evaluate(value, scp2);
        console.log(cal);
        fx = "";
        fxm = 0;
        fxm = parseFloat(cal);
        this.state.fxm[j] = fxm;
        cal = 0;

        this.state.xm[j] = xm;
        error = Math.abs((xm - xm_old) / xm);
        this.state.error[j] = error;
        //console.log("error = ", error);
        xm_old = xm;
        //console.log("fxl = ", fxl, "fxm = ", fxm, "fxr = ", fxr);
        console.log(fxm * fxr);
        j++;

        if (error >= 0.00001) {
          if (fxm * fxr < 0) {
            this.state.xl[j] = xm;
            this.state.xr[j] = xr;
            xl = xm;
          } else if (fxm * fxr > 0) {
            this.state.xr[j] = xm;
            this.state.xl[j] = xl;
            xr = xm;
          }
        }

        console.log(
          "xl =",
          this.state.xl[j],
          "xm = ",
          this.state.xm[j - 1],
          "xr = ",
          this.state.xr[j]
        );
      } while (error >= 0.00001);
      this.setState({ data: "" });
    }
    this.plot();
    e.preventDefault();

    const numerdata = {
      bequ: this.state.data,
      bxl: this.state.xlapi,
      bxr: this.state.xrapi,
    };
    axios
      .post("http://localhost:7879/post/service/inputnumer", {
        numerdata,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  };

  plot() {
    const xl_plot = this.state.xl;
    const yl_plot = this.state.fxl;
    const xr_plot = this.state.xr;
    const yr_plot = this.state.fxr;

    var data = [
      {
        type: "scatter",
        x: xl_plot,
        y: yl_plot,
        marker: {
          color: "#0066FF",
        },
        name: "XL",
      },
      {
        type: "scatter",
        x: xr_plot,
        y: yr_plot,
        marker: {
          color: "#FF33FF",
        },
        name: "XR",
      },
    ];
    return data;
  }
  render() {
    let data = this.plot();
    var i = 0;
    var xl = this.state.xl;
    var xr = this.state.xr;
    var xm = this.state.xm;
    var fxl = this.state.fxl;
    var fxr = this.state.fxr;
    var fxm = this.state.fxm;
    var error = this.state.error;
    //  var movie = this.state.data;
    return (
      <div>
        <form action="">
          <header className="header">
            <div className="container">
              <div className="header_area">
                <h1>Bisection Method</h1>
              </div>
            </div>
          </header>

          <h2 className="mt-4">Equation</h2>
          <InputGroup className="mt-4" size="lg">
            <InputGroupAddon addonType="prepend">Equation: </InputGroupAddon>
            <Input onChange={this.handleChange} />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">Xl:</InputGroupAddon>
            <Input onChange={this.xl} />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">Xr:</InputGroupAddon>
            <Input onChange={this.xr} />
          </InputGroup>

          <Button
            className="mt-4"
            color="success"
            type="submit"
            block
            onClick={this.Bisection}
          >
            Submit
          </Button>
          <Button
            className="mt-4"
            color="primary"
            type="api"
            block
            onClick={this.apinumer}
          >
            API
          </Button>
          <div>
            <Alert color="primary">
              <ul>
                {this.state.apis.map((api) => (
                  <li>
                    <h1>Equation = {api.bequ}</h1>
                    <h1>XL = {api.bxl}</h1>
                    <h1>XR = {api.bxr}</h1>
                  </li>
                ))}
              </ul>
            </Alert>
          </div>

          <h2 className="mt-4">Table</h2>
          <Table bordered>
            <thead>
              <tr>
                <th>Iteration</th>
                <th>XL</th>
                <th>XR</th>
                <th>XM</th>
                <th>f(XL)</th>
                <th>f(XR)</th>
                <th>f(XM)</th>
                <th>Error</th>
              </tr>
            </thead>
            <tr>
              <td>
                {xr.map(
                  (x) => (
                    <div>{++i}</div>
                  ),
                  this
                )}
              </td>
              <td>
                {xl.map((xl) => (
                  <div>{xl.toFixed(6)}</div>
                ))}
              </td>
              <td>
                {xr.map(
                  (xr) => (
                    <div>{xr.toFixed(6)}</div>
                  ),
                  this
                )}
              </td>
              <td>
                {xm.map(
                  (xm) => (
                    <div>{xm.toFixed(6)}</div>
                  ),
                  this
                )}
              </td>
              <td>
                {fxl.map(
                  (fxl) => (
                    <div>{fxl.toFixed(6)}</div>
                  ),
                  this
                )}
              </td>
              <td>
                {fxr.map(
                  (fxr) => (
                    <div>{fxr.toFixed(6)}</div>
                  ),
                  this
                )}
              </td>
              <td>
                {fxm.map(
                  (fxm) => (
                    <div>{fxm.toFixed(6)}</div>
                  ),
                  this
                )}
              </td>
              <td>
                {error.map(
                  (er) => (
                    <div>{er.toFixed(6)}</div>
                  ),
                  this
                )}
              </td>
            </tr>
          </Table>

          <h2 className="mt-4">Chart</h2>
          <div style={{ width: "100%", height: "550px", float: "middle" }}>
            <PlotlyComponent className="whatever" data={data} />
          </div>
        </form>
        <br />
      </div>
    );
  }
}
export default Bisec;
