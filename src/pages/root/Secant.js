import React, { Component } from "react";
import { Typography,Table } from "antd";
import { range, compile, evaluate, simplify, parse, abs } from "mathjs";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";
import { Button, ButtonGroup } from "reactstrap";
import createPlotlyComponent from "react-plotlyjs";
import Plotly from "plotly.js/dist/plotly-cartesian";

//import Title from 'antd/lib/skeleton/Title';
var dataGraph = [];
const PlotlyComponent = createPlotlyComponent(Plotly);
const { Title } = Typography;

const columns = [
  {
    title: "Iteration",
    dataIndex: "iteration",
    key: "iteration",
  },
  {
    title: "X1",
    dataIndex: "x1",
    key: "x1",
  },
  {
    title: "X2",
    dataIndex: "x2",
    key: "x2",
  },
  {
    title: "X0",
    dataIndex: "x0",
    key: "x0",
  },
  {
    title: "Error",
    dataIndex: "error",
    key: "error",
  },
];
var dataTable = [];

class Secant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: "large",
      fx: "",
      x1: 0,
      x2: 0,
      x0: 0,
      showTable: false,
      apis: [],
      xlapi: "",
      xrapi: "",
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  Graph(x1, x2) {
    dataGraph = [
      {
        type: "scatter",
        x: x1,
        marker: {
          color: "#a32f0f",
        },
        name: "X1",
      },
      {
        type: "scatter",
        x: x2,
        marker: {
          color: "#3c753c",
        },
        name: "X2",
      },
    ];
  }

  func(x) {
    let scope = { x: parseFloat(x) };
    var expr = compile(this.state.fx);
    return expr.evaluate(scope);
  }

  error(xm, x0) {
    return Math.abs(xm - x0);
  }

  createTable(x1, x2, x0, error) {
    dataTable = [];
    var i = 0;
    for (i = 1; i < error.length; i++) {
      dataTable.push({
        iteration: i,
        x1: x1[i],
        x2: x2[i],
        x0: x0[i],
        error: error[i],
      });
    }
    console.log(x1);
  }

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(this.state);
  };

  onSubmit() {
    var fx = this.state.fx;
    var x1 = this.state.x1;
    var x2 = this.state.x2;
    var xm = 0;
    var check = 0;
    var x0 = 0;
    var i = 0;
    var error = 1;
    var data = [];
    data["x1"] = [];
    data["x2"] = [];
    data["x0"] = [];
    data["error"] = [];
    data["iteration"] = [];

    if (this.func(x1) * this.func(x2) < 0) {
      do {
        x0 =
          (parseFloat(x1) * this.func(x2) - parseFloat(x2) * this.func(x1)) /
          (this.func(x2) - this.func(x1));
        check = this.func(x1) - this.func(x0);
        x1 = x2;
        x2 = x0;
        i++;
        if (check == 0) {
          break;
        }
        xm =
          (parseFloat(x1) * this.func(x2) - parseFloat(x2) * this.func(x1)) /
          (this.func(x2) - this.func(x1));
        error = this.error(xm, x0);

        data["iteration"][i] = i;
        data["x0"][i] = parseFloat(x0).toFixed(6);
        data["x1"][i] = parseFloat(x1).toFixed(6);
        data["x2"][i] = parseFloat(x2).toFixed(6);
        data["error"][i] = error.toFixed(6);

        console.log(data["x1"] + " " + data["x2"]);
      } while (abs(xm - x0) >= error);
    }
    console.log(this.state);
    this.createTable(data["x1"], data["x2"], data["x0"], data["error"]);
    this.setState({ showTable: true, showGrap: true });
    this.Graph(data["x1"], data["x2"]);
    //this.bisection(parseFloat(this.state.xl),parseFloat(this.state.xr));
  }

  render() {
    let layout = {
      title: "Bisection",
      xaxis: {
        title: "X",
      },
    };
    let config = {
      showLink: false,
      displayModeBar: true,
    };

    const { size } = this.state;
    return (
      <div>
        <form action="">
          <header className="header">
            <div className="container">
              <div className="header_area">
                <h1>Secant Method</h1>
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
            <InputGroupAddon addonType="prepend">Xi-1: </InputGroupAddon>
            <Input onChange={this.X} />
          </InputGroup>
          <br />
           <InputGroup>
            <InputGroupAddon addonType="prepend">Xi: </InputGroupAddon>
            <Input onChange={this.X} />
          </InputGroup>

          <Button
            className="mt-4"
            color="success"
            type="submit"
            block
            onClick={this.onSubmit}
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
            <br></br>
            <br></br>
            {this.state.showTable === true ? (
              <div>
                <h2 style={{ textAlign: "center" }}>Table of Secant</h2>
                <h4 style={{ textAlign: "center" }}>
                  {" "}
                  fx = {this.state.fx}
                  <br></br> x(i-1) = {this.state.x1}{" "}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; x(i) = {this.state.x2}
                  <Table
                    columns={columns}
                    dataSource={dataTable}
                    size="middle"
                  />
                </h4>
              </div>
            ) : (
              ""
            )}

            {this.state.showGrap === true ? (
              <PlotlyComponent
                data={dataGraph}
                Layout={layout}
                config={config}
              />
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default Secant;
