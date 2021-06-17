
 // When a Like Button is Clicked
 setTimeout(()=>{
    const likeBtn = document.querySelectorAll('.like-btn')
    const postId = document.querySelectorAll('.post-id')
    console.log(postId)
   for(let i=0;i<likeBtn.length;i++){
     likeBtn[i].addEventListener("click",async(e)=>{
       console.log(postId[i].innerHTML)
     let id=postId[i].innerHTML;
     let data={id}
     
     let options = {
       method: 'PUT',
       headers: {
         'Content-type': 'application/json'
       },
       body: JSON.stringify(data)
     };
     const res = await fetch(`/feed/add_like/${id}`,options);
     
    //  console.log(res, "response from backend for save");
    //  console.log("like saved");
     // function to update like count
     
     await updateLikeCount(i)
     })
   }
   
   
   },3000)
  
   

   // Update Like Counter 
 async function updateLikeCount(i){
    let icon = document.querySelectorAll('.icon')
    // console.log(icon.length)
    // console.log(like[i])
    // console.log(globalPostData[i])
     await getPosts();
    await triggerLike();
    }
  
   // trigger like again without page reload
   async function triggerLike(){
    const likeBtn = document.querySelectorAll('.like-btn')
    const postId = document.querySelectorAll('.post-id')
    console.log(postId)
   for(let i=0;i<likeBtn.length;i++){
     likeBtn[i].addEventListener("click",async(e)=>{
       console.log(postId[i].innerHTML)
     let id=postId[i].innerHTML;
     let data={id}
     
     let options = {
       method: 'PUT',
       headers: {
         'Content-type': 'application/json'
       },
       body: JSON.stringify(data)
     };
     const res = await fetch(`/feed/add_like/${id}`,options);
     
    //  console.log(res, "response from backend for save");
    //  console.log("like saved");
     // 
     
     await updateLikeCount(i)
     })
   }
   }