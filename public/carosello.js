document.addEventListener("DOMContentLoaded", function () {
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");
  let currentIndex = 0;
  let images = [];

  // Funzione per ottenere le immagini dalla cartella
  function getImages() {
    fetch("./img")
      .then((response) => response.json())
      .then((imagePaths) => {
        const imageContainer = document.getElementById("carousel");
        imagePaths.forEach((path) => {
          const img = document.createElement("img");
          img.src = path;
          imageContainer.appendChild(img);
          images = Array.from(document.querySelectorAll("#carousel img"));
          
        });
      });
  }

  function showImage(index) {
    images.forEach((img, i) => {
        img.style.display = i === index ? "block" : "none";
    });
}

  function goToNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }
  
  function goToPrevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  }

  showImage(currentIndex);

  nextButton.addEventListener("click", goToNextImage);
  prevButton.addEventListener("click", goToPrevImage);

  function autoSlide() {
    goToNextImage();
  }

  getImages(); // Carica le immagini dalla cartella
  setInterval(autoSlide, 3000); // Cambia immagine ogni 3 secondi
});
