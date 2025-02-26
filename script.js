// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(44, 62, 80, 0.95)';
    } else {
        navbar.style.background = 'rgba(44, 62, 80, 0.7)';
    }
});

// 回到顶部按钮
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 图片轮播
class Carousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = [
            { image: 'https://via.placeholder.com/800x400', description: '作品1：示例描述' },
            { image: 'https://via.placeholder.com/800x400', description: '作品2：示例描述' },
            { image: 'https://via.placeholder.com/800x400', description: '作品3：示例描述' }
        ];
        
        this.container = document.querySelector('.carousel-container');
        this.initCarousel();
        this.setupControls();
    }

    initCarousel() {
        this.slides.forEach((slide, index) => {
            const slideElement = document.createElement('div');
            slideElement.className = 'carousel-slide';
            slideElement.innerHTML = `
                <img src="${slide.image}" alt="作品${index + 1}">
                <p>${slide.description}</p>
            `;
            this.container.appendChild(slideElement);
        });
    }

    setupControls() {
        const prevButton = document.querySelector('.carousel-button.prev');
        const nextButton = document.querySelector('.carousel-button.next');
        
        prevButton.addEventListener('click', () => this.navigate(-1));
        nextButton.addEventListener('click', () => this.navigate(1));
    }

    navigate(direction) {
        this.currentSlide = (this.currentSlide + direction + this.slides.length) % this.slides.length;
        this.container.style.transform = `translateX(-${this.currentSlide * 100}%)`;
    }
}

// AI聊天功能
class ChatBot {
    constructor() {
        this.chatContainer = document.getElementById('chatContainer');
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendMessage');
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        // 切换聊天窗口
        document.getElementById('chatToggle').addEventListener('click', () => {
            this.chatContainer.style.display = 
                this.chatContainer.style.display === 'none' ? 'flex' : 'none';
        });

        // 关闭聊天窗口
        document.querySelector('.close-chat').addEventListener('click', () => {
            this.chatContainer.style.display = 'none';
        });

        // 发送消息
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
    }

    addMessage(text, isUser = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'ai'}`;
        messageDiv.textContent = text;
        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    async sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message) return;

        this.addMessage(message, true);
        this.messageInput.value = '';

        // 模拟AI响应
        this.addMessage('这是一个模拟的AI响应...', false);
    }
}

// 粒子效果配置
const particlesConfig = {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#D4AF37"
        },
        shape: {
            type: "chinese",
            chinese: {
                character: ["道", "德", "仁", "义", "礼", "智", "信"],
                style: {
                    color: "#D4AF37",
                    fontSize: 16
                }
            }
        },
        opacity: {
            value: 0.5,
            random: true
        },
        size: {
            value: 15,
            random: true
        },
        move: {
            enable: true,
            speed: 1,
            direction: "bottom",
            random: true,
            straight: false,
            out_mode: "out"
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "repulse"
            },
            onclick: {
                enable: true,
                mode: "push"
            }
        },
        modes: {
            repulse: {
                distance: 100,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            }
        }
    }
};

// 初始化粒子效果
particlesJS('particles-js', particlesConfig);

// 悬浮文字动画
class FloatingText {
    constructor() {
        this.texts = document.querySelectorAll('.floating-text');
        this.init();
    }

    init() {
        this.texts.forEach((text, index) => {
            // 设置初始位置
            gsap.set(text, {
                x: Math.random() * window.innerWidth * 0.8 - window.innerWidth * 0.4,
                y: Math.random() * window.innerHeight * 0.8 - window.innerHeight * 0.4,
                opacity: 0
            });

            // 创建浮动动画
            this.createFloatingAnimation(text);
        });
    }

    createFloatingAnimation(text) {
        const speed = parseFloat(text.dataset.speed) || 2;
        const timeline = gsap.timeline({
            repeat: -1,
            yoyo: true
        });

        // 淡入
        timeline.to(text, {
            opacity: 0.8,
            duration: 2,
            ease: "power1.inOut"
        });

        // 随机浮动
        timeline.to(text, {
            x: `+=${Math.random() * 100 - 50}`,
            y: `+=${Math.random() * 100 - 50}`,
            duration: speed,
            ease: "sine.inOut"
        });

        // 点击文字展开效果
        text.addEventListener('click', () => this.expandText(text));
    }

    expandText(text) {
        const originalText = text.textContent;
        const fullText = this.getFullText(originalText); // 获取完整章节内容

        gsap.to(text, {
            scale: 1.2,
            duration: 0.3,
            ease: "back.out",
            onComplete: () => {
                // 创建展开面板
                this.createExpandedPanel(fullText);
            }
        });
    }

    createExpandedPanel(content) {
        const panel = document.createElement('div');
        panel.className = 'expanded-panel';
        panel.innerHTML = `
            <div class="panel-content">
                <button class="close-btn">×</button>
                <div class="scroll-content">${content}</div>
            </div>
        `;

        document.body.appendChild(panel);

        // 动画显示面板
        gsap.fromTo(panel, 
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.5, ease: "back.out" }
        );

        // 关闭按钮事件
        panel.querySelector('.close-btn').addEventListener('click', () => {
            gsap.to(panel, {
                opacity: 0,
                scale: 0.8,
                duration: 0.3,
                onComplete: () => panel.remove()
            });
        });
    }

    getFullText(preview) {
        // 这里可以根据预览文字返回对应的完整章节
        const textMap = {
            "道生一，一生二，二生三，三生万物": `
                第四十二章
                道生一，一生二，二生三，三生万物。
                万物负阴而抱阳，冲气以为和。
                人之所恶，唯孤、寡、不谷，而王公以为称。
                故物或损之而益，或益之而损。
                人之所教，我亦教之。
                强梁者不得其死，吾将以为教父。
            `,
            // 添加其他文字映射...
        };
        return textMap[preview] || preview;
    }
}

// 音乐播放器控制
class MusicPlayer {
    constructor() {
        this.audio = document.getElementById('bgMusic');
        this.playBtn = document.querySelector('.play-btn');
        this.volumeSlider = document.querySelector('.volume-slider');
        this.volumeIcon = document.querySelector('.fa-volume-up');
        this.isPlaying = false;

        // 添加音频加载错误处理
        this.audio.addEventListener('error', (e) => {
            console.error('音频加载错误:', e);
            alert('音频加载失败，请检查文件路径是否正确');
        });

        this.setupEventListeners();
        this.setInitialVolume();
    }

    setupEventListeners() {
        this.playBtn.addEventListener('click', () => this.togglePlay());
        this.volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value));
        
        // 添加音频结束事件监听
        this.audio.addEventListener('ended', () => {
            this.isPlaying = false;
            this.updatePlayButton();
        });

        // 添加音频加载完成事件监听
        this.audio.addEventListener('canplaythrough', () => {
            console.log('音频加载完成，可以播放');
        });
    }

    togglePlay() {
        if (this.isPlaying) {
            this.audio.pause();
        } else {
            // 添加播放错误处理
            this.audio.play().catch(error => {
                console.error("播放失败:", error);
                alert('播放失败，请检查音频文件或浏览器设置');
                this.isPlaying = false;
                this.updatePlayButton();
            });
        }
        this.isPlaying = !this.isPlaying;
        this.updatePlayButton();
    }

    setVolume(value) {
        this.audio.volume = value / 100;
        // 更新音量图标
        if (value == 0) {
            this.volumeIcon.className = 'fas fa-volume-mute';
        } else if (value < 50) {
            this.volumeIcon.className = 'fas fa-volume-down';
        } else {
            this.volumeIcon.className = 'fas fa-volume-up';
        }
    }

    setInitialVolume() {
        const initialVolume = this.volumeSlider.value;
        this.setVolume(initialVolume);
    }

    updatePlayButton() {
        const icon = this.playBtn.querySelector('i');
        icon.className = this.isPlaying ? 'fas fa-pause' : 'fas fa-play';
    }
}

// 音频控制相关代码
function showMusicPlayer() {
    const player = document.querySelector('.music-player');
    const audio = document.getElementById('bgMusic');
    
    player.style.display = 'flex';
    
    // 开始播放
    audio.play().catch(error => {
        console.error("播放失败:", error);
        playBtn.className = 'fas fa-play';
        isPlaying = false;
    });
    
    // 更新播放按钮状态
    const playBtn = document.querySelector('.play-btn i');
    playBtn.className = 'fas fa-pause';
    isPlaying = true;
}

function closePlayer() {
    const player = document.querySelector('.music-player');
    const audio = document.getElementById('bgMusic');
    
    // 停止播放
    audio.pause();
    audio.currentTime = 0;
    
    // 隐藏播放器
    player.style.display = 'none';
    
    // 重置播放状态
    const playBtn = document.querySelector('.play-btn i');
    playBtn.className = 'fas fa-play';
    isPlaying = false;
}

// 佩戴展示控制
function showWearGallery() {
    const gallery = document.querySelector('.wear-gallery');
    gallery.style.display = 'flex';
    // 添加进入动画
    gallery.style.opacity = '0';
    setTimeout(() => {
        gallery.style.opacity = '1';
        gallery.style.transition = 'opacity 0.3s ease';
    }, 10);
}

function closeGallery() {
    const gallery = document.querySelector('.wear-gallery');
    gallery.style.opacity = '0';
    setTimeout(() => {
        gallery.style.display = 'none';
    }, 300);
}

// 私人定制功能
function showCustomization() {
    const emailDiv = document.querySelector('.customization-email');
    emailDiv.style.display = 'block';
    // 添加一个小延迟以确保过渡动画生效
    setTimeout(() => {
        emailDiv.classList.add('show');
    }, 10);
}

// 祭祀展示控制
function showRitualGallery() {
    const gallery = document.querySelector('.ritual-gallery');
    gallery.style.display = 'flex';
    // 添加进入动画
    gallery.style.opacity = '0';
    setTimeout(() => {
        gallery.style.opacity = '1';
        gallery.style.transition = 'opacity 0.3s ease';
    }, 10);
}

function closeRitualGallery() {
    const gallery = document.querySelector('.ritual-gallery');
    gallery.style.opacity = '0';
    setTimeout(() => {
        gallery.style.display = 'none';
    }, 300);
}

// 祭祀私人定制功能
function showRitualCustomization() {
    const emailDiv = document.querySelector('.ritual-gallery .customization-email');
    emailDiv.style.display = 'block';
    // 添加一个小延迟以确保过渡动画生效
    setTimeout(() => {
        emailDiv.classList.add('show');
    }, 10);
}

// 朝圣展示控制
function showPilgrimageGallery() {
    const gallery = document.querySelector('.pilgrimage-gallery');
    gallery.style.display = 'flex';
    // 添加进入动画
    gallery.style.opacity = '0';
    setTimeout(() => {
        gallery.style.opacity = '1';
        gallery.style.transition = 'opacity 0.3s ease';
    }, 10);
}

function closePilgrimageGallery() {
    const gallery = document.querySelector('.pilgrimage-gallery');
    gallery.style.opacity = '0';
    setTimeout(() => {
        gallery.style.display = 'none';
    }, 300);
}

// 朝圣私人定制功能
function showPilgrimageCustomization() {
    const emailDiv = document.querySelector('.pilgrimage-gallery .customization-email');
    emailDiv.style.display = 'block';
    // 添加一个小延迟以确保过渡动画生效
    setTimeout(() => {
        emailDiv.classList.add('show');
    }, 10);
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 添加鼠标移动轨迹效果
    document.addEventListener('mousemove', (e) => {
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        trail.style.left = e.pageX + 'px';
        trail.style.top = e.pageY + 'px';
        document.body.appendChild(trail);

        gsap.to(trail, {
            opacity: 0,
            scale: 2,
            duration: 1,
            ease: "power2.out",
            onComplete: () => trail.remove()
        });
    });
}); 