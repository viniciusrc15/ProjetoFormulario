var img = new Image();
img.addEventListener('load', function() {
    var doc = new jsPDF();
    doc.addImage(img, 'png', 10, 50);
});
img.src = 'image_path/image_name.png';

