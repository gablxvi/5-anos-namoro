document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll para seções
    const exploreBtn = document.getElementById('explore-btn');
    
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            const historiaSection = document.getElementById('nossa-historia');
            scrollToElement(historiaSection);
        });
    }
    
    // Função de scroll suave
    function scrollToElement(element) {
        window.scrollTo({
            behavior: 'smooth',
            top: element.offsetTop - 50
        });
    }
    
    // Revelar elementos ao scrollar
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar itens da galeria
    const galeriaItems = document.querySelectorAll('.galeria-item');
    galeriaItems.forEach(item => {
        observer.observe(item);
    });
    
    // Observar itens da timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        observer.observe(item);
    });
    
    // Observar itens de memórias
    const memoriaItems = document.querySelectorAll('.memoria-item');
    memoriaItems.forEach(item => {
        observer.observe(item);
    });
    
    // Observar itens de sonhos
    const sonhoItems = document.querySelectorAll('.sonho-item');
    sonhoItems.forEach(item => {
        observer.observe(item);
    });
    
    // Observar itens de fotos
    const fotoItems = document.querySelectorAll('.foto-item');
    fotoItems.forEach(item => {
        observer.observe(item);
    });
    
    // Lidar com erros de carregamento de imagem
    const fotoImagens = document.querySelectorAll('.foto-frame img');
    fotoImagens.forEach(img => {
        img.addEventListener('error', function() {
            this.classList.add('error');
            const fotoFrame = this.parentElement;
            
            // Adiciona um ícone e mensagem quando a imagem não puder ser carregada
            if (!fotoFrame.querySelector('.fallback-icon')) {
                const icon = document.createElement('i');
                icon.className = 'fas fa-image icon-large fallback-icon';
                fotoFrame.appendChild(icon);
                
                const message = document.createElement('p');
                message.textContent = 'Imagem não disponível';
                message.className = 'fallback-message';
                fotoFrame.appendChild(message);
            }
        });
    });
    
    // Efeito de digitação na carta
    const cartaTexto = document.getElementById('carta-texto');
    const cartaSection = document.getElementById('carta');
    
    if (cartaTexto && cartaSection) {
        const cartaObserver = new IntersectionObserver(function(entries) {
            if (entries[0].isIntersecting && !cartaTexto.classList.contains('typed')) {
                typeEffect(cartaTexto);
                cartaTexto.classList.add('typed');
                cartaObserver.unobserve(cartaSection);
            }
        }, observerOptions);
        
        cartaObserver.observe(cartaSection);
    }
    
    function typeEffect(element) {
        const paragraphs = element.querySelectorAll('p');
        let delay = 0;
        
        paragraphs.forEach(paragraph => {
            const originalText = paragraph.textContent;
            paragraph.textContent = '';
            paragraph.style.opacity = '1';
            
            setTimeout(() => {
                let i = 0;
                const interval = setInterval(() => {
                    if (i < originalText.length) {
                        paragraph.textContent += originalText.charAt(i);
                        i++;
                    } else {
                        clearInterval(interval);
                    }
                }, 20);
            }, delay);
            
            delay += originalText.length * 20 + 500;
        });
    }
    
    // Modal para as memórias
    const memorias = document.querySelectorAll('.memoria-item');
    const modal = document.getElementById('modal');
    const modalIcon = document.getElementById('modal-icon');
    const modalCaption = document.querySelector('.modal-caption');
    const modalClose = document.querySelector('.modal-close');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    let currentIndex = 0;
    
    // Ícones para o modal
    const icons = [
        'fa-heart',
        'fa-smile',
        'fa-infinity',
        'fa-star',
        'fa-dove',
        'fa-sun'
    ];
    
    if (memorias.length > 0 && modal && modalIcon) {
        memorias.forEach((memoria, index) => {
            memoria.addEventListener('click', function() {
                currentIndex = index;
                const iconElement = this.querySelector('.icon-large');
                const caption = this.querySelector('.memoria-legenda').textContent;
                
                updateModalIcon(index);
                modalCaption.textContent = caption;
                modal.style.display = 'block';
            });
        });
        
        modalClose.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        modalPrev.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + memorias.length) % memorias.length;
            updateModal();
        });
        
        modalNext.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % memorias.length;
            updateModal();
        });
        
        function updateModal() {
            updateModalIcon(currentIndex);
            const caption = memorias[currentIndex].querySelector('.memoria-legenda').textContent;
            modalCaption.textContent = caption;
        }
        
        function updateModalIcon(index) {
            const iconElement = modalIcon.querySelector('i');
            iconElement.className = '';
            iconElement.classList.add('fas', icons[index], 'icon-xl');
        }
        
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // Toggle de Sonhos
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    
    if (toggleBtns.length > 0) {
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const target = this.getAttribute('data-target');
                
                // Remove active class de todos os botões e listas
                toggleBtns.forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.sonhos-lista').forEach(lista => lista.classList.remove('active'));
                
                // Adiciona active class ao botão e lista selecionados
                this.classList.add('active');
                document.getElementById(target).classList.add('active');
                
                // Re-observa os itens para animação
                const activeItems = document.querySelectorAll(`#${target} .sonho-item`);
                activeItems.forEach(item => {
                    item.classList.remove('reveal');
                    observer.observe(item);
                });
            });
        });
    }
    
    // Botão surpresa
    const surpresaBtn = document.getElementById('surpresa-btn');
    const surpresaPopup = document.getElementById('surpresa-popup');
    const surpresaClose = document.querySelector('.surpresa-close');
    
    if (surpresaBtn && surpresaPopup) {
        surpresaBtn.addEventListener('click', function() {
            surpresaPopup.style.display = 'flex';
            createHeartRain();
        });
        
        surpresaClose.addEventListener('click', function() {
            surpresaPopup.style.display = 'none';
        });
        
        window.addEventListener('click', function(event) {
            if (event.target === surpresaPopup) {
                surpresaPopup.style.display = 'none';
            }
        });
    }
    
    // Chuva de corações
    function createHeartRain() {
        const container = document.querySelector('body');
        const heartCount = 50;
        
        for (let i = 0; i < heartCount; i++) {
            createHeart(container);
        }
    }
    
    function createHeart(container) {
        const heart = document.createElement('div');
        heart.classList.add('heart-rain');
        
        // Escolhe emojis de coração aleatórios
        const hearts = ['❤️', '💖', '💕', '💓', '💗', '💘'];
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        
        // Posição inicial aleatória
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's';
        heart.style.opacity = Math.random();
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        
        container.appendChild(heart);
        
        // Remove o coração após a animação
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }
    
    // Adiciona style para hearts
    const style = document.createElement('style');
    style.textContent = `
        .heart-rain {
            position: fixed;
            top: -5vh;
            z-index: 999;
            animation: heart-fall linear forwards;
            pointer-events: none;
        }
        
        @keyframes heart-fall {
            to {
                transform: translateY(105vh) rotate(90deg);
            }
        }
    `;
    document.head.appendChild(style);
}); 