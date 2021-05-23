import React, { Component } from "react";
import { Card, Input, Button, Table } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
var api;
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
class NewtonD extends Component {
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
    this.newton_difference = this.newton_difference.bind(this);
  }
  // 1 เก็บ input ใน x[],y[]
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
      interpolatePoint[i] = parseInt(document.getElementById("p" + i).value);
    }
  }

  C(n) {
    if (n === 1) {
      return 0;
    } else {
      return (
        (y[interpolatePoint[n]] - y[interpolatePoint[n - 1]]) /
          (x[interpolatePoint[n]] - x[interpolatePoint[n - 1]]) -
        this.C(n - 1)
      );
    }
  }
  findX(n, X) {
    if (n < 1) {
      return 1;
    } else {
      console.log(X + " - " + x[interpolatePoint[n]]);
      return (X - x[interpolatePoint[n]]) * this.findX(n - 1, X);
    }
  }
  // ใช้  initialValue() , C(n) , findX(n, X)
  newton_difference(n, X) {
    this.initialValue(); //
    fx = y[1];
    if (n === 2) {
      //if linear interpolate
      fx +=
        ((y[interpolatePoint[2]] - y[interpolatePoint[1]]) /
          (x[interpolatePoint[2]] - x[interpolatePoint[1]])) *
        (X - x[interpolatePoint[1]]);
    } else {
      for (var i = 2; i <= n; i++) {
        fx +=
          (this.C(i) / (x[interpolatePoint[i]] - x[interpolatePoint[1]])) *
          this.findX(i - 1, X);
      }
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
      url: "http://localhost:7900/data/newtondivide",
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
    this.newton_difference(
      parseInt(this.state.interpolatePoint),
      parseFloat(this.state.X)
    );
  }

  render() {
    return (
      <div>
        <h1 style ={{fontSize:'20px'}}> Newton's Divided Differences Interpolation</h1>
        <div className="row">
          <div className="col">
            {/* 1  nPoints  X  interpolatePoint*/}
            {this.state.showInputForm && (
              <form id="inputCard">
                <h4 style ={{fontSize:'16px'}}>
                  Number of points(n) : &nbsp;
                  <Input
                    size="large"
                    name="nPoints"
                    value={this.state.nPoints}
                    style={{ width: 100 }}
                    onChange={this.handleChange}
                  />
                </h4>
                <h4 style ={{fontSize:'16px'}}>
                  X : &nbsp;
                  <Input
                    size="large"
                    name="X"
                    value={this.state.X}
                    style={{ width: 100 }}
                    onChange={this.handleChange}
                  />
                </h4>
                <h4 style ={{fontSize:'16px'}}>
                  interpolatePoint : &nbsp;
                  <Input
                    size="large"
                    name="interpolatePoint"
                    value={this.state.interpolatePoint}
                    style={{ width: 100 }}
                    onChange={this.handleChange}
                  />
                </h4>
                <br></br>
                <Button
                  type="submit"
                  size="large"
                  style={{
                    color: "#ffffff",
                    background: "#009933",
                    width: "100%",
                  }}
                  onClick={() => {
                    this.createTableInput(parseInt(this.state.nPoints));
                    this.createInterpolatePointInput();
                  }}
                >
                  Submit
                </Button>
                
                <Button
                  type="submit"
                  size="large"
                  style={{
                    color: "black",
                    background: "#FFCC00",
                    width: "100%",
                  }}
                  onClick={() => this.dataapi()}
                >
                  API
                </Button>
              </form>
            )}
            {/* 2  tempTag  tableTag*/}
            {this.state.showTableInput && (
              <div>
                <br />
                <Table
                  columns={columns}
                  dataSource={tableTag}
                  pagination={false}
                  bordered={true}
                  bodyStyle={{
                    fontSize: "10px",
                    color: "black",
                    minWidth: 80,
                    maxHeight: 100,
                  }}
                ></Table>
                <br/>
                <h2>
                  InterpolatePoint{" "}
                  {parseInt(this.state.interpolatePoint) === 2? "(Linear)"
                    : parseInt(this.state.interpolatePoint) === 3 ? "(Quadratic)"
                    : "(Polynomial)"}
                </h2>

                {tempTag}
                <Button
                  id="matrix_button"
                  size="large"
                  style={{ width: 150, color: "black", background: "#f7c602" }}
                  onClick={() =>
                    this.newton_difference(
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
          <div>
          {this.state.showOutputCard && (
            <Card
              title={"Output"}
              bordered={true}
              style={{ background: "while", color: "black" }}
            >
              <p style={{ fontSize: "17px", fontWeight: "bold" }}>{fx}</p>
            </Card>
          )}
          </div>
        </div>
      </div>
    );
  }
}
export default NewtonD;
