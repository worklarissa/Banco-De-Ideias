import Card from 'react-bootstrap/Card';

function ArticaleCard() {
  return (
    <>
        <Card style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card content.
            </Card.Text>
            <Card.Link href="#">Card Link</Card.Link>
        </Card.Body>
        </Card>

        <Card style={{ width: '18rem' }}>
        <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card content.
        </Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        </Card.Body>
        </Card>
    </>
  );
}

export default ArticaleCard;