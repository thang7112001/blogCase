import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { URL_POST } from "../../api/url";
import BlogItem from "./BlogItem";
import { AuthContext } from "../../contexts/AuthContext";

export default function BlogList() {
    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get(URL_POST).then(res => {
            const visiblePosts = res.data.filter(post =>
                post.visibility === "public" || (user && post.authorId === user.id)
            );
            setPosts(visiblePosts);
        });
    }, [user]);

    return (
        <div>
            {posts.map(p => <BlogItem key={p.id} post={p} onReload={() => window.location.reload()} />)}
        </div>
    );
}
