window.addEventListener('DOMContentLoaded', async ()=>{
    const token = localStorage.getItem('token');
    const groupid = localStorage.getItem('group');
    console.log(groupid)
        try{
            const users= await axios.get(`http://localhost:3000/getAllusers/${groupid}`, {headers: {"Authorization": token}});
            console.log(users.data)
            showonscreen(users.data);
            }
        catch(error){
            console.log(error);
                }
        }
)

async function showonscreen(data){
    const a = document.getElementById('block');
    const b = document.getElementById('adminblock');
    a.innerHTML = "";
    b.innerHTML ="";
    for(let i in data.users){
        if(data.users[i].admin===false){
        const user = await axios.get(`http://localhost:3000/getuser/${data.users[i].userId}`);
        a.innerHTML += `<div>${user.data.name}<button onclick=makeAdmin(${user.data.id}) class="ml-5 mb-3">Create Admin</button></div>`;
    }
    else{
        const user = await axios.get(`http://localhost:3000/getuser/${data.users[i].userId}`);
        b.innerHTML += `<div>${user.data.name}--- Group Admin</div>`;
    }
    }
    }

    async function makeAdmin(id){
        console.log(id)
        try{
        const token = localStorage.getItem('token');
        const groupid = localStorage.getItem('group');
        const admin = await axios.get(`http://localhost:3000/makeadmin/${groupid}/${id}`, {headers: {"Authorization": token}});
        console.log(admin.data);
        alert(admin.data.message);
        location.reload();
        }
        catch(err){
            console.log(err);
        }
    }