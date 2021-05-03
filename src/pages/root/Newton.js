import React, { Component } from "react";
import { Input, Typography, Table } from "antd";
import {
  range,
  compile,
  evaluate,
  simplify,
  parse,
  abs,
  derivative,
} from "mathjs";
import { InputGroup, InputGroupAddon } from "reactstrap";
import { Button, ButtonGroup } from "reactstrap";
import createPlotlyComponent from "react-plotlyjs";
import Plotly from "plotly.js/dist/plotly-cartesian";

// import api from '../api'
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
    title: "X0",
    dataIndex: "x1",
    key: "x1",
  },
  {
    title: "X",
    dataIndex: "x2",
    key: "x2",
  },
  {
    title: "Error",
    dataIndex: "error",
    key: "error",
  },
];
var dataTable = [];

class newton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: "large",
      fx: "",
      x1: 0,
      x2: 0,
      x0: 0,
      showTable: false,
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // componentDidMount = async() => {
  //   await api.getFunctionByName("Newton").then(db => {
  //   this.setState({
  //       fx:db.data.data.fx,
  //       x1:db.data.data.x,
  //   })
  //   console.log(this.state.fx);
  //   console.log(this.state.x0);
  //   console.log(this.state.x1);
  //   })
  // }
  Graph(x1) {
    dataGraph = [
      {
        type: "scatter",
        x: x1,
        marker: {
          color: "#3c753c",
        },
        name: "X1",
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

  createTable(x1, x2, error) {
    dataTable = [];
    var i = 0;
    for (i = 1; i < error.length; i++) {
      dataTable.push({
        iteration: i,
        x1: x1[i],
        x2: x2[i],
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
  Diff = (X) => {
    let scope = { x: X };
    var expr = derivative(this.state.fx, "x");
    return expr.evaluate(scope);
  };

  onSubmit() {
    var fx = this.state.fx;
    var x1 = this.state.x1;
    var x2 = 0;
    var xm = 0;
    var check = 0;
    var x0 = 0;
    var i = 0;
    var error = 1;
    var data = [];
    data["x1"] = [];
    data["x2"] = [];
    data["error"] = [];
    data["iteration"] = [];

    check = this.func(x1) / this.Diff(x1);
    console.log("diff" + " " + this.Diff(x1));
    while (abs(check) >= 0.000001) {
      check = this.func(x1) / this.Diff(x1);
      x2 = x2 - check;
      error = this.error(x2, x1);
      data["iteration"][i] = i;
      data["x1"][i] = parseFloat(x1).toFixed(6);
      data["x2"][i] = parseFloat(x2).toFixed(6);
      data["error"][i] = error.toFixed(6);

      x1 = x2;
      i++;
    }

    console.log(this.state);
    this.createTable(data["x1"], data["x2"], data["error"]);
    this.setState({ showTable: true, showGrap: true });
    this.Graph(data["x1"]);
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
      <form action="">
        <header className="header">
          <div className="container">
            <div className="header_area">
              <h1>Newton Raphson Method</h1>
            </div>
          </div>
        </header>

        <h2 className="mt-4">Equation</h2>
        <InputGroup className="mt-4" size="lg">
          <InputGroupAddon addonType="prepend">Equation: </InputGroupAddon>
          {/* <Input onChange={this.handleChange} /> */}
          <Input />
        </InputGroup>
        <br />
        <InputGroup>
          <InputGroupAddon addonType="prepend">Xi-1: </InputGroupAddon>
          {/* <Input onChange={this.X} /> */}
          <Input />
        </InputGroup>

        <ButtonGroup>
          <Button
            className="mt-4"
            color="success"
            type="submit"
            onClick={this.onSubmit}
          >
            Submit
          </Button>
        </ButtonGroup>

        <div>
          <br></br>
          <br></br>
          {this.state.showTable === true ? (
            <div>
              <h2 style={{ textAlign: "left" }}>Table of Newton Raphson</h2>
              <h4 style={{ textAlign: "left" }}>
                {" "}
                fx = {this.state.fx}
                <br></br> x = {this.state.x1}
                <Table columns={columns} dataSource={dataTable} size="middle" />
              </h4>
            </div>
          ) : (
            ""
          )}
          {this.state.showGrap === true ? (
            <PlotlyComponent data={dataGraph} Layout={layout} config={config} />
          ) : (
            ""
          )}
        </div>
      </form>
    );
  }
}

export default newton;
