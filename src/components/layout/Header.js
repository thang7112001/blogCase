import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Header() {
    const { user, logout } = useContext(AuthContext);

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Blog</Link>
                </Typography>
                {!user ? (
                    <>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/register">Register</Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/add">Tạo bài viết</Button>
                        <Button color="inherit" component={Link} to="/profile">Hồ sơ</Button>
                        <Button color="inherit" onClick={logout}>Logout</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}
