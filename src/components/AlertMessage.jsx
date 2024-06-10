import Alert from 'react-bootstrap/Alert';

export default function AlertMessage({ variant, message }) {
  return (
    <Alert variant={variant}> {message} </Alert>
  );
}
