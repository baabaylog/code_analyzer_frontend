import { signIn } from "next-auth/react";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

const GuestView = () => {
  return (
    <Container className="mb-auto mt-5">
      <h2 className="mb-5"> Code Analyzer ( Sign in to get report ) </h2>
      <Row>
        <Col xs={3}>
          <Button variant="dark" onClick={() => signIn()}>
            Sign in using github
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default GuestView;
