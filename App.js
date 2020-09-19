import React, {useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { db , auth} from './firebase';
import { makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button , Input} from '@material-ui/core';
import ImageUpload from './ImageUpload';
import logo from './dark_logo_transparent_background.png'
import Sidebar from "./Sidebar";


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
})); 

function App() {
  const classes = useStyles();
  const [modalStyle]= useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser); //logged in
        setUser(authUser);

      } else {
        setUser(null);
      }
    })
    return () => {
      unsubscribe();
    }

  }, [user, username]);

  useEffect(()=> {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    }) //changes when doc is modified/added

  }, []);
  const signUp = (event) => {
    event.preventDefault(); 

    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message));
    setOpen(false)
  }
  const signIn = (event) => {
    event.preventDefault();

    auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))
    setOpenSignIn(false);
  }


  return (
    <div className="App">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__form__signup">
            <center>
              <img
                className="app_headerImage"
                src="https://img.icons8.com/ios/26/000000/add-user-male.png"
                alt=""
              />
            </center>
            <Input
              placeholder="Username"
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Input
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>
              Sign up
            </Button>
          </form>
        </div>
      </Modal>
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__form__signin">
            <center>
              <img
                className="signIn_Image"
                src="https://www.freepngimg.com/download/butterfly/19-blue-butterfly-png-image.png"
                alt=""
              />
            </center>

            <Input
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>
              Sign in
            </Button>
          </form>
        </div>
      </Modal>
      <div className="app__header">
        {<img className="app__headerImage" src={logo} alt="" />}
        {user ? (
          <Button onClick={() => auth.signOut()}>Logout</Button>
        ) : (
          <div className="app__loginContainer">
            <Button
              className="sign_in__outside_button"
              onClick={() => setOpenSignIn(true)}
            >
              Sign In
            </Button>
            <Button
              className="sign_up__outside_button"
              onClick={() => setOpen(true)}
            >
              Sign Up
            </Button>
          </div>
        )}
      </div>
      <div className="body_app"> {/* pinterest */}
        <div className="pinterest_left_side">
          <iframe
            title="pin"
            src="https://assets.pinterest.com/ext/embed.html?id=373939575302742141"
            height="454"
            width="236"
            frameborder="0"
            scrolling="no"
          ></iframe>
          <iframe
            title="pin_2"
            src="https://assets.pinterest.com/ext/embed.html?id=846817536178528363"
            height="520"
            width="236"
            frameborder="0"
            scrolling="no"
          ></iframe>
          <iframe
            title="pin_3"
            src="https://assets.pinterest.com/ext/embed.html?id=62206038592218971"
            height="678"
            width="236"
            frameborder="0"
            scrolling="no"
          ></iframe>
          <iframe
            title="pin_4"
            src="https://assets.pinterest.com/ext/embed.html?id=841047299156092284"
            height="425"
            width="236"
            frameborder="0"
            scrolling="no"
          ></iframe>
          <iframe
            title="pin_5"
            src="https://assets.pinterest.com/ext/embed.html?id=844493668233383"
            height="572"
            width="236"
            frameborder="0"
            scrolling="no"
          ></iframe>
        </div>
        <div className="app__posts"> {/* pinterest, posts , and sidebar are side by side*/}
          <div>
            {user?.displayName ? (
              <ImageUpload username={user.displayName} />
            ) : (
              <h3 className="message_to_login">Sign up and log back in to upload and comment</h3>
            )}
          </div>
          <div className="app__postsLeft">
            {posts.map(({ id, post }) => (
              <Post
                key={id}
                postId={id}
                user={user}
                username={post.username}
                caption={post.caption}
                imageUrl={post.imageUrl}
              ></Post>
            ))}
          </div>
        </div>
        <div>
          <Sidebar />    {/* Sidebar */}
        </div>
      </div>
    </div>
  );
}

export default App;
