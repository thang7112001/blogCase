import { useContext } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { AuthContext } from "../../contexts/AuthContext";
import CommentList from "../comment/CommentList";
import axios from "axios";
import { URL_POST } from "../../api/url";
import { Link } from "react-router-dom";

export default function BlogItem({ post, onReload }) {
    const { user } = useContext(AuthContext);
    const isOwner = user && user.id === post.authorId;

    const handleDelete = async () => {
        if (window.confirm("Bạn có chắc muốn xoá bài viết?")) {
            await axios.delete(`${URL_POST}/${post.id}`);
            onReload();
        }
    };

    return (
        <Card sx={{ my: 2 }}>
            <CardContent>
                <Typography variant="h5">{post.title}</Typography>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                <Typography variant="caption">Chế độ: {post.visibility}</Typography>
                {isOwner && (
                    <div style={{ marginTop: 8 }}>
                        <Button size="small" color="error" onClick={handleDelete}>Xoá</Button>
                        <Button size="small" component={Link} to={`/edit/${post.id}`}>Sửa</Button>
                    </div>
                )}
                <CommentList post={post} />
            </CardContent>
        </Card>
    );
}
