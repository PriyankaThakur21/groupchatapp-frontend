
window.addEventListener('DOMContentLoaded', async ()=>{
    const groupid = localStorage.getItem('group');
    try{
    const group= await axios.get(`http://localhost:3000/getgroup/${groupid}`);
    console.log(group.data.groupName)
    const a = document.getElementById('title');
    a.innerHTML ="";
    a.textContent = group.data.groupName;
    getAllusers();
    showScreen();
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

async function showmsgonscreen(msg){
    const msgBox = document.getElementById('block2');
    msgBox.innerHTML=""; 
    for(let i in msg.chat){
        if(msg.chat[i].link===false){
        if(msg.chat[i].userId === msg.id){
                msgBox.innerHTML += `<div style="display:flex; justify-content: flex-end;"><h5>${msg.chat[i].message}</h5></div>`;
        }
        else{
                msgBox.innerHTML += `<div><h5>${msg.chat[i].name}: ${msg.chat[i].message}</h5></div>`;
        }
    }

    if(msg.chat[i].link===true){
        console.log(msg.chat[i])
        if(msg.chat[i].userId === msg.id){
            msgBox.innerHTML += `<div style="display:flex; justify-content: flex-end;"><h5><a href="${msg.chat[i].message}">File</a></h5></div>`;
    }
    else{
            msgBox.innerHTML += `<div><h5>${msg.chat[i].name}: <a href="${msg.chat[i].message}">File</a></h5></div>`;
    }
    }
}
}


async function chat(event){
    event.preventDefault();
    const message = event.target.msg.value;
    const file = event.target.file.value;
    if(message!==""){
    try{
    const obj ={message};
        const token = localStorage.getItem('token');
        const groupid = localStorage.getItem('group');
        const post=await axios.post(`http://localhost:3000/postmsg/${groupid}`, obj, {headers: {"Authorization": token}});
    }
    catch(err){
        console.log(err);
    }
}
    if(file!==""){
        try{
        const obj = {file};
        const token = localStorage.getItem('token');
        const groupid = localStorage.getItem('group');
        console.log('send file')
        const upload=await axios.post(`http://localhost:3000/uploadfile/${groupid}`, obj, {headers: {"Authorization": token}});
        }
        catch(err){
            console.log(err);
        }
    }
    event.target.reset();
}

function showScreen(){
    setInterval(()=>{
        getallmsg()
    },1000)
    }