const header = document.querySelector("header");
const frist_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle");
const ml_section = document.querySelector(".milestones");
const ml_Conters = document.querySelectorAll(".number span");
const prt_section = document.querySelector(".protfolio");
const zoom_icons = document.querySelectorAll(".zoom-icon");
const modal_overlay = document.querySelector(".modal-overlay");
const images = document.querySelectorAll(".images img");
const prev_btn =document.querySelector.apply(".prev-btn");
const next_btn =document.querySelector(".next-btn");


window.addEventListener("scroll", () => {
   skillsCounter();
   if(!mlPlayed) mlCounters();
})
/*----------------Sticky Navbar-----------*/
function stickyNavbar() {
header.classList.toggle("scrolled",window.scrollY > 0)
}
stickyNavbar();
window.addEventListener("scroll", stickyNavbar);
let sr = ScrollReveal({
    duration: 2500,
    distance: "60px",
});
sr.reveal(".showcase-info", { delay: 600 });
sr.reveal(".showcase-image",{origin: "top",delay:700});

/*----------------skills -----------*/
function hasReached(el) {
    let topPosition = el.getBoundingClientRect().top;
    if (window.innerHeight >= topPosition + el.offsetHeight) return true;
    return false;
}
function updateCount(num, maxnum) {
    let curentNum = +num.innerText;
    if (curentNum < maxnum) {
        num.innerText = curentNum + 1;
        setTimeout(() => {
            updateCount(num, maxnum);
        }, 12);
    }
}
let skillsPlayed = false;
function skillsCounter() {
    if (!hasReached(frist_skill)) return;
     skillsPlayed = true;
    sk_counters.forEach((counter , i) => {
        let target = +counter.dataset.target;
        
        let strokeValue = 427 - 427 * (target / 100);
        console.log(strokeValue)
        progress_bars[i].style.setProperty("--target", strokeValue);
        setTimeout(() => {
            updateCount(counter,target)
        },400)
        
        
    });
    progress_bars.forEach(
        (p) => (p.style.animation = "progress 2s ease-in-out forwards")
        );
 }
 //---------------Services Animation-///
 let mlPlayed = false;
 function mlCounters(){
    if (!hasReached(ml_section)) return;
    mlPlayed =true;
    
    ml_Conters.forEach(ctr =>{
        let target = +ctr.dataset.target;
        setTimeout(()=>{
            updateCount(ctr,target);
        },400)

    })
 }
 /*----------------------------- Mixer filter protofilio*--------------------------*/
 let mixer = mixitup('.portfolio-gallery',{ 
     selectors: {
    target: '.prt-card'
},
animation: {
    duration: 500
},});
 /*----------------------------- Modal and photo zoom  protofilio*--------------------------*/
zoom_icons.forEach(icn => icn.addEventListener("click",()=>{
    prt_section.classList.add("open")
    document.body.classList.add("stopScrolling")
}));
modal_overlay.addEventListener("click",() => {
    prt_section.classList.remove("open");
    document.body.classList.remove("stopScrolling")

});
prev_btn.addEventListener("click", ()=> {
    i--;
    changeImage(i)
});
function changeImage(index){
    images.forEach((img)=> img.classList.remove("showImage"));
    images[index].classList.add("showImage");
}

  
