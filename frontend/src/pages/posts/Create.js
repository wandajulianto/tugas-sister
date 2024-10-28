import { useState } from "react";
import { Card, Container, Row, Col, Alert, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {
    // state
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // state validation
    const [validation, setValidation] = useState({});

    const navigate = useNavigate();
    
    // method storePost
    const storePost = async (e) => {
        e.preventDefault();

        // Frontend validation
        const errors = {};
        if (!title) errors.title = "Title is required";
        if (!content) errors.content = "Content is required";

        if (Object.keys(errors).length > 0) {
            setValidation({ errors: Object.entries(errors).map(([param, msg]) => ({ param, msg })) });
            return; // Stop further execution
        }

        // send data to server
        await axios.post('http://localhost:3000/api/posts/store', {
            title: title,
            content: content
        })
        .then(() => {
            // redirect
            navigate('/posts');
        })
        .catch((error) => {
            setValidation(error.response.data);
        });
    };

    return (
        <Container className="mt-3">
            <Row>
                <Col md={12}>
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body>
                            {validation.errors && (
                                <Alert variant="danger">
                                    <ul className='mt-0 mb-0'>
                                        {validation.errors.map((error, index) => (
                                            <li key={index}>{`${error.param}: ${error.msg}`}</li>
                                        ))}
                                    </ul>
                                </Alert>
                            )}

                            <Form onSubmit={storePost}>
                                <Form.Group className="mb-3" controlId="formBasicTitle">
                                    <Form.Label>TITLE</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        value={title} 
                                        onChange={(e) => setTitle(e.target.value)} 
                                        placeholder="Masukan Title" 
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicContent">
                                    <Form.Label>CONTENT</Form.Label>
                                    <Form.Control 
                                        as="textarea" 
                                        rows={3} 
                                        value={content} 
                                        onChange={(e) => setContent(e.target.value)} 
                                        placeholder="Masukan Content" 
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    SIMPAN
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default CreatePost;
