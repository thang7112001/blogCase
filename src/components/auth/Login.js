import { useState, useContext } from "react";
import { Button, TextField, Container } from "@mui/material";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { URL_USER } from "../../api/url";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const res = await axios.get(URL_USER);
            const found = res.data.find(u => u.username === username && u.password === password);
            if (found) {
                login(found);
                navigate("/");
            } else {
                alert("Sai tài khoản hoặc mật khẩu");
            }
        } catch (err) {
            console.error("Login failed", err);
        }
    };

    return (
        <Container maxWidth="sm">
            <h2>Đăng nhập</h2>
            <TextField fullWidth label="Username" margin="normal" value={username} onChange={e => setUsername(e.target.value)} />
            <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
            <Button fullWidth variant="contained" onClick={handleSubmit}>Login</Button>
        </Container>
    );
}
