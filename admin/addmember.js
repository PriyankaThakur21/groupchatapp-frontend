async function addmember(event){
    try{
    event.preventDefault()
    const userEmail = event.target.email.value;
    const obj = {userEmail};
    const groupid = localStorage.getItem('group');
    const token = localStorage.getItem('token');
    const post=await axios.post(`http://localhost:3000/addmember/${groupid}`,obj, {headers: {"Authorization": token}});
    console.log(post.data)
    alert(post.data.message);
    }
    catch(err){
    console.log(err);
    }
    event.target.reset();
}

