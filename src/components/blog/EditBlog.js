import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, TextField, MenuItem } from "@mui/material";
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

    const editor = useEditor({ extensions: [StarterKit], content: "" });

    useEffect(() => {
        axios.get(`${URL_POST}/${id}`).then(res => {
            const post = res.data;
            setTitle(post.title);
            setVisibility(post.visibility);
            editor?.commands.setContent(post.content);
            setLoading(false);
        });
    }, [id, editor]);

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

    if (loading) return <p>Đang tải bài viết...</p>;

    return (
        <div>
            <h2>Sửa bài viết</h2>
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
            <EditorContent editor={editor} className="editor" />
            <Button variant="contained" sx={{ mt: 2 }} onClick={handleUpdate}>Cập nhật bài viết</Button>
        </div>
    );
}
