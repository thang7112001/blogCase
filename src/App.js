import { Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import BlogList from "./components/blog/BlogList";
import BlogForm from "./components/blog/BlogForm";
import EditBlog from "./components/blog/EditBlog";
import UserProfile from "./components/user/UserProfile";
import Header from "./components/layout/Header";

function App() {
  return (
    <>
            <Header />
            <Routes>
                <Route path="/" element={<BlogList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/add" element={<BlogForm />} />
                <Route path="/edit/:id" element={<EditBlog />} />
                <Route path="/profile" element={<UserProfile />} />
            </Routes>
    </>
  )
}

export default App;
