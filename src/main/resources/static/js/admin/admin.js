const imageInput = document.getElementById('imageInput');
const fileNameSpan = document.getElementById('fileName');
const imagePreview = document.getElementById('imagePreview');
const placeholder = document.querySelector('.preview-placeholder');

imageInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        fileNameSpan.textContent = file.name;
        fileNameSpan.style.color = "#fff";

        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
            imagePreview.style.opacity = '1';
            if(placeholder) placeholder.style.display = 'none';
        }
        reader.readAsDataURL(file);
    } else {
        fileNameSpan.textContent = "Выберите изображение...";
        fileNameSpan.style.color = "var(--text-muted)";
        imagePreview.style.display = 'none';
        if(placeholder) placeholder.style.display = 'block';
    }
});