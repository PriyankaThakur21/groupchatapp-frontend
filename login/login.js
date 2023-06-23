async function login(event){
    event.preventDefault()
    const email = event.target.email.value;
    const password = event.target.password.value;
    const obj = {email, password};
    try{
    const post=await axios.post('http://localhost:3000/login',obj);
    alert(post.data);
    location.href='./login.html';
    }
    catch(err){
    console.log(err)
    alert(err.response.data);
    }
    event.target.reset();
}