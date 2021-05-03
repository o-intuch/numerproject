import React from 'react';
import {
  Card, Button, CardImg, CardTitle, CardText, CardGroup,
  CardSubtitle, CardBody, CardDeck
} from 'reactstrap';
import { Link } from 'react-router-dom'

const Cardleast = (props) => {
  return (
    <div className="container">
    <CardDeck>
      <Card>
        <CardImg top width="100%" src="https://www.yu.edu/sites/default/files/math-515606506.jpg?fbclid=IwAR2QJNnSZGhFPpDaXR0sfYXCj1BUtdD90VMlkBLMQaJ6_BF-TGWsQyifV5k"/>
        <CardBody>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Linear Regression</CardSubtitle>
          <CardText></CardText>
          <Link to="/LinearRe" activeClassName="is-active">
          <Button renderAs="button"><span>Submit</span></Button>
          </Link>
        </CardBody>
      </Card>
      <div>
        <h1>&nbsp;</h1>
    </div>
      <Card>
        <CardImg top width="100%" src="https://www.yu.edu/sites/default/files/math-515606506.jpg?fbclid=IwAR2QJNnSZGhFPpDaXR0sfYXCj1BUtdD90VMlkBLMQaJ6_BF-TGWsQyifV5k"  />
        <CardBody>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Polynomials Regression</CardSubtitle>
          <CardText></CardText>
          <Link to="/polynomials" activeClassName="is-active">
          <Button renderAs="button"><span>Submit</span></Button>
          </Link>
        </CardBody>
      </Card>
      <div>
        <h1>&nbsp;</h1>
    </div>
      <Card>
        <CardImg top width="100%" src="https://www.yu.edu/sites/default/files/math-515606506.jpg?fbclid=IwAR2QJNnSZGhFPpDaXR0sfYXCj1BUtdD90VMlkBLMQaJ6_BF-TGWsQyifV5k" />
        <CardBody>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Multiple Linear Regression</CardSubtitle>
          <CardText></CardText>
          <Link to="/Multiplelinear" activeClassName="is-active">
          <Button renderAs="button"><span>Submit</span></Button>
          </Link>
        </CardBody>
      </Card>
    </CardDeck>
    </div>
  );
};

export default Cardleast;