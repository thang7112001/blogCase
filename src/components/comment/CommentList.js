import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { URL_POST, URL_USER } from "../../api/url";

export default function CommentList({ post }) {
    const { user } = useContext(AuthContext);
    const [content, setContent] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(URL_USER).then(res => setUsers(res.data));
    }, []);

    const handleAdd = async () => {
        if (!content.trim()) return;
        const newComment = {
            id: `c${Date.now()}`,
            userId: user.id,
            content,
            createdAt: new Date().toISOString()
        };

        const updatedPost = {
            ...post,
            comments: [...post.comments, newComment]
        };

        await axios.put(`${URL_POST}/${post.id}`, updatedPost);
        setContent("");
        window.location.reload();
    };

    return (
        <div style={{ marginTop: 12 }}>
            <h4>Bình luận:</h4>
            {post.comments.map(c => {
                const author = users.find(u => u.id === c.userId);
                return <p key={c.id}><strong>{author?.name || "Ẩn danh"}:</strong> {c.content}</p>
            })}
            {user && (
                <>
                    <TextField fullWidth label="Thêm bình luận" value={content} onChange={e => setContent(e.target.value)} />
                    <Button onClick={handleAdd}>Gửi</Button>
                </>
            )}
        </div>
    );
}
