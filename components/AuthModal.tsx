import { Modal, Button } from 'react-bootstrap';
import { auth, googleProvider, githubProvider } from '../firebase/config';
import { signInWithPopup } from 'firebase/auth';
import { Google, Github } from 'react-icons/fa';

export default function AuthModal({ show, onHide }) {
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onHide();
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const handleGitHubLogin = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      onHide();
    } catch (error) {
      console.error("GitHub login error:", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Get Started</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <Button 
          variant="outline-dark" 
          className="w-100 mb-3 d-flex align-items-center justify-content-center"
          onClick={handleGoogleLogin}
        >
          <Google className="me-2" />
          Continue with Google
        </Button>
        
        <Button 
          variant="outline-dark" 
          className="w-100 d-flex align-items-center justify-content-center"
          onClick={handleGitHubLogin}
        >
          <Github className="me-2" />
          Continue with GitHub
        </Button>
      </Modal.Body>
    </Modal>
  );
}
