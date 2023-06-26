async function createGroup(event){
    try{
    event.preventDefault();
    const group = event.target.name.value
    const groupdata = {group};
    const token=localStorage.getItem('token')
    const response = await axios.post('http://localhost:3000/creategroup',groupdata,{headers:{"Authorization":token}})
    console.log(response.data);
    alert('Successfuly created');
    location.href = './groups.html';
    }
    catch(err){
        console.log(err);
    }
}

window.addEventListener('DOMContentLoaded', async ()=>{
    const token = localStorage.getItem('token');
    try{
    const groups= await axios.get('http://localhost:3000/getAllgroups', {headers: {"Authorization": token}});
    console.log(groups.data)
    const element = document.getElementById('block');
    element.innerHTML = "";
    for(let i in groups.data){
    element.innerHTML += `<div><button class="btn-info btn-block btn m-3" onclick=chat(${groups.data[i].id})>${groups.data[i].groupName}</button></div>`;
    }
}
    catch(error){
        console.log(error);
    }
})

function chat(groupid){
    const group = localStorage.setItem('group', groupid);
    location.href = '../chatApp/chatApp.html'
}