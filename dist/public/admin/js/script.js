// Upload Image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");
  const deleteImagePreview = uploadImage.querySelector('#delete-image');
  const imageContainer = uploadImage.querySelector('.image-container');

  uploadImageInput.addEventListener("change", () => {
    const file = uploadImageInput.files[0];
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file);
      if (deleteImagePreview) {
        imageContainer.style.display = 'inline-block';
        deleteImagePreview.style.display = 'block';
      }
    }
  });

  if (deleteImagePreview) {
    deleteImagePreview.addEventListener('click', () => {
      uploadImageInput.value = '';
      uploadImagePreview.src = '';
      imageContainer.style.display = 'none';
      deleteImagePreview.style.display = 'none';
    });
  }
}
// End Upload Image


// upload-audio
const uploadAudio = document.querySelector("[upload-audio]");
if (uploadAudio) {
  const uploadAudioInput = uploadAudio.querySelector("[upload-audio-input]");
  const uploadAudioPlay = uploadAudio.querySelector("[upload-audio-play]");
  const uploadAudioSource = uploadAudioPlay.querySelector("source");

  uploadAudioInput.addEventListener("change", () => {
    const file = uploadAudioInput.files[0];
    if (file) {
      uploadAudioSource.src = URL.createObjectURL(file);
      uploadAudioPlay.load();
    }
  });
}
// End upload-audio