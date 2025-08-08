import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, TextField, MenuItem, Box, Typography, Paper, Container } from "@mui/material";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import axios from "axios";
import { URL_POST } from "../../api/url";

export default function BlogForm() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [visibility, setVisibility] = useState("public");

    const editor = useEditor({ extensions: [StarterKit], content: "" });

    const handleSubmit = async () => {
        if (!title.trim() || !editor.getHTML().trim()) {
            alert("Vui lòng nhập tiêu đề và nội dung.");
            return;
        }
        try {
            const newPost = {
                id: `p${Date.now()}`,
                title,
                content: editor.getHTML(),
                visibility,
                authorId: user.id,
                createdAt: new Date().toISOString(),
                comments: []
            };
            await axios.post(URL_POST, newPost);
            navigate("/");
        } catch (err) {
            console.error("Tạo bài viết thất bại", err);
        }
    };

    return (
        <Container maxWidth="md" sx={{ my: 4 }}>
            <Paper elevation={2} sx={{ p: 4 }}>
                <Typography variant="h2" gutterBottom>Thêm bài viết mới</Typography>
                <TextField
                    fullWidth
                    label="Tiêu đề"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    select
                    label="Chế độ hiển thị"
                    value={visibility}
                    onChange={e => setVisibility(e.target.value)}
                    margin="normal"
                >
                    <MenuItem value="public">Công khai</MenuItem>
                    <MenuItem value="private">Riêng tư</MenuItem>
                </TextField>
                <Box sx={{ border: '1px solid #ccc', p: 2, borderRadius: 1, minHeight: 200, my: 2, '& .ProseMirror': { minHeight: 150 } }}>
                    <EditorContent editor={editor} />
                </Box>
                <Button fullWidth variant="contained" size="large" onClick={handleSubmit}>Tạo bài viết</Button>
            </Paper>
        </Container>
    );
}