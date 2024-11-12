// handle Slider
const gallery = document.querySelector(".gallery");
const rightArrow = document.getElementById("right-arrow");
const leftArrow = document.getElementById("left-arrow");
const cardWidth = 350;
const visibleCards = 4;
let scrollPosition = 0;

rightArrow.addEventListener("click", () => {
  if (scrollPosition >= gallery.childElementCount - visibleCards) {
    scrollPosition = 0;
  } else {
    scrollPosition += 1;
  }
  updateGalleryPosition();
});

leftArrow.addEventListener("click", () => {
  if (scrollPosition <= 0) {
    scrollPosition = gallery.childElementCount - visibleCards;
  } else {
    scrollPosition -= 1;
  }
  updateGalleryPosition();
});

function updateGalleryPosition() {
  gallery.style.transform = `translateX(-${scrollPosition * cardWidth}px)`;
}

// Back To Top Button
const backToTopBtn = document.getElementById("backToTop");

window.onscroll = function () {
  if (window.scrollY > 600) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
};

backToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});


  