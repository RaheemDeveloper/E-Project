/*==============================
	Back To Top Button
==============================*/

window.addEventListener('scroll', function() {
	const btn = document.getElementById('backToTop');
	btn.style.display = window.scrollY > 300 ? 'flex' : 'none';
  });
  
  document.getElementById('backToTop').addEventListener('click', () => {
	window.scrollTo({top:0, behavior:'smooth'});
  });

/*==============================
	Hero Section Slider
==============================*/

const menuBtn = document.getElementById('menu-btn');
const nav = document.getElementById('nav');
menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  nav.classList.toggle('active');
});

document.querySelectorAll('.dropdown-toggle').forEach(item => {
	item.addEventListener('click', e => {
	  e.preventDefault(); // Stop link action
	  const parentLi = item.closest('.has-dropdown');
	  parentLi.classList.toggle('open');
	});
  });

gsap.registerPlugin(TextPlugin);

const slidesData = [
  {title: "Welcome to Curtix Theatre"},
  {title: "Drama, Comedy & More"},
  {title: "Live Stage Performances"}
];

const swiper = new Swiper('.hero-slider', {
  loop: true,
  autoplay: {delay: 5000},
  pagination: {el: '.swiper-pagination', clickable: true},
  on: { slideChangeTransitionStart: function(){ animateSlide(this.realIndex); }}
});

const imgs = document.querySelectorAll('.hero-img');
const titles = ["title1","title2","title3"];

function animateSlide(index){
  gsap.fromTo(imgs[index], {opacity:0, scale:1.05}, {opacity:1, scale:1, duration:1.2});

  gsap.set("#"+titles[index], {text:""});

  gsap.to("#"+titles[index], {
    duration:2, text:slidesData[index].title
  });

  gsap.fromTo('.progress-line',{width:"0%"},{width:"100%", duration:5, ease:"linear"});
}

animateSlide(0);

/*==============================
	Shows Section
==============================*/

const buttons = document.querySelectorAll('.tab-btn');
const containers = document.querySelectorAll('.show-container');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    containers.forEach(c => c.classList.add('hidden'));
    document.getElementById(btn.dataset.tab).classList.remove('hidden');
  });
});

const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalText = document.getElementById('modal-text');
const closeBtn = document.querySelector('.close-btn');

document.querySelectorAll('.show-card').forEach(card => {
  card.addEventListener('click', () => {
    modalTitle.textContent = card.getAttribute('data-title');
    modalText.textContent = card.getAttribute('data-about');
    modal.style.visibility = 'visible';
    gsap.to(modal, {opacity:1, duration:0.4});
    gsap.to('.modal', {scale:1, duration:0.4, ease:"back.out(1.7)"});
  });
});

closeBtn.addEventListener('click', () => {
  gsap.to(modal, {opacity:0, duration:0.3, onComplete:()=>{ modal.style.visibility = 'hidden'; }});
  gsap.to('.modal', {scale:0.8, duration:0.3});
});

/*==============================
	Upcoming Shows Section
==============================*/

const popupOverlay = document.getElementById('modal-2');
const popupTitle = document.getElementById('modal-title-2');
const countdownDisplay = document.getElementById('timer');
const closeButton = document.getElementById('btn-close');

let timerInterval;

document.querySelectorAll('.event-card').forEach(eventCard => {
  eventCard.addEventListener('click', () => {
    const eventName = eventCard.getAttribute('data-title');
    const eventDateTime = new Date(eventCard.getAttribute('data-time'));

    popupTitle.textContent = eventName;
    initiateCountdown(eventDateTime);

    popupOverlay.style.visibility = 'visible';
    gsap.to(popupOverlay, {opacity: 1, duration: 0.4});
    gsap.to('.modal', {scale: 1, duration: 0.4, ease: "back.out(1.7)"});
  });
});

closeButton.addEventListener('click', () => {
  clearInterval(timerInterval);
  gsap.to(popupOverlay, {opacity: 0, duration: 0.3, onComplete: () => { 
    popupOverlay.style.visibility = 'hidden'; 
  }});
  gsap.to('.modal', {scale: 0.8, duration: 0.3});
});

function initiateCountdown(targetDate) {
  clearInterval(timerInterval);

  function updateCountdown() {
    const currentTime = new Date();
    const timeDiff = targetDate - currentTime;

    if (timeDiff <= 0) {
      countdownDisplay.textContent = "Show Started!";
      clearInterval(timerInterval);
      return;
    }

    const hours = String(Math.floor(timeDiff / (1000 * 60 * 60))).padStart(2, '0');
    const minutes = String(Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    const seconds = String(Math.floor((timeDiff % (1000 * 60)) / 1000)).padStart(2, '0');

    countdownDisplay.textContent = `${hours}:${minutes}:${seconds}`;
  }

  updateCountdown();
  timerInterval = setInterval(updateCountdown, 1000);
}