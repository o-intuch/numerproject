import React, { Component } from "react";
import { Menu, Input, Row, Col, Button, Card, Table } from "antd";
import { Layout, Breadcrumb, Empty } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
const { Header, Content, Footer, Sider } = Layout;
const InputColor = {
  background: "#ffffff",
  color: "black",
};
var api;
var A = [],
  B = [],
  matrixA = [],
  matrixB = [],
  x,
  epsilon,
  dataInTable = [],
  count = 1;
var columns = [
  {
    title: "Iteration",
    dataIndex: "iteration",
    key: "iteration",
  },
];

class Jacobi extends Component {
  constructor() {
    super();
    this.state = {
      row: 0,
      column: 0,
      showDimentionForm: true,
      showDimentionButton: true,
      showMatrixForm: false,
      showMatrixButton: false,
      showOutputCard: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.jacobi = this.jacobi.bind(this);
  }

  jacobi(n) {
    this.initMatrix();
    x = new Array(n);
    var temp;
    var stop = 0;
    var xold = new Array(n);
    epsilon = new Array(n);
    x.fill(0);
    xold.fill(0);
    do {
      temp = [];
      xold = x;
      for (var i = 0; i < n; i++) {
        var sum = 0;
        for (var j = 0; j < n; j++) {
          if (i !== j) {
            //else i == j That is a divide number
            sum = sum + A[i][j] * x[j];
          }
        }
        temp[i] = (B[i] - sum) / A[i][i]; //update x[i]
      }
      x = temp;
      stop++;
    } while (this.error(x, xold) && stop < 100); //if true , continue next iteration
    /*
        
        for (i=0 ; i<x.length ; i++) {
                output.push(x[i]);
                output.push(<br/>);
        }*/
    this.setState({
      showOutputCard: true,
    });
  }
  error(xnew, xold) {
    for (var i = 0; i < xnew.length; i++) {
      console.log(Math.abs((xnew[i] - xold[i]) / xnew[i]));
      if (isNaN(Math.abs((xnew[i] - xold[i]) / xnew[i]))) {
        epsilon[i] = 0;
      } else {
        epsilon[i] = Math.abs((xnew[i] - xold[i]) / xnew[i]);
      }
    }
    console.log("a");
    this.appendTable(x, epsilon);

    for (i = 0; i < epsilon.length; i++) {
      if (epsilon[i] > 0.000001) {
        return true;
      }
    }
    return false;
  }
  createMatrix(row, column) {
    for (var i = 1; i <= row; i++) {
      for (var j = 1; j <= column; j++) {
        matrixA.push(
          <Input
            style={{
              width: "20%",
              height: "50%",
              backgroundColor: "#CCFFFF",
              marginInlineEnd: "5%",
              marginBlockEnd: "5%",
              color: "black",
            }}
            id={"a" + i + "" + j}
            placeholder={"a" + i + "" + j}
          />
        );
      }
      matrixA.push(<br />);
      matrixB.push(
        <Input
          style={{
            width: "20%",
            height: "50%",
            backgroundColor: "#CCFFFF",
            marginInlineEnd: "5%",
            marginBlockEnd: "5%",
            color: "black",
          }}
          id={"b" + i}
          placeholder={"b" + i}
        />
      );
    }

    this.setState({
      showDimentionForm: false,
      showDimentionButton: false,
      showMatrixForm: true,
      showMatrixButton: true,
    });
  }
  initMatrix() {
    for (var i = 0; i < this.state.row; i++) {
      A[i] = [];
      for (var j = 0; j < this.state.column; j++) {
        A[i][j] = parseFloat(
          document.getElementById("a" + (i + 1) + "" + (j + 1)).value
        );
      }
      B.push(parseFloat(document.getElementById("b" + (i + 1)).value));
    }
  }
  async dataapi() {
    await axios({
      method: "get",
      url: "http://localhost:7900/data/jacobi",
    }).then((response) => {
      console.log("response: ", response.data);
      api = response.data;
    });
    await this.setState({
      row: api.row,
      column: api.column,
    });
    matrixA = [];
    matrixB = [];
    await this.createMatrix(api.row, api.row);
    for (let i = 1; i <= api.row; i++) {
      for (let j = 1; j <= api.column; j++) {
        document.getElementById("a" + i + "" + j).value = api.A[i - 1][j - 1];
      }
      document.getElementById("b" + i).value = api.B[i - 1];
    }
    this.jacobi();
  }
  initialSchema(n) {
    for (var i = 1; i <= n; i++) {
      columns.push({
        title: "X" + i,
        dataIndex: "x" + i,
        key: "x" + i,
      });
    }
    for (i = 1; i <= n; i++) {
      columns.push({
        title: "Error" + i,
        dataIndex: "error" + i,
        key: "error" + i,
      });
    }
  }
  appendTable(x, error) {
    var tag = "";
    tag += '{"iteration": ' + count++ + ",";
    for (var i = 0; i < x.length; i++) {
      tag +=
        '"x' +
        (i + 1) +
        '": ' +
        x[i].toFixed(8) +
        ', "error' +
        (i + 1) +
        '": ' +
        error[i].toFixed(8);
      if (i !== x.length - 1) {
        tag += ",";
      }
    }
    tag += "}";
    console.log(tag);
    dataInTable.push(JSON.parse(tag));
    console.log(dataInTable);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <Router>
        <Layout>
          <body  
  
          onChange={this.handleChange}>
            {/*-----------------------------------------ปุ่มINPUTสมการ----------------------------------------------------*/}
            <Row gutter={[40, 40]} onChange={this.handleChange}>
              <Col span={10} offset={7}>
                <div>
                  <h2>Row</h2>
                  <Input size="large" name="row" value={this.state.row}></Input>
                  <h2>Column</h2>
                  <Input
                    size="large"
                    name="column"
                    value={this.state.column}
                  ></Input>
                </div>
                <br></br>
                {this.state.showDimentionButton && (
                  <Button
                    id="dimention_button"
                    onClick={() => {
                      this.createMatrix(this.state.row, this.state.column);
                      this.initialSchema(this.state.row);
                    }}
                    style={{
                      background: "#009933",
                      color: "white",
                      fontSize: "16px",
                      width: "100%",
                      height: "20%",
                    }}
                  >
                    Submit<br></br>
                  </Button>
                )}

                {this.state.showMatrixButton && (
                  <Button
                    id="matrix_button"
                    onClick={() => this.jacobi(parseInt(this.state.row))}
                    style={{
                      background: "#009933",
                      color: "white",
                      fontSize: "16px",
                      width: "100%",
                      height: "20%",
                    }}
                  >
                    Submit
                  </Button>
                )}

                <Button
                  id="submit_button"
                  onClick={() => this.dataapi()}
                  style={{
                    background: "#FFCC00",
                    color: "white",
                    fontSize: "16px",
                    width: "100%",
                    height: "20%",
                  }}
                >
                  API
                </Button>
              </Col>
            </Row>
            <br></br>
            <br></br>
            <Row gutter={[40, 40]}>
              <Col span={8} offset={4}>
                <Card title={<h3>Matrix</h3>}>
                  {this.state.showMatrixForm && <div>{matrixA}</div>}
                </Card>
              </Col>
              <Col span={8}>
                <Card title={<h3>Vector</h3>}>
                  {this.state.showMatrixForm && <div>{matrixB}</div>}
                </Card>
              </Col>
            </Row>
            <br></br>

            {/*---------------------------------------------------------------------------------------------*/}

            <Row gutter={[2, 2]}>
              <Col span={10} offset={2}>
                {this.state.showOutputCard && (
                  <Card
                    title={<h3>Output</h3>}
                    bordered={true}
                    style={{ overflowX: "scroll", width: "200%" }}
                    onChange={this.handleChange}
                    id="answerCard"
                  >
                    <Table
                      columns={columns}
                      dataSource={dataInTable}
                      bodyStyle={{
                        fontSize: "16px",
                        color: "black",
                        border: "2px solid white",
                      }}
                    ></Table>
                  </Card>
                )}
              </Col>
            </Row>
            
          </body>
          
        </Layout>
        
      </Router>
    );
  }
}
export default Jacobi;
