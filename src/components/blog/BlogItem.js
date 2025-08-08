import { useContext } from "react";
import { Button, Card, CardContent, Typography, CardActions, Chip, Box } from "@mui/material";
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
        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom>{post.title}</Typography>
                <Box sx={{
                    maxHeight: 100,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    mb: 2,
                    '& *': {
                        fontSize: '1rem !important',
                        fontWeight: 'normal !important'
                    }
                }}>
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </Box>
                <Chip
                    label={post.visibility === 'public' ? 'Công khai' : 'Riêng tư'}
                    size="small"
                    variant="outlined"
                />
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                {isOwner && (
                    <Box>
                        <Button size="small" color="secondary" onClick={handleDelete}>Xoá</Button>
                        <Button size="small" component={Link} to={`/edit/${post.id}`}>Sửa</Button>
                    </Box>
                )}
            </CardActions>
            <CommentList post={post} />
        </Card>
    );
}
