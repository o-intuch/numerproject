import React from 'react';
import {
  Card, Button, CardImg, CardText, CardSubtitle, CardBody, CardDeck
} from 'reactstrap';
import { Link } from 'react-router-dom'
const Cardlinear = (props) => {
  return (
    <div className="container">
      <div>
    <CardDeck>
      <Card>
        <CardImg top width="100%" src="https://www.yu.edu/sites/default/files/math-515606506.jpg?fbclid=IwAR2QJNnSZGhFPpDaXR0sfYXCj1BUtdD90VMlkBLMQaJ6_BF-TGWsQyifV5k"/>
        <CardBody>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Cramer's Rule</CardSubtitle>
          <CardText></CardText>
          <Link to="/Cramer" activeClassName="is-active">
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
          <CardSubtitle tag="h6" className="mb-2 text-muted">GuassElimination</CardSubtitle>
          <CardText></CardText>
          <Link to="/GuassElimination" activeClassName="is-active">
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
          <CardSubtitle tag="h6" className="mb-2 text-muted">GuassJordan</CardSubtitle>
          <CardText></CardText>
          <Link to="/Guassjordan" activeClassName="is-active">
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
          <CardSubtitle tag="h6" className="mb-2 text-muted">LU</CardSubtitle>
          <CardText></CardText>
          <Link to="/Lu" activeClassName="is-active">
          <Button renderAs="button"><span>Submit</span></Button>
          </Link>
          
        </CardBody>
      </Card>
      </CardDeck>
      <div>
        <h1>&nbsp;</h1>
    </div>
    <CardDeck>
      <Card>
        <CardImg top width="100%" src="https://www.yu.edu/sites/default/files/math-515606506.jpg?fbclid=IwAR2QJNnSZGhFPpDaXR0sfYXCj1BUtdD90VMlkBLMQaJ6_BF-TGWsQyifV5k" />
        <CardBody>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Cholesky</CardSubtitle>
          <CardText></CardText>
          <Link to="/Cholesky" activeClassName="is-active">
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
          <CardSubtitle tag="h6" className="mb-2 text-muted">Jacobi</CardSubtitle>
          <CardText></CardText>
          <Link to="/Jacobi" activeClassName="is-active">
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
          <CardSubtitle tag="h6" className="mb-2 text-muted">Conjugate</CardSubtitle>
          <CardText></CardText>
          <Link to="/Conjugate" activeClassName="is-active">
          <Button renderAs="button"><span>Submit</span></Button>
          </Link>
        </CardBody>
      </Card>
    </CardDeck>
    </div>
    </div>
  );
};

export default Cardlinear;