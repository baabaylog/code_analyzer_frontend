"use client";
import FetchRepoForm from "@/components/FetchRepoForm";
import GuestView from "@/components/GuestView";
import {  signOut, useSession } from "next-auth/react";
import { Button, Col, Container, Row } from "react-bootstrap";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);

  if (session) {
    return (
      <>
        <Container className="mt-5" >
          <Row className="border rounded p-3">
            <Col xs >
              <h4>Signed in as {session.user.name}</h4>
            </Col>
            <Col>
              <p>
                Email: {session.user.email}
              </p>
            </Col>
            <Col>
              <Button variant="dark" onClick={() => signOut()}>
                Signout
              </Button>
            </Col>
          </Row>
          <Row className="mt-4" >
            <FetchRepoForm/>
          </Row>
        </Container>
      </>
    );
  }

  return <GuestView />;
}
