
import './App.css';


import React, {useEffect, useState} from "react";

class CreateUserField extends React.Component {

  onSubmit = event => {
    event.preventDefault();
    const email = this.email.value;
    const password = this.password.value;
    const info = {email: email, password: password};
    
    const requestOptions = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(info)
     };
     fetch('http://localhost:8000/users/', requestOptions)
        .then(response => response.json())

        window.location.reload(false);
  }

  render() {
    return (
        <div className="container">
          <h1>Create New User</h1>

          <hr/>

          <div>
            <form  onSubmit={this.onSubmit}>
              <input
                  type="text"
                  placeholder="Email"
                  ref={input => this.email = input}/>
              <div>
                <input
                    type="text"
                    placeholder="Password"
                    ref={input => this.password = input}/>
              </div>
              <button type="submit" className="btn btn-primary">Save</button>
            </form>
          </div>

          <hr/>

        </div>
    )
  }
}

class CreatePostField extends React.Component {

  onSubmit = event => {
    event.preventDefault();
    const owner_id = this.owner_id.value;
    const title = this.title.value;
    const content = this.content.value;
    const info = {title: title, content: content};
    
    const requestOptions = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(info)
     };
     fetch('http://localhost:8000/users/'+owner_id+'/posts/', requestOptions)
        .then(response => response.json())

        window.location.reload(false);
  }

  render() {
    return (
        <div className="container">
          <h1>Create New Post</h1>

          <hr/>

          <div>
            <form  onSubmit={this.onSubmit}>
              <input
                  type="text"
                  placeholder="User ID"
                  ref={input => this.owner_id = input}/>
              <div>
                <input
                    type="text"
                    placeholder="Title"
                    ref={input => this.title = input}/>
              </div>
              <div>
                <input
                    type="text"
                    placeholder="Content"
                    ref={input => this.content = input}/>
              </div>
              <button type="submit" className="btn btn-primary">Save</button>
            </form>
          </div>

          <hr/>

        </div>
    )
  }
}

class UpdatePostField extends React.Component {

  onSubmit = event => {
    event.preventDefault();
    const post_id = this.post_id.value;
    const title = this.title.value;
    const content = this.content.value;
    const info = {title: title, content: content};
    
    const requestOptions = {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(info)
     };
     fetch('http://localhost:8000/posts.'+ post_id, requestOptions)
        .then(response => response.json())

        window.location.reload(false);
  }

  render() {
    return (
        <div className="container">
          <h1>Update Post</h1>

          <hr/>

          <div>
            <form  onSubmit={this.onSubmit}>
              <input
                  type="text"
                  placeholder="Post ID"
                  ref={input => this.post_id = input}/>
              <div>
                <input
                    type="text"
                    placeholder="Title"
                    ref={input => this.title = input}/>
              </div>
              <div>
                <input
                    type="text"
                    placeholder="Content"
                    ref={input => this.content = input}/>
              </div>
              <button type="submit" className="btn btn-primary">Save</button>
            </form>
          </div>

          <hr/>

        </div>
    )
  }
}

function DeletePost({id}) {
  const deletePost = async () => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }
    await fetch('http://localhost:8000/posts.'+id, requestOptions)
    .then(response => response.json())

    window.location.reload(false);
  }

  return (
    <button onClick={deletePost}>Delete Post</button>
  )
}

function App() {
  const [name, setName] = useState([]);
  const [post, setPost] = useState([]);

  useEffect(() => {
    names()
  }, [])

  const names =async () => {
    const response = await fetch('http://localhost:8000/users/');
    setName(await response.json())
  }

  useEffect(() => {
    posts()
  }, [])

  const posts =async () => {
    const response = await fetch('http://localhost:8000/posts/');
    setPost(await response.json())
  }
  
  return (
    <div className="App">
      <div style={{width: '100%', display: 'table'}}>
        <div style={{display: 'table-row'}}>

          <div style={{display: 'table-cell'}}>
            <CreateUserField></CreateUserField>
            {name.map((data) => {
              return(
                <p style={{fontSize: '1rem'}}> 
                  {"("+data.id+")"} {data.email}
                </p>
              )
            })}
          </div>

          <div style={{display: 'table-cell'}}>
            <h1>Posts</h1>

            <div>

              {post.map((data) => {
                return(
                  <p style={{fontSize: '1rem'}}>
                    {"User ("+data.owner_id+"), Post #"+data.id}<br />

                    <span style={{fontWeight: 'bold'}}> {data.title+" "}</span>
                    {data.content}<br />
                    
                    <DeletePost id={data.id}/>
                  </p>
                )
              })}

            </div>
          </div>

          <div style={{display: 'table-row'}}>
            <div style={{display: 'table-cell'}}>
              <CreatePostField></CreatePostField>
              <UpdatePostField></UpdatePostField>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
export default App;
