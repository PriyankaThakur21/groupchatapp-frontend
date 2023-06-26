window.addEventListener('DOMContentLoaded', async ()=>{
    const token = localStorage.getItem('token');
    const groupid = localStorage.getItem('group');
    try{
        const users= await axios.get(`http://localhost:3000/getAllusers/${groupid}`, {headers: {"Authorization": token}});
        console.log(users.data)
        showonscreen(users.data);
    }
        catch(error){
            console.log(error);
        }
})

async function showonscreen(data){
    const a = document.getElementById('block');
    const b = document.getElementById('adminblock');
    a.innerHTML = "";
    for(let i in data.users){
        console.log(data.users[i].userId)
        if(data.users[i].admin===false){
        const user = await axios.get(`http://localhost:3000/getuser/${data.users[i].userId}`);
        a.innerHTML += `<div>${user.data.name}<button onclick=deleteuser(${user.data.id}) class="m-3">Remove</button></div>`;
    }
    else{
        const user = await axios.get(`http://localhost:3000/getuser/${data.users[i].userId}`);
        b.innerHTML += `<div>${user.data.name}---Admin</div>`;
    }
    }
    }

async function deleteuser(userid){
    try{
        console.log(userid)
        const token = localStorage.getItem('token');
        const groupid = localStorage.getItem('group');
        const deleteuser= await axios.delete(`http://localhost:3000/removeMember/${groupid}/${userid}`, {headers: {"Authorization": token}});
        console.log(deleteuser);
        alert(deleteuser.data.message)
    }
    catch(err){
        console.log(err);
    }
}