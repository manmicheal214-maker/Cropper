const input = document.getElementById("inputImage");
const image = document.getElementById("image");
const result = document.getElementById("result");

let cropper;

input.addEventListener("change", function(e){

    const file = e.target.files[0];

    if(!file) return;

    image.src = URL.createObjectURL(file);

    image.onload = function(){

        if(cropper){
            cropper.destroy();
        }

        cropper = new Cropper(image,{
            viewMode:1,
            autoCropArea:1,
            movable:true,
            zoomable:true,
            scalable:true,
            rotatable:true,
            responsive:true
        });

    };

});

document.getElementById("cropBtn").onclick = function(){

    if(!cropper) return;

    const canvas = cropper.getCroppedCanvas();

    result.src = canvas.toDataURL("image/png");

};

document.getElementById("downloadBtn").onclick = function(){

    if(!cropper) return;

    const canvas = cropper.getCroppedCanvas();

    canvas.toBlob(function(blob){

        const a = document.createElement("a");

        a.download = "cropped-image.png";

        a.href = URL.createObjectURL(blob);

        a.click();

    });

};
