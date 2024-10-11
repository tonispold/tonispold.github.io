

window.addEventListener('DOMContentLoaded', (event) => {
  document.body.classList.add('animate-bg');
});

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)

  );
}

const aboutHeader = document.getElementById('about-header');
const about = document.getElementById('about');

const portfolioHeader = document.getElementById('portfolio-header');
const portfolio = document.getElementById('portfolio');

const skillsHeader = document.getElementById('skills-header');
const skills = document.getElementById('skills');

document.addEventListener('scroll', function () {
  if(isInViewport(aboutHeader)) {
    about.classList.add("animation-scrolled");
  }
  if(isInViewport(portfolioHeader)) {
    portfolio.classList.add("animation-scrolled");
  }
  if(isInViewport(skillsHeader)) {
    skills.classList.add("animation-scrolled");
  }
});


document.addEventListener("scroll", function() {
  const el = document.getElementById("nav");
  let rect = el.getBoundingClientRect();
  if (rect.top <= 0) {
    el.classList.add("fixed-nav");
    el.classList.remove("nav");
  } else {
    el.classList.remove("fixed-nav");
  }
});

function sectionChange(elem) {
  var item = document.querySelectorAll('.nav-item');
  for (i = 0; i < item.length; i++) {
      item[i].classList.remove('active')
  }
  elem.classList.add('active');
}


function readMore(dotsId, moreId, btnId) {
  var dots = document.getElementById(dotsId);
  var moreText = document.getElementById(moreId);
  var btnText = document.getElementById(btnId);

  if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more"; 
      moreText.style.display = "none";
  } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less"; 
      moreText.style.display = "inline";
  }
}

