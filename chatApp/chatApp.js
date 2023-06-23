window.addEventListener('DOMContentLoaded', async ()=>{
    try{
    const token = localStorage.getItem('token');
    const user= await axios.get('http://localhost:3000/getUser', {headers: {"Authorization": token}});
    console.log(user.data)
    showonscreen(user.data.name);
}
    catch(error){
        console.log(error);
    }
})

function showonscreen(name){
const a = document.getElementById('block');
a.innerHTML = `<div><p>${name} joined</p></div>`;
}