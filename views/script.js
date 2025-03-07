let button = document.getElementById("btn");
let clickconunt = 0;
let style = document.head.querySelector(".style");
let usernamev;

console.log(button);
button.addEventListener("click", () => {
    // let html = "<style>.anim{animation: anim 3s ease-in-out;}</style>"
    if (clickconunt == 0 || ((clickconunt % 2) == 0)) {
        console.log(clickconunt);
        // style.innerText = ".anim{animation: anim 3s forwards;}"
        style.innerHTML = `.anim{animation: anim 3s forwards;}@keyframes anim {
            from {
                transform: translateX(0);
                border-top-right-radius: 50px;
                border-bottom-right-radius: 50px;
                border-top-left-radius: 10px;
                border-bottom-left-radius: 10px;
            }
        
            to {
                transform: translateX(25vw);
                border-top-right-radius: 10px;
                border-bottom-right-radius: 10px;
                border-top-left-radius: 50px;
                border-bottom-left-radius: 50px;
            }
        }
        .anim div:first-child{animation: anim2 2.5s forwards;}
        @keyframes anim2 {to{opacity: 0;}}
        .div2{animation: anim3 2.5s forwards;}
        @keyframes anim3 {to{opacity: 1;}}
        
        @media screen and (max-width:455px){
            .anim{animation: anim 3s forwards;}
            @keyframes anim {
                from {
                    right: 10vw;
                    top: 0px;
                    left: 10vw;
                    border-top-right-radius: 10px;
                    border-bottom-right-radius: 50px;
                    border-top-left-radius: 10px;
                    border-bottom-left-radius: 50px;
                }
        
                to {
                    right: 0;
                    left: 10vw;
                    top: 365px;
                    border-top-right-radius: 50px;
                    border-bottom-right-radius: 10px;
                    border-top-left-radius: 50px;
                    border-bottom-left-radius: 10px;
                }
            }
        }`

        setTimeout(() => {
            style.innerHTML = `.anim{ right: 25vw;
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
            border-top-left-radius: 50px;
            border-bottom-left-radius: 50px;}
            .anim div:first-child{opacity: 0;}
            .div2{opacity: 1;}
            @media screen and (max-width:455px){
                .anim{
                    right: 0;
                    left: 10vw;
                    top: 365px;
                    border-top-right-radius: 50px;
                    border-bottom-right-radius: 10px;
                    border-top-left-radius: 50px;
                    border-bottom-left-radius: 10px;
                }
            }`
        }, 3000);
        clickconunt++;
    }
    else {
        // console.log(clickconunt);
        // style.innerText = ".anim{animation: anim 3s reverse;}"
        style.innerHTML = `.anim{animation: anim 3s forwards;}@keyframes anim {
            to {
                transform: translateX(0);
                border-top-right-radius: 50px;
                border-bottom-right-radius: 50px;
                border-top-left-radius: 10px;
                border-bottom-left-radius: 10px;
            }
        
            from {
                transform: translateX(25vw);
                border-top-right-radius: 10px;
                border-bottom-right-radius: 10px;
                border-top-left-radius: 50px;
                border-bottom-left-radius: 50px;
            }
        }
        .anim div:first-child{animation: anim2 2.5s forwards;}
        @keyframes anim2 {to{opacity: 1;}}
        .div2{animation: anim3 2.5s forwards;}
        @keyframes anim3 {to{opacity: 0;}}
        @media screen and (max-width:455px){
            .anim{animation: anim 3s forwards;}
            @keyframes anim {
                to {
                    right: 10vw;
                    top: 15px;
                    left: 10vw;
                    border-top-right-radius: 10px;
                    border-bottom-right-radius: 50px;
                    border-top-left-radius: 10px;
                    border-bottom-left-radius: 50px;
                }
        
                from {
                    right: 0;
                    left: 10vw;
                    top: 365px;
                    border-top-right-radius: 50px;
                    border-bottom-right-radius: 10px;
                    border-top-left-radius: 50px;
                    border-bottom-left-radius: 10px;
                }
            }
        }`
        setTimeout(() => {
            style.innerHTML = `.anim{ left: 25vw;
            border-top-right-radius: 50px;
            border-bottom-right-radius: 50px;
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;}
            .anim div:first-child{opacity: 1;}
            .div2{opacity: 0;}
            @media screen and (max-width:455px){.anim{
                right: 10vw;
                top: 15px;
                left: 10vw;
                border-top-right-radius: 10px;
                border-bottom-right-radius: 50px;
                border-top-left-radius: 10px;
                border-bottom-left-radius: 50px;
            }}`
        }, 3000);
        // document.head.append(style)
        clickconunt++;
    }
})

loginbtn,addEventListener("click", ()=>{
    console.log("input");
    console.log(document.querySelector(".username").value);
    console.log(document.querySelector(".password").value);
})