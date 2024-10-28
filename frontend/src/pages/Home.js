import { Card, Container, Row, Col, Button } from 'react-bootstrap'

function Home() {
    return (
        <Container className='mt-3'>
            <Row>
                <Col md='{12}'>
                    <Card className='border-0 rounded shadow-sm'>
                        <Card.Body className='p-4'>
                            <h1>Sistem Terdistribusi</h1>
                            <p class='lead'>Implementasi Sistem Terdistribusi Pada Aplikasi Microservice</p>
                            <Button href='#' target='_blank' variant='primary' size='lg'>Selengkapnya</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;
