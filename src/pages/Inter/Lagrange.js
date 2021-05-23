import React, { Component } from "react";
import { Card, Input, Button, Table } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
var api;
const InputStyle = {
  background: "#ffffff",
  color: "black",
};
var columns = [
  {
    title: "No.",
    dataIndex: "no",
    key: "no",
  },
  {
    title: "X",
    dataIndex: "x",
    key: "x",
  },
  {
    title: "Y",
    dataIndex: "y",
    key: "y",
  },
];
var x, y, tableTag, interpolatePoint, tempTag, fx;

class Lagrange extends Component {
  constructor() {
    super();
    x = [];
    y = [];
    interpolatePoint = [];
    tempTag = [];
    tableTag = [];
    this.state = {
      nPoints: 0,
      X: 0,
      interpolatePoint: 0,
      showInputForm: true,
      showTableInput: false,
      showOutputCard: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.lagrange = this.lagrange.bind(this);
  }
  // 1 สร้าง input เก็บ input ใน x[],y[]
  createTableInput(n) {
    for (var i = 1; i <= n; i++) {
      x.push(
        <Input
          style={{
            width: "50%",
            height: "40%",
            marginInlineEnd: "5%",
            marginBlockEnd: "5%",
            color: "black",
          }}
          id={"x" + i}
          placeholder={"x" + i}
        />
      );
      y.push(
        <Input
          style={{
            width: "50%",
            height: "40%",
            marginInlineEnd: "5%",
            marginBlockEnd: "5%",
            color: "black",
          }}
          id={"y" + i}
          placeholder={"y" + i}
        />
      );
      tableTag.push({
        no: i,
        x: x[i - 1],
        y: y[i - 1],
      });
    }
    this.setState({
      showInputForm: true,
      showTableInput: true,
    });
  }
  // 1 เก็บ input ใน tempTag[]
  createInterpolatePointInput() {
    for (var i = 1; i <= this.state.interpolatePoint; i++) {
      tempTag.push(
        <Input
          style={{
            width: "10%",
            height: "40%",
            // backgroundColor:"black",
            marginInlineEnd: "5%",
            marginBlockEnd: "5%",
            color: "black",
          }}
          id={"p" + i}
          placeholder={"p" + i}
        />
      );
    }
  }
  initialValue() {
    x = [];
    y = [];
    for (var i = 1; i <= this.state.nPoints; i++) {
      x[i] = parseFloat(document.getElementById("x" + i).value);
      y[i] = parseFloat(document.getElementById("y" + i).value);
    }
    for (i = 1; i <= this.state.interpolatePoint; i++) {
      interpolatePoint[i] = parseFloat(document.getElementById("p" + i).value);
    }
  }

  L(X, index, n) {
    var numerate = 1 /*ตัวเศษ*/,
      denominate = 1; /*ตัวส่วน*/
    for (var i = 1; i <= n; i++) {
      if (i !== index) {
        numerate *= x[i] - X;
        denominate *= x[i] - x[index];
      }
    }
    console.log(numerate / denominate);
    return parseFloat(numerate / denominate);
  }
  // ใช้  L(X, index, n) , initialValue()
  lagrange(n, X) {
    fx = 0;
    this.initialValue();
    for (var i = 1; i <= n; i++) {
      fx += this.L(X, i, n) * y[i];
    }
    this.setState({
      showOutputCard: true,
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  async dataapi() {
    await axios({
      method: "get",
      url: "http://localhost:7900/data/lagrange",
    }).then((response) => {
      console.log("data: ", response.data);
      api = response.data;
    });

    await this.setState({
      nPoints: api.nPoints,
      X: api.X,
      interpolatePoint: api.interpolateinput,
    });
    x = [];
    y = [];
    interpolatePoint = [];
    tempTag = [];
    tableTag = [];

    await this.createInterpolatePointInput();
    await this.createTableInput(api.nPoints);
    for (let i = 1; i <= api.nPoints; i++) {
      document.getElementById("x" + i).value = api.arrayX[i - 1];
      document.getElementById("y" + i).value = api.arrayY[i - 1];
    }
    for (let i = 1; i <= api.interpolateinput; i++) {
      document.getElementById("p" + i).value = api.interpolatePoint[i - 1];
    }
    this.lagrange(
      parseInt(this.state.interpolatePoint),
      parseFloat(this.state.X)
    );
  }

  render() {
    return (
      <div>
        <h1>Lagrange Interpolation</h1>
        <br></br>
        <div className="row">
          <div className="col" onChange={this.handleChange}>
            {this.state.showInputForm && (
              <div>
                <h4>
                  Number of points(n) : &nbsp;
                  <Input
                    size="large"
                    name="nPoints"
                    value={this.state.nPoints}
                    style={{ width: 100 }}
                  ></Input>
                </h4>
                <br />
                <h4>
                  X : &nbsp;
                  <Input
                    size="large"
                    name="X"
                    value={this.state.X}
                    style={{ width: 100 }}
                  ></Input>
                </h4>
                <br />
                <h4>
                  interpolatePoint : &nbsp;
                  <Input
                    size="large"
                    name="interpolatePoint"
                    value={this.state.interpolatePoint}
                    style={{ width: 100 }}
                  ></Input>
                </h4>
                <br />
                <Button
                  id="dimention_button"
                  size="large"
                  onClick={() => {
                    this.createTableInput(parseInt(this.state.nPoints));
                    this.createInterpolatePointInput();
                  }}
                  style={{
                    background: "#009933",
                    color: "white",
                    width: "200%",
                  }}
                >
                  Submit
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                  type="submit"
                  size="large"
                  style={{
                    color: "black",
                    background: "#FFCC00",
                    width: "200%",
                  }}
                  onClick={() => this.dataapi()}
                >
                  API
                </Button>
              </div>
            )}
            {this.state.showTableInput && (
              <div>
                <br />
                <Table
                  columns={columns}
                  dataSource={tableTag}
                  pagination={false}
                  bordered={true}
                  bodyStyle={{
                    color: "white",
                    minWidth: 100,
                    maxHeight: 200,
                  }}
                ></Table>
                <br />
                <h2>
                  interpolatePoint{" "}
                  {parseInt(this.state.interpolatePoint) === 2
                    ? "(Linear)"
                    : parseInt(this.state.interpolatePoint) === 3
                    ? "(Quadratic)"
                    : "(Polynomial)"}
                </h2>
                {tempTag}
                <br />
                <Button
                  id="matrix_button"
                  size="large"
                  style={{ width: 120, background: "#f7c602", color: "black" }}
                  onClick={() =>
                    this.lagrange(
                      parseInt(this.state.interpolatePoint),
                      parseFloat(this.state.X)
                    )
                  }
                >
                  Submit
                </Button>
              </div>
            )}
          </div>
          <br />
          <div className="col">
            {this.state.showOutputCard && (
              <Card
                title={"Output"}
                bordered={true}
                style={{ background: "white ", color: "black" }}
              >
                <p>{fx}</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default Lagrange;
