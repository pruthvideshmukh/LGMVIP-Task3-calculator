let screen = document.getElementById("screen");
let btn = document.getElementsByClassName("btn");

let screenValue = "";

for (item of btn) {
    item.addEventListener("click", (e)=>{
        btnText = e.target.innerText;
        if (btnText == "X") {
            btnText = "*";
            screenValue += btnText;
            screen.value = screenValue;
        }
        else if (btnText == "C") {
            screenValue = "";
            screen.value = screenValue;
        }
        else if (btnText == "=") {
            screen.value = eval(screen.value);
        }
        else{
            screenValue += btnText;
            screen.value = screenValue;
        }
    });
};