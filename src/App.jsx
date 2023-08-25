import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Contact from './pages/Contact';
import AddNovel from './pages/AddNovel';
import NovelEdit from './pages/NovelEdit';
import Novel from './pages/Novel';
import Footer from './components/Footer';

function App() {
    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/novel/:id" element={<Novel />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="/profile" element={<PrivateRoute />}>
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                    <Route path="/addnovel" element={<PrivateRoute />}>
                        <Route path="/addnovel" element={<AddNovel />} />
                    </Route>
                    <Route path="/editnovel/:id" element={<NovelEdit />} />
                </Routes>
                <Footer />
            </Router>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    );
}

export default App;
