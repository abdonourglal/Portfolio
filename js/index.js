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
const prev_btn =document.querySelector(".prev-btn");
const next_btn =document.querySelector(".next-btn");
const  links =document.querySelectorAll(".nav-links");
const toggle_btn = document.querySelector(".toggle-btn");
const hamburger = document.querySelector(".hamburger")



window.addEventListener("scroll", () => {
    activLinks();
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
       // console.log(strokeValue)
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
 let currentIndex = 0;
zoom_icons.forEach((icn,i) => icn.addEventListener("click",()=>{
    prt_section.classList.add("open")
    document.body.classList.add("stopScrolling");
    currentIndex = i;
    changeImage(currentIndex);
}));
modal_overlay.addEventListener("click",() => {
    prt_section.classList.remove("open");
    document.body.classList.remove("stopScrolling");
    

});
prev_btn.addEventListener("click", ()=> {
    if (currentIndex === 0){
        currentIndex=5;
    }else{
        currentIndex--;
    }
    
    changeImage(currentIndex)
});
next_btn.addEventListener("click", ()=> {
    if (currentIndex === 5){
        currentIndex=0;
    }else{
        currentIndex++;
    }
    
    changeImage(currentIndex)
});
function changeImage(index){
    images.forEach((img)=> img.classList.remove("showImage"));
    images[index].classList.add("showImage");
}
/* ----------------Swiper --------*/
const swiper = new Swiper('.swiper', {
    // Optional parameters
 
    loop: true,
    autoplay:true,
    speed:450,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable:true,
    },
  });
  /* ----------------LINKS --------*/
  function activLinks(){
    let section = document.querySelectorAll("section[id]");
    let passedSection = Array.from(section).map((sct,i)=>{
        return {  y:sct.getBoundingClientRect().top - header.offsetHeight,
                  id:i ,
               } ;
    }).filter(sct => sct.y <=0);

    let currSectionID = passedSection.at(-1).id
    links.forEach((l) => l.classList.remove("active"));
    links[currSectionID].classList.add("active")
  }
  activLinks();
  /*-----------change to darke and reverse-----------*/
  let firstTheme = localStorage.getItem("dark");
  changeTheme(+firstTheme)
  function changeTheme (isDark){
    if(isDark){
        document.body.classList.add("dark");
        toggle_btn.classList.replace("uil-moon","fa-sun");
        localStorage.setItem("dark",1);
    }else{
        document.body.classList.remove("dark");
        toggle_btn.classList.replace("fa-sun","uil-moon");
        localStorage.setItem("dark",0);

    }
  }
  toggle_btn.addEventListener("click", ()=> {
    changeTheme(!document.body.classList.contains("dark"));
  })
/*------------open close navabar-----------*/
hamburger.addEventListener("click", ()=> {
    document.body.classList.toggle("open");
    document.body.classList.toggle("stopScrolling")
});
links.forEach(link => link.addEventListener("click", () => {
    document.body.classList.remove("open");
    document.body.classList.remove("stopScrolling");
}))