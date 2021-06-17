let imageUrl = ""
  var myWidget = cloudinary.createUploadWidget({
    cloudName: 'dtqzhg98l',
    uploadPreset: 'vdkuxmpd'
  }, (error, result) => {
    if (!error && result && result.event === "success") {
      console.log('Done! Here is the image info: ', result.info);
      imageUrl = result.info.secure_url
    }
  })

  document.getElementById("upload_widget").addEventListener("click", function () {
    myWidget.open();
  }, false);
