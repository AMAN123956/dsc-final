// User Section 
const rightSection = document.querySelector('.right-section')
 
async function getUsers(){
 let userCard=''
   rightSection.innerHTML = ''
  const res = await fetch('/follow/')
  const data = await res.json();
  console.log(data);
  for(let i=0;i<data.length;i++){
   console.log("here")
    if(data[i]._id != userId )
      userCard +=`
      <div class="user-card">
       <button class="follow-btn btn btn-info">
         <i class="fa fa-plus" aria-hidden="true" type="button">Follow</i>
         <span  class="follow-user-id" style="display:none;">${data[i]._id}</span>
       </button>
       <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeLJOzTAW4sn22WgYxepEVozqjZWtyqLGJPQ&usqp=CAU"
            alt="profile_img">
       <h2>${data[i].name}</h2>
     </div>
      `
    }
  
  rightSection.innerHTML= userCard;
  getPosts();
  triggerFollowBtn();
}
// Calling getUsers() function when page loads for the first time
getUsers()


// Follow-btn click functioning 
const followBtn = document.querySelectorAll('.follow-btn')
const followUserId = document.querySelectorAll('.follow-user-id')
for(let i=0;i<followBtn.length;i++){
followBtn[i].addEventListener("click",async(e)=>{
 console.log("click happended")
  let id=followUserId[i].innerHTML;
  let data={id}
  
  let options = {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  const res = await fetch(`/follow/add_follower/${id}`,options);
  // after successful response run 
  await getUsers();
  await getPosts();
  await triggerFollowBtn();
  await triggerLike();
  
})
}

// trigger follow btn
async function triggerFollowBtn(){
 // Follow-btn click functioning 
const followBtn = document.querySelectorAll('.follow-btn')
const followUserId = document.querySelectorAll('.follow-user-id')
for(let i=0;i<followBtn.length;i++){
followBtn[i].addEventListener("click",async(e)=>{
 console.log("click happended")
  let id=followUserId[i].innerHTML;
  let data={id}
  
  let options = {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  const res = await fetch(`/follow/add_follower/${id}`,options);
  // after successful response run 
  await getUsers();
  await getPosts();
  await triggerLike();
})
}

}
