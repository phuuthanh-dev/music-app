tinymce.init({
  selector: 'textarea[textarea-mce]',
  plugins: 'lists link image table code wordcount',
  image_title: true,
  images_upload_url: '/admin/upload',
  automatic_uploads: true,
  file_picker_types: 'image'
});