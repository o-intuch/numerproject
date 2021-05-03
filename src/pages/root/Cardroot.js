import React from 'react';
import {
  Card, Button, CardImg,  CardText,CardSubtitle, CardBody, CardDeck
} from 'reactstrap';
import { Link } from 'react-router-dom'
const Cardroot = (props) => {
  return (
    <div className="container">
    <CardDeck>
      <Card>
        <CardImg top width="100%" src="https://www.yu.edu/sites/default/files/math-515606506.jpg?fbclid=IwAR2QJNnSZGhFPpDaXR0sfYXCj1BUtdD90VMlkBLMQaJ6_BF-TGWsQyifV5k"/>
        <CardBody>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Bisection</CardSubtitle>
          <CardText></CardText>
          <Link to="/Bisec" activeClassName="is-active">
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
          <CardSubtitle tag="h6" className="mb-2 text-muted">Flase-position</CardSubtitle>
          <CardText></CardText>
          <Link to="/Flase" activeClassName="is-active">
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
          <CardSubtitle tag="h6" className="mb-2 text-muted">One-point lteration</CardSubtitle>
          <CardText></CardText>
          <Link to="/Onepoint" activeClassName="is-active">
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
          <CardSubtitle tag="h6" className="mb-2 text-muted">Newtonraphson</CardSubtitle>
          <CardText></CardText>
          <Link to="/Newton" activeClassName="is-active">
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
          <CardSubtitle tag="h6" className="mb-2 text-muted">Secant</CardSubtitle>
          <CardText></CardText>
          <Link to="/Secant" activeClassName="is-active">
          <Button renderAs="button"><span>Submit</span></Button>
          </Link>
          
        </CardBody>
      </Card>
    </CardDeck>
    </div>
  );
};

export default Cardroot;