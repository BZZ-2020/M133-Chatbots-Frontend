import {useState} from "react";
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();

        const response = await fetch(`${process.env.REACT_APP_FETCH_CALL_DOMAIN}/auth/login`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({
                'username': username,
                'password': password,
            })
        });

        if (response.ok) {
            window.location.reload();
        } else {
            alert("Sign in failed : " + response.status + " " + response.statusText + " " + JSON.stringify(response.body));
        }
    }

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    return (
        <>
            <h2>Sign In</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsernameSignIn">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" value={username}
                                  onChange={e => setUsername(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formPasswordSignIn">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password}
                                  onChange={e => setPassword(e.target.value)} />
                </Form.Group>

                <Button size="lg" type="submit" disabled={!validateForm()}>
                    Sign in
                </Button>
            </Form>
        </>
    );
}