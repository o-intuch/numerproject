import React from 'react';
import { InputGroup, InputGroupAddon, Input, Table } from 'reactstrap';
import { Button,Alert } from 'reactstrap';
import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-cartesian';
import axios from "axios";

const PlotlyComponent = createPlotlyComponent(Plotly);
const Cramer = (props) => {

    return (
        <div>
            <header className="header">
                <div className="container">
                    <div className="header_area">
                        <h1>Polynomials Regression</h1>
                    </div>
                </div>
            </header>

            <h3 className="mt-4">Equation</h3>
            <InputGroup className="mt-4" size="lg">
                <InputGroupAddon addonType="prepend">Equation: </InputGroupAddon>
                <Input />
            </InputGroup>
            <br />
            <InputGroup>
                <InputGroupAddon addonType="prepend">Xl:</InputGroupAddon>
                <Input />
            </InputGroup>
            <br />
            <InputGroup>
                <InputGroupAddon addonType="prepend">Xr:</InputGroupAddon>
                <Input />
            </InputGroup>

            <Button
            className="mt-4"
            color="success"
            type="submit"
            block
            onClick={this.Bisection}
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
            <h3 className="mt-4">Table</h3>
            <Table bordered>
                <thead>
                    <tr>
                        <th>Iteration</th>
                        <th>X1</th>
                        <th>X2</th>
                        <th>X3</th>
                        <th>Error</th>
                    </tr>
                </thead>
            </Table>

            <h3 className="mt-4">Chart</h3>
            <div
                style={{ width: "100%", height: "550px", float: "middle" }}
            >
                <PlotlyComponent className="whatever" />

            </div>
        </div>
    );

}
export default Cramer;