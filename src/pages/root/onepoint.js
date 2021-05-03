import React from "react";
import { InputGroup, InputGroupAddon, Input, Table } from "reactstrap";
import { Button, ButtonGroup } from "reactstrap";
import { evaluate, parse } from "mathjs";
import createPlotlyComponent from "react-plotlyjs";
import Plotly from "plotly.js/dist/plotly-cartesian";

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
  }
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
  };

  plot() {
    const x_plot = this.state.x;
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

          <ButtonGroup>
            <Button
              className="mt-4"
              color="success"
              type="submit"
              onClick={this.OP}
            >
              Submit
            </Button>
          </ButtonGroup>

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
