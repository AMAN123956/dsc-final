  
// When Page Loads
 // getPosts() function is called first time
 const feedContainer = document.querySelector(".feed-container")
 let like=[]
 let globalPostData=""
  async function getPosts() {
    let feedCard="";
    feedContainer.innerHTML="";
    const res = await fetch('/feed/')
    const data = await res.json()
    console.log('data'+data.length);
    globalPostData=data
    if (data != "") {
      for (let i = data.length-1; i >= 0; i--) {
        // To solve problem of user uploading various combinations.(text and image || text || image)
        // Conditioning used
        
        if (data[i].imageUrl == '' && data[i].textPost != '') {
          feedCard+=` 
         
          <div class="cardbox bg-white">
          <div class="cardbox-heading">
         <div class="media m-0">
          <div class="d-flex mr-3">
         <a href=""><img class="img-fluid rounded-circle" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU" alt="User"></a>
          </div>
          <div class="media-body">
           <p class="m-0 text-primary">${data[i].name}</p>
           <small><span><i class="icon ion-md-time"></i>  ${data[i].date.split('T')[0]}</span></small>
          </div>
         </div><!--/ media -->
        </div><!--/ cardbox-heading -->
         
        <div class="cardbox-item">
        <p>${data[i].textPost}</p>
        </div><!--/ cardbox-item -->
        <div class="cardbox-base">
         <ul>
          <li><a href="#" type="button" class="like-btn"><i class="icon fa fa-heart" aria-hidden="true"></i></a></li>
          <li><a><span>${data[i].likes.length}</span><span class="post-id" style="display:none;">${data[i]._id}</span></a></li>
         </ul>			   
        </div><!--/ cardbox-base -->
        </div><!--/ cardbox -->
        `
        }
        else {
          feedCard+=` 	
       <div class="cardbox bg-white">
         <div class="cardbox-heading">
         <div class="media m-0">
          <div class="d-flex mr-3">
         <a href=""><img class="img-fluid rounded-circle" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU" alt="User"></a>
          </div>
          <div class="media-body">
           <p class="m-0 text-primary">${data[i].name}</p>
           <small><span><i class="icon ion-md-time"></i>  ${data[i].date.split('T')[0]}</span></small>
          </div>
         </div><!--/ media -->
        </div><!--/ cardbox-heading -->
         
        <div class="cardbox-item">
        <img class="cardbox-item img" src="${data[i].imageUrl}" alt="post-image">
        <p>${data[i].textPost}</p>
        </div><!--/ cardbox-item -->
        <div class="cardbox-base">
         <ul>
          <li><a href="#" type="button" class="like-btn"><i class="icon fa fa-heart" aria-hidden="true"></i></a></li>
          <li><a><span>${data[i].likes.length}</span><span class="post-id" style="display:none;">${data[i]._id}</span></a></li>
         </ul>			   
        </div><!--/ cardbox-base -->
        </div><!--/ cardbox -->`
        }            
       
        console.log('data',data[i].likes.length)
        like.push(data[i].likes.length)
      }
     feedContainer.innerHTML = feedCard
    }
    else{
        feedContainer.innerHTML = `<h2 class="text-danger display-5 my-5" style="text-align:center;">
      No Feeds To Show! Follow Users</h2>`
    }
    
    
  }
  getPosts();

// When a Post is submitted 
// @desc: Making an asynchronous post request to update database 
  const submitBtn = document.getElementById('submit-btn');

  submitBtn.addEventListener("click", async (e) => {
    const textPost = document.getElementById('text-post').value;
    console.log("imgurl" + imageUrl)
    let data = {
      textPost,
      imageUrl
    }
    let options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    let res = await fetch(`/feed/`, options);
    alert("Your Post Saved!!!")
    document.getElementById('text-post').value="";
    // make imageUrl of cloudinary null after save
    imageUrl="";
    // calling getPosts() again to dynamically change the feed cards
    await getPosts();
    await triggerLike();
    
  })