var icon = document.getElementById("icon");
icon.addEventListener('click',changetheme);
function changetheme(){
    document.body.classList.toggle("darkmode");
    if(document.body.classList.contains("darkmode")){
        icon.src = "sun.png"
    }else{
        icon.src = "moon.png"
    }
}