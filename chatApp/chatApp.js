window.addEventListener('DOMContentLoaded', async ()=>{
    try{
    const token = localStorage.getItem('token');
    const users= await axios.get('http://localhost:3000/getAllusers', {headers: {"Authorization": token}});
    console.log(users.data)
    showonscreen(users.data);
}
    catch(error){
        console.log(error);
    }
})

function showonscreen(users){
const a = document.getElementById('block');
a.innerHTML = `<div><p>You joined</p></div>`;
users.forEach(user => {
    a.innerHTML += `<div><p>${user.name} joined</p></div>`;
});
}

async function chat(event){
    event.preventDefault();
    const message = event.target.msg.value;
    const obj ={message};
    try{
        const token = localStorage.getItem('token');
        const post=await axios.post('http://localhost:3000/postmsg', obj, {headers: {"Authorization": token}});
        console.log(post.data);
    }
    catch(err){
        console.log(err);
    }
}