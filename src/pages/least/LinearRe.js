//
import React, { Component } from "react";
import { Card, Input, Button, Table } from "antd";
import "antd/dist/antd.css";
import { inv, multiply, sum } from "mathjs";
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
var x, y, tableTag, answer;

class LinearRe extends Component {
  constructor() {
    super();
    x = [];
    y = [];

    tableTag = [];
    this.state = {
      nPoints: 0,
      // m: 0,
      interpolatePoint: 0,
      showInputForm: true,
      showTableInput: false,
      showOutputCard: false,
    };
    this.handleChange = this.handleChange.bind(this);
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
            justifyContent: "center",
          }}
          id={"x" + i}
          key={"x" + i}
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
          key={"y" + i}
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
  // 2  ประมวลผลต่อ
  initialValue(n) {
    x = new Array(n + 1);
    y = [];
    for (var i = 1; i <= n; i++) {
      x[i] = parseInt(document.getElementById("x" + i).value);
    }
    for (i = 1; i <= n; i++) {
      y[i] = parseFloat(document.getElementById("y" + i).value);
    }
  }
  // 2 ประมวลผลต่อ
  linear(n) {
    var matrixX = [2],
      matrixY = [2],
      exponent = 0;
    for (var i = 0; i < 2; i++) {
      matrixX[i] = [];
      for (var j = 0; j < 2; j++) {
        if (i === 0 && j === 0) {
          matrixX[i][j] = n;
        } else if (i === 0 && j === 1) {
          matrixX[i][j] = this.summation(x, 1);
        } else {
          matrixX[i][j] = this.summation(x, exponent + j);
        }
      }
      exponent++;
    }
    matrixY[0] = sum(y);
    matrixY[1] = this.summationOfTwo(x, y);
    matrixX = inv(matrixX);
    answer = JSON.stringify(multiply(matrixX, matrixY));

    this.setState({
      showOutputCard: true,
    });
  }

  summation(A, exponent) {
    var sum = 0;
    for (var i = 1; i < A.length; i++) {
      sum += Math.pow(A[i], exponent);
    }
    return sum;
  }
  summationOfTwo(A, B) {
    var sum = 0;
    for (var i = 1; i < A.length; i++) {
      sum += A[i] * B[i];
    }
    return sum;
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  async dataapi() {
    await axios({
      method: "get",
      url: "http://localhost:7900/data/linear",
    }).then((response) => {
      console.log("response: ", response.data);
      api = response.data;
    });
    await this.setState({
      nPoints: api.numberpoint,
    });
    await this.createTableInput(api.numberpoint);
    for (let i = 1; i <= api.numberpoint; i++) {
      document.getElementById("x" + i).value = api.arrayX[i - 1];
      document.getElementById("y" + i).value = api.arrayY[i - 1];
    }
    this.initialValue(parseInt(this.state.nPoints));
    this.linear(parseInt(this.state.nPoints));
  }

  render() {
    return (
      <div>
        <h2>Linear Regression</h2>
        <div className="row">
          <div
            className="col"
            onChange={this.handleChange}
            style={{ textAlign: "center", fontSize: "21px" }}
          >
            {this.state.showInputForm && (
              <div>
                <h4>
                  Number of points(n) : &nbsp;&nbsp;
                  <Input
                    name="nPoints"
                    value={this.state.nPoints}
                    size="large"
                    style={{ width: 300 }}
                  ></Input>
                </h4>
                <br />
                <Button
                  id="dimention_button"
                  size="large"
                  onClick={() =>
                    this.createTableInput(parseInt(this.state.nPoints))
                  }
                  style={{
                    background: "#009933",
                    color: "white",
                    width: "100%",
                  }}
                >
                  Submit
                </Button>
                &nbsp;
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
              </div>
            )}

            {this.state.showTableInput && (
              <div>
                {" "}
                <br />
                <Table
                  columns={columns}
                  dataSource={tableTag}
                  pagination={false}
                  bordered={true}
                  bodyStyle={{
                    fontSize: "16px",
                    color: "white",
                    overflowY: "scroll",
                    minWidth: 120,
                    maxHeight: 200,
                  }}
                ></Table>
                <br />
                <Button
                  id="matrix_button"
                  size="large"
                  style={{
                    width: "100%",
                    background: "#f7c602",
                    color: "black",
                  }}
                  onClick={() => {
                    this.initialValue(parseInt(this.state.nPoints));
                    this.linear(parseInt(this.state.nPoints));
                  }}
                >
                  Submit
                </Button>
              </div>
            )}
          </div>
          <br />
        </div>
        {this.state.showOutputCard && (
          <Card
            title={"Output"}
            bordered={true}
            style={{ background: "white ", color: "black" }}
          >
            <p style={{ fontSize: "20px" }}>x = {JSON.stringify(answer)}</p>
          </Card>
        )}
      </div>
    );
  }
}
export default LinearRe;
