import React from "react";
import { InputGroup, InputGroupAddon, Input, Table } from "reactstrap";
import { Button, Alert } from "reactstrap";
import { evaluate, parse } from "mathjs";
import createPlotlyComponent from "react-plotlyjs";
import Plotly from "plotly.js/dist/plotly-cartesian";
import axios from "axios";

const PlotlyComponent = createPlotlyComponent(Plotly);

class Onepoint extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "",
      value: "",
      x: [],
      error: [],
      fx: [],
      apis: [],
      xlapi: "",
    };

    this.OP = this.OP.bind(this);
    this.x = this.x.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { value } }) {
    this.setState({ data: value });
    console.log(this.state.data);
  }

  x({ target: { value } }) {
    this.state.x[0] = parseFloat(value);
    this.state.xlapi = value;
  }

  apinumer = (a) => {
    axios.get("http://localhost:7879/get/service/numerlast").then((res) => {
      const apis = res.data;
      this.setState({ apis });
    });
  };

  OP = (e) => {
    var value = this.state.data;
    var x = parseFloat(this.state.x);

    var x_old = 0,
      error = 0,
      fxi = 0;
    var i,
      j = 0,
      fx = "",
      cal;

    do {
      let scp = {
        x: x,
      };
      console.log(value);
      cal = evaluate(value, scp);
      console.log(cal);
      fx = "";
      fxi = 0;
      fxi = parseFloat(cal);
      this.state.fx[j] = fxi;
      console.log(fxi);
      cal = 0;
      x_old = x;
      console.log("x_old = ", x_old);
      x = fxi;
      console.log("x = ", x);

      error = Math.abs((x - x_old) / x);
      this.state.error[j] = error;
      console.log("error = ", error);
      j++;

      if (error >= 0.00001) {
        this.state.x[j] = x;
      }
    } while (error >= 0.00001);
    this.setState({ data: "" });

    e.preventDefault();
    const numerdata = {
      bequ: this.state.data,
      bxl: this.state.xlapi,
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
    const x_plot = this.state.xl;
    const y_plot = this.state.fx;

    var data = [
      {
        type: "scatter",
        x: x_plot,
        y: y_plot,
        marker: {
          color: "#ff6d00",
        },
        name: "X",
      },
    ];
    return data;
  }
  render() {
    let data = this.plot();
    var i = 0;
    var x = this.state.x;
    var fx = this.state.fx;
    var error = this.state.error;
    return (
      <div>
        <form action="">
          <header className="header">
            <div className="container">
              <div className="header_area">
                <h1>One-Point Iteration Method</h1>
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
            <InputGroupAddon addonType="prepend">X:</InputGroupAddon>
            <Input onChange={this.x} />
          </InputGroup>
          <br />

          <Button
            className="mt-4"
            color="success"
            type="submit"
            block
            onClick={this.OP}
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
                    <h1>X = {api.bxl}</h1>
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
                <th>X</th>
                <th>Error</th>
              </tr>
            </thead>
            <tr>
              <td>
                {x.map(
                  (x) => (
                    <div>{++i}</div>
                  ),
                  this
                )}
              </td>
              <td>
                {x.map(
                  (x) => (
                    <div>{x.toFixed(6)}</div>
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
      </div>
    );
  }
}

export default Onepoint;
