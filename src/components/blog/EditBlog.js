import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {Button, TextField, MenuItem, Typography, Box, CircularProgress, Container, Paper} from "@mui/material";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import axios from "axios";
import { URL_POST } from "../../api/url";

export default function EditBlog() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [visibility, setVisibility] = useState("public");
    const [loading, setLoading] = useState(true);
    const [postContent, setPostContent] = useState('');

    const editor = useEditor({ extensions: [StarterKit], content: "" });

    useEffect(() => {
        axios.get(`${URL_POST}/${id}`).then(res => {
            const post = res.data;
            setTitle(post.title);
            setVisibility(post.visibility);
            setPostContent(post.content);
            setLoading(false);
        });
    }, [id]);
    useEffect(() => {
        if (editor && postContent){
            editor.commands.setContent(postContent);
        }
    }, [editor,postContent]);
    const handleUpdate = async () => {
        try {
            const updatedPost = {
                title,
                content: editor.getHTML(),
                visibility
            };
            await axios.patch(`${URL_POST}/${id}`, updatedPost);
            navigate("/");
        } catch (err) {
            console.error("Cập nhật bài viết thất bại", err);
        }
    };

    if (loading) return ( <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
    </Box>);

    return (
        <Container maxWidth="md" sx={{ my: 4 }}>
            <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 } }}>
                <Typography variant="h2" gutterBottom>Sửa bài viết</Typography>
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
                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, color: 'text.secondary', fontWeight: 'bold' }}>
                    Nội dung
                </Typography>
                <Box sx={{
                    border: '1px solid #ddd',
                    borderRadius: 1,
                    p: 2,
                    minHeight: 250,
                    '& .ProseMirror': {
                        minHeight: 200,
                        outline: 'none',
                    }
                }}>
                    <EditorContent editor={editor} />
                </Box>
                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{ mt: 3 }}
                    onClick={handleUpdate}
                >
                    Cập nhật bài viết
                </Button>
            </Paper>
        </Container>
    );
}
