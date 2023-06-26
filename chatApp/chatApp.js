window.addEventListener('DOMContentLoaded', async ()=>{
    const groupid = localStorage.getItem('group');
    try{
    const group= await axios.get(`http://localhost:3000/getgroup/${groupid}`);
    console.log(group.data.groupName)
    const a = document.getElementById('title');
    a.innerHTML ="";
    a.textContent = group.data.groupName;
    getAllusers();
}
    catch(error){
        console.log(error);
    }
})

async function getAllusers(){
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
}

async function getallmsg(){
    try{
        const token = localStorage.getItem('token');
        const groupid = localStorage.getItem('group');
        const msg = await axios.get(`http://localhost:3000/getmsg/${groupid}`, {headers: {"Authorization": token}});
        console.log(msg.data);
        showmsgonscreen(msg.data);
    }
    catch(err){
        console.log(err);
    }
}

async function showonscreen(data){
const a = document.getElementById('block');
a.innerHTML = "";
a.innerHTML = `<div><p>You joined</p></div>`;
console.group(data.id);
for(let i in data.users){
    if(data.users[i].userId!==data.id){
    const user = await axios.get(`http://localhost:3000/getuser/${data.users[i].userId}`);
    console.log(user.data.name)
    a.innerHTML += `<div><p>${user.data.name} joined</p></div>`;
}
}
getallmsg();
}

function showmsgonscreen(msg){
    const msgBox = document.getElementById('block2');
    msgBox.innerHTML="";
    for(let i in msg.chat){
        if(msg.chat[i].userId === msg.id){
                msgBox.innerHTML += `<div style="display:flex; justify-content: flex-end;"><h5>${msg.chat[i].message}</h5></div>`;
        }
        else{
                msgBox.innerHTML += `<div><h5>${msg.name}: ${msg.chat[i].message}</h5></div>`;
        }
};
}

async function chat(event){
    try{
    event.preventDefault();
    const message = event.target.msg.value;
    const obj ={message};
        const token = localStorage.getItem('token');
        const groupid = localStorage.getItem('group');
        const post=await axios.post(`http://localhost:3000/postmsg/${groupid}`, obj, {headers: {"Authorization": token}});
        showScreen();
        event.target.reset();
    }
    catch(err){
        console.log(err);
    }
}

function showScreen(){
    setInterval(()=>{
        getallmsg()
    },1000)
    }