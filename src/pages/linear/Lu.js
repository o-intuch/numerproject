import React, { Component } from "react";
import { Menu, Input, Row, Col, Button, Card, Table } from "antd";
import { Layout, Breadcrumb } from "antd";
import { range, compile, lusolve, format } from "mathjs";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
const { Header, Content, Footer, Sider } = Layout;
const InputStyle = {
  background: "#ffffff",
  color: "black",
};
var api;
var A = [],
  B = [],
  matrixA = [],
  matrixB = [],
  output = [],
  decompose,
  output2 = [];
class LU extends Component {
  constructor() {
    super();
    this.state = {
      row: 0,
      column: 0,
      showDimentionForm: true,
      showDimentionButton: true,
      showMatrixForm: false,
      showMatrixButton: false,
      showOutputCard: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.Lu = this.Lu.bind(this);
  }

  Lu(n) {
    this.initMatrix();
    decompose = lusolve(A, B);
    for (var i = 0; i < decompose.length; i++) {
      output.push(
        <h2>
          X<sub>{i}</sub>=&nbsp;&nbsp;{Math.round(decompose[i])}
        </h2>
      );
      output2.push(
        <h2>
          X<sub>{i}</sub>=&nbsp;&nbsp;{Math.round(decompose[i])}
        </h2>
      );
      output.push(<br />);
      output2.push(<br />);
    }
    console.log(output);
    this.setState({
      showOutputCard: true,
      showMatrixButton: true,
    });
  }

  printFraction(value) {
    return format(value, { fraction: "ratio" });
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
      showoldMatrixButton: false,
    });
  }
  initMatrix() {
    var c = [],
      d = [];
    for (var i = 0; i < this.state.row; i++) {
      c[i] = [];
      for (var j = 0; j < this.state.column; j++) {
        c[i][j] = parseFloat(
          document.getElementById("a" + (i + 1) + "" + (j + 1)).value
        );
      }
      d.push(parseFloat(document.getElementById("b" + (i + 1)).value));
    }
    A = c;
    B = d;
  }
  async dataapi() {
    await axios({
      method: "get",
      url: "http://localhost:7900/data/LU",
    }).then((response) => {
      console.log("response: ", response.data);
      api = response.data;
    });
    await this.setState({
      row: api.row,
      column: api.row,
    });
    matrixA = [];
    matrixB = [];

    await this.createMatrix(api.row, api.row);
    for (let i = 1; i <= api.row; i++) {
      for (let j = 1; j <= api.row; j++) {
        document.getElementById("a" + i + "" + j).value = api.A[i - 1][j - 1];
      }
      document.getElementById("b" + i).value = api.B[i - 1];
    }
    this.Lu(api.row);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  render() {
    return (
      <Layout>
        <body title={"LU"} bordered={true} onChange={this.handleChange}>
          {/*-----------------------------------------ปุ่มINPUTสมการ----------------------------------------------------*/}
          <Row onChange={this.handleChange}>
            <Col>
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
                  onClick={() =>
                    this.createMatrix(this.state.row, this.state.column)
                  }
                  style={{
                    background: "#009933",
                    color: "white",
                    fontSize: "16px",
                    width: "750%",
                    height: "15%",
                  }}
                >
                  Submit<br></br>
                </Button>
              )}

              {this.state.showMatrixButton && (
                <Button
                  id="matrix_button"
                  onClick={() => this.Lu(this.state.row)}
                  style={{
                    background: "#009933",
                    color: "white",
                    fontSize: "16px",
                    width: "750%",
                    height: "15%",
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
                  width: "750%",
                  height: "15%",
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
            <Col span={10} offset={7}>
              <Card
                title={<h3>Output</h3>}
                bordered={true}
                onChange={this.handleChange}
                id="answerCard"
              >
                <p>{output}</p>
              </Card>
            </Col>
          </Row>
        </body>
      </Layout>
    );
  }
}
export default LU;
