import React from 'react';
import {
  Card, Button, CardImg, CardTitle, CardText, CardGroup,
  CardSubtitle, CardBody, CardDeck
} from 'reactstrap';
import { Link } from 'react-router-dom'

const CardInter = (props) => {
  return (
    <div className="container">
    <CardDeck>
      <Card>
        <CardImg top width="100%" src="https://www.yu.edu/sites/default/files/math-515606506.jpg?fbclid=IwAR2QJNnSZGhFPpDaXR0sfYXCj1BUtdD90VMlkBLMQaJ6_BF-TGWsQyifV5k"/>
        <CardBody>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Newton divided-differences</CardSubtitle>
          <CardText></CardText>
          <Link to="/Newtondivided" activeClassName="is-active">
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
          <CardSubtitle tag="h6" className="mb-2 text-muted">Lagrange polynomials</CardSubtitle>
          <CardText></CardText>
          <Link to="/Lagrange" activeClassName="is-active">
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
          <CardSubtitle tag="h6" className="mb-2 text-muted">Spline interpolation</CardSubtitle>
          <CardText></CardText>
          <Link to="/Spline" activeClassName="is-active">
          <Button renderAs="button"><span>Submit</span></Button>
          </Link>
        </CardBody>
      </Card>
    </CardDeck>
    </div>
  );
};

export default CardInter;