document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;
    const intervalTime = 7000; // Tempo em milissegundos (5 segundos)

    function showSlide(index) {
        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }
        const offset = -currentSlide * 100;
        document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    document.querySelector('.carousel-control-prev').addEventListener('click', function() {
        prevSlide();
    });

    document.querySelector('.carousel-control-next').addEventListener('click', function() {
        nextSlide();
    });

    // Função para avançar automaticamente a cada intervalo de tempo
    setInterval(nextSlide, intervalTime);

    showSlide(currentSlide); // Initialize the first slide

    console.log('Documento carregado e pronto.');
});

document.addEventListener("DOMContentLoaded", function() {
    const categoryLinks = document.querySelectorAll(".category");
    const boxes = document.querySelectorAll(".box");

    categoryLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const category = this.getAttribute("data-category");

            boxes.forEach(box => {
                if (box.getAttribute("data-category") === category) {
                    box.style.display = "flex";
                } else {
                    box.style.display = "none";
                }
            });
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll(".btn-catalogo");

    buttons.forEach(button => {
        button.addEventListener("click", function() {
            const url = this.getAttribute("data-url");
            window.location.href = url;
        });
    });
});

