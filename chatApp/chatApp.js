window.addEventListener('DOMContentLoaded', async ()=>{
    const token = localStorage.getItem('token');
    try{
    const users= await axios.get('http://localhost:3000/getAllusers', {headers: {"Authorization": token}});
    console.log(users.data)
    showonscreen(users.data);
}
    catch(error){
        console.log(error);
    }
})

async function getallmsg(){
    try{
        const token = localStorage.getItem('token');
        const msg = await axios.get('http://localhost:3000/getmsg', {headers: {"Authorization": token}});
        console.log(msg.data);
        showmsgonscreen(msg.data);
    }
    catch(err){
        console.log(err);
    }
}

function showonscreen(users){
const a = document.getElementById('block');
a.innerHTML = "";
a.innerHTML = `<div><p>You joined</p></div>`;
users.forEach(user => {
    a.innerHTML += `<div><p>${user.name} joined</p></div>`;
});
getallmsg();
}

function showmsgonscreen(msg){
    const msgBox = document.getElementById('block2');
    msgBox.innerHTML="";
    msg.chat.forEach(m => {
        if(m.userId === msg.id){
            msgBox.innerHTML += `<div style="display:flex; justify-content: flex-end;"><h5>${m.message}</h5></div>`;
        }
        else{
            msgBox.innerHTML += `<div><h5>${m.message}</h5></div>`;
        }
});
}

async function chat(event){
    event.preventDefault();
    const message = event.target.msg.value;
    const obj ={message};
    try{
        const token = localStorage.getItem('token');
        const post=await axios.post('http://localhost:3000/postmsg', obj, {headers: {"Authorization": token}});
        showScreen();
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