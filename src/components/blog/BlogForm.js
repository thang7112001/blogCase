import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {Button, TextField, MenuItem, Box, Typography} from "@mui/material";
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
        try {
            const newPost = {
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
        <div>
            <h2>Thêm bài viết</h2>
            <TextField fullWidth label="Tiêu đề" value={title} onChange={e => setTitle(e.target.value)} />
            <TextField
                fullWidth
                select
                label="Chế độ hiển thị"
                value={visibility}
                onChange={e => setVisibility(e.target.value)}
                sx={{ my: 2 }}
            >
                <MenuItem value="public">Public</MenuItem>
                <MenuItem value="private">Private</MenuItem>
            </TextField>
            <Box sx={{ border: '1px solid #ccc', p: 2, borderRadius: 1, minHeight: '150px' }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Nội dung
                </Typography>
                <EditorContent editor={editor} />
            </Box>
            <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>Tạo bài viết</Button>
        </div>
    );
}
