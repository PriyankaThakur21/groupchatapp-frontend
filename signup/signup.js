async function signup(event){
    event.preventDefault()
    const name = event.target.name.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value
    const password = event.target.password.value;
    const obj = {name,email, phone,password};
    try{
    const post=await axios.post('http://localhost:3000/signup',obj);
    alert(post.data);
    location.href='./login.html';
    }
    catch(err){
    console.log(err)
    alert(err.response.data);
    }
    event.target.reset();
}