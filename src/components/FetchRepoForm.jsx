import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { getRepoFile } from "@/fetchRepoFile";
import AlertMessage from "./AlertMessage";

const FetchRepoForm = () => {
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [repo, setRepo] = useState({
    username: "",
    repo_name: "",
    file_name: "",
    access_token: ""
  });

  useEffect(() => {
    const _repo = localStorage.getItem("_repo");
    if (_repo) {
      setRepo(JSON.parse(_repo));
    }
  }, []);

  const handleFetchReport = async (event) => {
    event.preventDefault(); 
    setLoading(true);

    localStorage.setItem("_repo", JSON.stringify(repo));
    const response = await getRepoFile(repo);

    setAlert(()=>({ variant:response.status ? 'primary' : 'danger' , message:response?.message  }));

    if(response.status) {
      console.log(response);
      setReport(response.report);
    }
    setLoading(false);
  };

  const handleRepoChange = (e) => {
    const { name, value } = e.target;
    setRepo((prevRepo) => ({ ...prevRepo, [name]: value }));
  };

  // Download report
  const downloadReport = () => {
    const blob = new Blob([report], { type: 'text/plain' });

    const link = document.createElement('a');
    link.download = 'report.txt';

    link.href = URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container>
      {/* Show alert message */}
      { alert && <AlertMessage variant={alert.variant} message={alert.message} /> }

      <Row style={{position:'relative'}} >
        { loading && <div style={{position:'absolute', 'width':'100%' , 'height':'100%' , backgroundColor:'#fff' , opacity:'0.7' }} ></div>}

        <Form onSubmit={handleFetchReport}>
          <Form.Group className="mb-3" controlId="fetchRepoForm.Username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              onChange={handleRepoChange}
              value={repo?.username}
              name="username"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="fetchRepoForm.repoName">
            <Form.Label>Repository Name</Form.Label>
            <Form.Control
              type="text"
              onChange={handleRepoChange}
              value={repo?.repo_name}
              name="repo_name"
              rows={3}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="fetchRepoForm.filelName">
            <Form.Label> File Name ( .sol ) </Form.Label>
            <Form.Control
              type="text"
              onChange={handleRepoChange}
              value={repo?.file_name}
              name="file_name"
              rows={3}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="fetchRepoForm.accessToken">
            <Form.Label> Access Token </Form.Label>
            <Form.Control
              type="text"
              onChange={handleRepoChange}
              value={repo?.access_token}
              name="access_token"
              rows={3}
            />
          </Form.Group>

          <Button type="submit" variant="dark" disabled={loading}>  {loading ? "Loading..." : "Get Report"} </Button>
        </Form>
      </Row>

      {/* Show reports */}

      <Row className="my-5">
        <div className="border rounded p-2 mb-3">
          <h2> Report: </h2>
        </div>
        { report && ( <div className="border rounded p-3">
            <div className="p-2 bg-light rounded ">
                { report }
            </div>
            <div className="mt-3" >
              <Button onClick={downloadReport} variant="dark"  > Download report </Button>
            </div>
          </div>)
        }
      </Row>
    </Container>
  );
};

export default FetchRepoForm;
