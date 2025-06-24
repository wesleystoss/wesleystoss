// Navegação Mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navegação suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Ajuste para a navbar fixa
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Mudança de cor da navbar no scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animação de scroll reveal
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observar elementos para animação
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.about-content, .project-card, .skill-item, .highlight-item, .stat-card');
    revealElements.forEach(el => {
        observer.observe(el);
    });
    
    // Animação dos badges de nível das habilidades
    const skillItems = document.querySelectorAll('.skill-item');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.3 });
    
    skillItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        skillObserver.observe(item);
    });
});

// Formulário de contato
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simular envio do formulário
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        // Simular delay de envio
        setTimeout(() => {
            // Mostrar mensagem de sucesso
            showNotification('Mensagem enviada com sucesso! Em breve entrarei em contato.', 'success');
            
            // Resetar formulário
            this.reset();
            
            // Restaurar botão
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Sistema de notificações
function showNotification(message, type = 'info') {
    // Remover notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Criar nova notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Adicionar estilos
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Adicionar ao DOM
    document.body.appendChild(notification);
    
    // Fechar notificação
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remover após 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Adicionar estilos CSS para animações de notificação
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        font-size: 1rem;
        opacity: 0.7;
        transition: opacity 0.3s ease;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
    }
`;
document.head.appendChild(notificationStyles);

// Efeito de digitação no título
function typeWriter(element, text, speed = 45) {
    element.innerHTML = '';
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Aplicar efeito de digitação quando a página carregar
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        typeWriter(heroTitle, originalText, 80);
    }
});

// Parallax suave no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Contador animado para estatísticas
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
        }
    }
    
    updateCounter();
}

// Trigger contadores quando a seção sobre estiver visível
const aboutSection = document.querySelector('.about');
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = document.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.textContent);
                animateCounter(counter, target);
            });
            aboutObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (aboutSection) {
    aboutObserver.observe(aboutSection);
}

// Efeito hover nos cards de projeto
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Efeito de partículas no hero (opcional)
function createParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
        animation: float 6s linear infinite;
    `;
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    
    document.querySelector('.hero').appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 6000);
}

// Criar partículas periodicamente
setInterval(createParticle, 300);

// Adicionar estilos para animação de partículas
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyles);

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 70;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Atualizar link ativo na navegação
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Adicionar classe active para link ativo
const activeLinkStyles = document.createElement('style');
activeLinkStyles.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(activeLinkStyles);

// Preloader (opcional)
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});

console.log('🚀 Portfólio de Wesley Santos carregado com sucesso!');

// Atualizar ano atual no footer
document.addEventListener('DOMContentLoaded', () => {
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});

// Alternância de tema dark/light
document.addEventListener('DOMContentLoaded', function() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

    function setTheme(dark) {
        if (dark) {
            document.body.classList.add('dark-theme');
            if (themeIcon) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        } else {
            document.body.classList.remove('dark-theme');
            if (themeIcon) {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        }
    }

    function toggleTheme() {
        const isDark = document.body.classList.toggle('dark-theme');
        setTheme(isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
        // Carregar preferência do usuário
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setTheme(true);
        } else {
            setTheme(false);
        }
    }
});

// Botão Fixo de Contato (Mobile)
const contactFixedBtn = document.getElementById('contact-fixed-btn');

// Função para controlar a visibilidade do botão fixo
function toggleContactFixedBtn() {
    if (window.innerWidth <= 768) {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Mostrar botão após scrollar 50% da altura da tela
        if (scrollPosition > windowHeight * 0.5) {
            contactFixedBtn.classList.add('show');
        } else {
            contactFixedBtn.classList.remove('show');
        }
        
        // Ocultar botão quando estiver próximo da seção de contato
        const contactSection = document.getElementById('contato');
        if (contactSection) {
            const contactSectionTop = contactSection.offsetTop;
            const contactSectionBottom = contactSectionTop + contactSection.offsetHeight;
            
            if (scrollPosition + windowHeight > contactSectionTop && scrollPosition < contactSectionBottom) {
                contactFixedBtn.classList.remove('show');
            }
        }
    } else {
        // Em desktop, sempre ocultar o botão
        contactFixedBtn.classList.remove('show');
    }
}

// Event listeners para o botão fixo
if (contactFixedBtn) {
    // Controlar visibilidade no scroll
    window.addEventListener('scroll', toggleContactFixedBtn);
    
    // Controlar visibilidade no resize da janela
    window.addEventListener('resize', toggleContactFixedBtn);
    
    // Navegar para a seção de contato ao clicar
    contactFixedBtn.addEventListener('click', () => {
        const contactSection = document.getElementById('contato');
        if (contactSection) {
            const offsetTop = contactSection.offsetTop - 70; // Ajuste para a navbar fixa
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
    
    // Verificar estado inicial
    toggleContactFixedBtn();
}

// Função para alternar entre visualização simples e detalhada das tecnologias
function toggleSkills() {
    const skillsSimple = document.getElementById('skills-simple');
    const skillsDetailed = document.getElementById('skills-detailed');
    
    if (skillsSimple.style.display !== 'none') {
        // Mostrar visualização detalhada
        skillsSimple.style.display = 'none';
        skillsDetailed.style.display = 'block';
        
        // Scroll suave para a seção de tecnologias
        const skillsSection = document.getElementById('sobre');
        const offsetTop = skillsSection.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Animar os elementos da visualização detalhada
        setTimeout(() => {
            const skillItems = document.querySelectorAll('.skill-item');
            skillItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 50);
            });
        }, 300);
    } else {
        // Mostrar visualização simples
        skillsDetailed.style.display = 'none';
        skillsSimple.style.display = 'block';
        
        // Scroll suave para a seção de tecnologias
        const skillsSection = document.getElementById('sobre');
        const offsetTop = skillsSection.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Função para mostrar/ocultar o balão de contato
function toggleContactChat() {
    const chat = document.getElementById('contact-chat');
    if (chat.classList.contains('open')) {
        chat.classList.remove('open');
    } else {
        chat.classList.add('open');
    }
}

// --- HERO IMPACTANTE: Saudação aleatória com efeito de digitação ---
const frasesImpacto = [
    'Pronto para ver inovação de verdade?',
    'Você nunca viu um portfólio assim!',
    'Prepare-se para se surpreender!',
    'Bem-vindo ao universo de soluções digitais!',
    'O futuro do desenvolvimento começa aqui.',
    'Transformando ideias em experiências digitais.',
    'Soluções criativas para desafios reais.',
    'Inovação, tecnologia e paixão pelo que faço.'
];

function typeWriter(element, text, speed = 45) {
    element.innerHTML = '';
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

document.addEventListener('DOMContentLoaded', () => {
    const heroImpacto = document.getElementById('hero-impacto');
    if (heroImpacto) {
        const frase = frasesImpacto[Math.floor(Math.random() * frasesImpacto.length)];
        typeWriter(heroImpacto, frase);
    }
}); 