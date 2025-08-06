import { useState } from "react";
import { TextField, Button, Container } from "@mui/material";
import axios from "axios";
import { URL_USER } from "../../api/url";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const newUser = {
                id: `u${Date.now()}`,
                name,
                username,
                password
            };
            await axios.post(URL_USER, newUser);
            alert("Đăng ký thành công!");
            navigate("/login");
        } catch (err) {
            console.error("Đăng ký thất bại", err);
        }
    };

    return (
        <Container maxWidth="sm">
            <h2>Đăng ký</h2>
            <TextField fullWidth label="Họ tên" margin="normal" value={name} onChange={e => setName(e.target.value)} />
            <TextField fullWidth label="Username" margin="normal" value={username} onChange={e => setUsername(e.target.value)} />
            <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
            <Button fullWidth variant="contained" onClick={handleRegister}>Đăng ký</Button>
        </Container>
    );
}
