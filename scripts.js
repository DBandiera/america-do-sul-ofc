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

document.addEventListener("DOMContentLoaded", function() {
    const servicosUrl = './servicos.html'; // Substitua com a URL correta da página de serviços
    const produtosUrl = './produtos.html'; // Substitua com a URL correta da página de produtos

    let servicos = [];
    let produtos = [];
    let currentIndex = 0;
    const interval = 0.2 * 60 * 1000; // 20 minutos em milissegundos

    function fetchItems(url) {
        return fetch(url)
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');
                const items = Array.from(doc.querySelectorAll('.box')).map(box => ({
                    image: box.querySelector('img').src,
                    name: box.querySelector('h3').textContent,
                    description: box.querySelectorAll('p').length > 1 ? Array.from(box.querySelectorAll('p')).map(p => p.textContent).join(' ') : box.querySelector('p').textContent,
                    link: box.querySelector('a') ? box.querySelector('a').href : ''
                }));
                return items;
            })
            .catch(error => console.error('Erro ao buscar dados:', error));
    }

    function updateDisplay(items, containerSelector) {
        const container = document.querySelector(containerSelector);
        container.innerHTML = '';

        // Garantir que sempre haja 3 itens, duplicando os existentes se necessário
        const itemsToDisplay = [...items];
        while (itemsToDisplay.length < 3) {
            itemsToDisplay.push(...items);
        }

        const start = (currentIndex * 3) % itemsToDisplay.length;
        const end = start + 3;
        const itemsSubset = itemsToDisplay.slice(start, end);

        itemsSubset.forEach(item => {
            const box = document.createElement('div');
            box.classList.add('box');
            box.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <a class="btn-contato" href="${item.link}">
                    <input type="submit" class="input-a" value="Catálogo">
                </a>
            `;
            container.appendChild(box);
        });
    }

    function alternateDisplay() {
        updateDisplay(servicos, '#servicos-destaque .container');
        updateDisplay(produtos, '#produtos-destaque .container');

        currentIndex++;
    }

    fetchItems(servicosUrl).then(data => {
        servicos = data;
        updateDisplay(servicos, '#servicos-destaque .container');
    });

    fetchItems(produtosUrl).then(data => {
        produtos = data;
        updateDisplay(produtos, '#produtos-destaque .container');
    });

    setInterval(alternateDisplay, interval);
});
