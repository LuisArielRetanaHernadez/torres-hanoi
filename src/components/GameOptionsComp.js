import { Row, Col, Button } from "react-bootstrap";

const GameOptionsComp = ({amount, reset, solve, updateAmountDisks }) => {
  
  let disks = amount

  return (
    <Row>
      <Col>
        <span>Discos: {amount}</span>
        <Button
          variant="outline-secondary"
          onClick={() => updateAmountDisks(disks++)}
        >
          +
        </Button>
        <Button
          variant="outline-secondary"
          disabled={amount < 3}
          onClick={() => updateAmountDisks(disks--)}
        >
          -
        </Button>
      </Col>
      <Col>
        <Button variant="outline-secondary" onClick={() => reset()}>
          Reiniciar
        </Button>
        <Button variant="outline-secondary" onClick={() => solve()}>
          Resolver
        </Button>
      </Col>
    </Row>
  );
};

export default GameOptionsComp;
