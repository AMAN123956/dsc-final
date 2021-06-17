  
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
          feedCard += `
                        <div class="feed-card">
                          <i class="fa fa-user-circle-o" style="font-size:1.5rem;" aria-hidden="true">${data[i].name}</i>
                          <span class="date">
                            <i style="float:right;margin-top:-25px;" 
                            class="fa fa-calendar" aria-hidden="true">
                            ${data[i].date.split('T')[0]}</i></span>
                              <h2 class="feed-text">${data[i].textPost}</h2>
                              <div class="bottom-section">
                                <button class="like-btn btn-primary "><i class="icon fa fa-heart" aria-hidden="true">${data[i].likes.length}</i><span class="post-id" style="display:none;">${data[i]._id}</span></button>
                              </div>
                        </div>
                        `
            
        }
        else if (data[i].imageUrl != '' && data[i].textPost == '') {
          feedCard += `
                        <div class="feed-card">
                          <i class="fa fa-user-circle-o" style="font-size:1.5rem;" aria-hidden="true">${data[i].name}</i>
                          <span class="date ">
                            <i style="float:right;margin-top:-25px;" 
                            class="fa fa-calendar" aria-hidden="true">
                            ${data[i].date.split('T')[0]}</i></span>
                          <img src="${data[i].imageUrl}" alt="feed_img" class="feed-card-img">
                              <div class="bottom-section">
                                <button class="like-btn btn-primary "><i class="icon fa fa-heart" aria-hidden="true">${data[i].likes.length}</i><span class="post-id" style="display:none;">${data[i]._id}</span></button>
                              </div>
                        </div>
                        `
            
        }

        /*Case when text is not entered by user */
        else if (data[i].imageUrl != '' && data[i].textPost != '') {
          feedCard += `
                        <div class="feed-card">
                            <i class="fa fa-user-circle-o" style="font-size:1.5rem;"
                            aria-hidden="true">${data[i].name}
                            </i>
                            <span class="date ">
                            <i style="float:right;margin-top:-25px;" 
                            class="fa fa-calendar" aria-hidden="true">
                            ${data[i].date.split('T')[0]}</i></span>
                            <img src="${data[i].imageUrl}" alt="feed_img" class="feed-card-img">
                            <h2 class="feed-text my-4">${data[i].textPost}</h2>
                            <button class="like-btn btn-primary"><i class="icon fa fa-heart" aria-hidden="true">${data[i].likes.length}</i><span class="post-id" style="display:none;">${data[i]._id}</span></button>
                        </div>
                        `
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