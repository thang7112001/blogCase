import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Header() {
    const { user, logout } = useContext(AuthContext);

    return (
        <AppBar position="static"
                sx={{
                    color: '#fff',
                    background: 'linear-gradient(90deg, #4A6D8C 0%, #2C3E50 100%)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}
        >
            <Toolbar>
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{
                        flexGrow: 1,
                        textDecoration: 'none',
                        color: 'inherit',
                        fontWeight: 'bold'
                    }}
                >
                    MyBlog
                </Typography>
                <Box>
                    {!user ? (
                        <>
                            <Button color="inherit" component={Link} to="/login" sx={{ mr: 1 }}>
                                Đăng nhập
                            </Button>
                            <Button variant="outlined" color="inherit" component={Link} to="/register">
                                Đăng ký
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant="outlined" color="inherit" component={Link} to="/add" sx={{ mr: 2 }}>
                                Tạo bài viết
                            </Button>
                            <Button color="inherit" component={Link} to="/profile">
                                Hồ sơ
                            </Button>
                            <Button color="inherit" onClick={logout}>
                                Đăng xuất
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}