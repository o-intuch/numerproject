import React, { Component } from "react";
import { Card, Input, Button } from "antd";
import "antd/dist/antd.css";
import { det } from "mathjs";
import axios from "axios";
const InputStyle = {
  background: "#ffffff",
  color: "black",
};
var api;
var A = [],
  B = [],
  answer = [],
  matrixA = [],
  matrixB = [];
class cramer extends Component {
  constructor() {
    super();
    this.state = {
      row: parseInt(0),
      column: parseInt(0),
      showDimentionForm: true,
      showDimentionButton: true,
      showMatrixForm: false,
      showMatrixButton: false,
      showOutputCard: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.cramer = this.cramer.bind(this);
  }
  //จะหาค่าไหนเอามาใส่columนั้น
  cramer() {
    this.initMatrix();
    var detA = 0;
    // eslint-disable-next-line eqeqeq
    while (detA != this.state.row) {
      var transformMatrix = JSON.parse(JSON.stringify(A)); //Deep copy
      for (var i = 0; i < this.state.row; i++) {
        for (var j = 0; j < this.state.column; j++) {
          if (j === detA) {
            //หาค่าdeta
            transformMatrix[i][j] = B[i];
            // console.log("trans",transformMatrix[i][j]);
            break;
          }
        }
      }
      detA++; //รอบของจำนวนที่จะoutputออกมา

      //tranforMatrixเอาvectorไปใส่ในcolum
      answer.push(
        <h2>
          X<sub>{detA}</sub>=&nbsp;&nbsp;
          {Math.round(det(transformMatrix)) / Math.round(det(A))}
        </h2>
      );
      console.log("det A", det(A));
    }
    this.setState({
      showOutputCard: true,
    });
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
      matrixA.push(<br />); //เว้นช่อง
      matrixB.push(
        <Input
          style={{
            width: "18%",
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
      showDimentionForm: false, //row+colum
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
        // console.log("matrix A",A[i][j]);
      }
      B.push(parseFloat(document.getElementById("b" + (i + 1)).value));
      //   console.log("matrix B",B);
    }
  }
  async dataapi() {
    await axios({
      method: "get",
      url: "http://localhost:7900/data/cramer",
    }).then((response) => {
      console.log("data: ", response.data);
      api = response.data;
    });

    await this.setState({
      row: api.row,
      column: api.column,
    });
    matrixA = [];
    matrixB = [];
    await this.createMatrix(api.row, api.column);
    for (let i = 1; i <= api.row; i++) {
      for (let j = 1; j <= api.column; j++) {
        document.getElementById("a" + i + "" + j).value = api.A[i - 1][j - 1];
        // console.log("matrix",document.getElementById("a" + i + "" + j).value = api.A[i - 1][j - 1]);
      }
      document.getElementById("b" + i).value = api.B[i - 1];
    }
    this.cramer();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(event.target.value);
  }
  render() {
    return (
      <div className="ContentSheet">
        <div>
          <Card
            title={"Cramer's Rule"}
            bordered={true}
            onChange={this.handleChange}
          >
            {this.state.showMatrixForm && (
              <div>
                <h2>Matrix [A]</h2>
                <br />
                {matrixA}
                <h2>
                  Vector [B]
                  <br />
                </h2>
                {matrixB}
              </div>
            )}

            {this.state.showDimentionForm && (
              <div>
                <h2>Row</h2>
                <Input size="large" name="row" style={InputStyle}></Input>
                <h2>Column</h2>
                <Input size="large" name="column" style={InputStyle}></Input>
              </div>
            )}
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
                  width: "100%",
                  height: "20%",
                }}
              >
                Submit<br></br>
              </Button>
            )}
            {this.state.showMatrixButton && (
              <div>
                <Button
                  id="matrix_button"
                  style={{
                    background: "#009933",
                    color: "white",
                    fontSize: "16px",
                    width: "100%",
                    height: "20%",
                  }}
                  onClick={() => this.cramer()}
                >
                  Submit
                </Button>
                &nbsp;
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
              </div>
            )}
          </Card>
          {this.state.showOutputCard && (
            <Card title={"Output"} bordered={true} onChange={this.handleChange}>
              <p>{answer}</p>
            </Card>
          )}
        </div>
      </div>
    );
  }
}
export default cramer;
