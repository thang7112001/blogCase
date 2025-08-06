import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { TextField, Button, Container } from "@mui/material";
import axios from "axios";
import { URL_USER } from "../../api/url";

export default function UserProfile() {
    const { user, login } = useContext(AuthContext);
    const [name, setName] = useState(user.name);
    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState(user.password);

    const handleUpdate = async () => {
        try {
            const updatedUser = {
                ...user,
                name,
                username,
                password
            };
            await axios.put(`${URL_USER}/${user.id}`, updatedUser);
            login(updatedUser);
            alert("Cập nhật thông tin thành công!");
        } catch (err) {
            console.error("Cập nhật thất bại", err);
        }
    };

    return (
        <Container maxWidth="sm">
            <h2>Thông tin cá nhân</h2>
            <TextField fullWidth label="Họ tên" margin="normal" value={name} onChange={e => setName(e.target.value)} />
            <TextField fullWidth label="Username" margin="normal" value={username} onChange={e => setUsername(e.target.value)} />
            <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
            <Button fullWidth variant="contained" onClick={handleUpdate}>Cập nhật</Button>
        </Container>
    );
}
