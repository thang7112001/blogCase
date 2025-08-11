import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { URL_POST } from "../../api/url";
import BlogItem from "./BlogItem";
import { AuthContext } from "../../contexts/AuthContext";
import {Container, Grid, Typography} from "@mui/material";
import TextType from "../animation/TextAnimation";

export default function BlogList() {
    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get(URL_POST).then(res => {
            const visiblePosts = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).filter(post =>
                post.visibility === "public" || (user && post.authorId === user.id)
            );
            setPosts(visiblePosts);
        });
    }, [user]);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h2">
            <TextType text={["My Blog","Nơi để kết nối và chia sẻ!"]}
                      typingSpeed={100}
                      pauseDuration={1500}
                      showCursor={true}
                      cursorCharacter="_"
                      textColors={['#34495E']}
                      variant
            ></TextType>
            </Typography>
            <Grid container spacing={4}>
                {posts.map(p => (
                    <Grid item xs={12} md={6} key={p.id}>
                        <BlogItem post={p} onReload={() => window.location.reload()} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
