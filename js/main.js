class Modal {
    constructor(modalId) {
        this.modal = document.getElementById(modalId);
        this.closeBtn = document.querySelector('.close');
        this.init();
    }
    init() {
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.close();
                }
            });
        }
    }
    open() {
        if (this.modal) {
            this.modal.style.display = 'block';
        }
    }
    close() {
        if (this.modal) {
            this.modal.style.display = 'none';
        }
    }
}
class ApiService {
    constructor() {
        this.baseUrl = 'https://jsonplaceholder.typicode.com';
    }
    async fetchUsers() {
        try {
            const response = await fetch(`${this.baseUrl}/users`);
            const users = await response.json();
            return users;
        }
        catch (error) {
            console.error('Помилка завантаження користувачів:', error);
            return [];
        }
    }
    async fetchPosts() {
        try {
            const response = await fetch(`${this.baseUrl}/posts?_limit=5`);
            const posts = await response.json();
            return posts;
        }
        catch (error) {
            console.error('Помилка завантаження постів:', error);
            return [];
        }
    }
}
class UIRenderer {
    renderUsers(users, containerId) {
        const container = document.getElementById(containerId);
        if (!container)
            return;
        container.innerHTML = users.map((user) => `
            <div class="user-card">
                <h3>${user.name}</h3>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Телефон:</strong> ${user.phone}</p>
            </div>
        `).join('');
    }
    renderPosts(posts, containerId) {
        const container = document.getElementById(containerId);
        if (!container)
            return;
        container.innerHTML = posts.map((post) => `
            <div class="post-card">
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            </div>
        `).join('');
    }
    showLoading(containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = '<div class="loading">Завантаження...</div>';
        }
    }
}
class ScrollManager {
    constructor(headerId) {
        this.lastScrollTop = 0;
        this.header = document.querySelector(headerId);
        this.init();
    }
    init() {
        window.addEventListener('scroll', () => this.handleScroll());
    }
    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (this.header) {
            if (scrollTop > this.lastScrollTop && scrollTop > 100) {
                this.header.classList.add('hidden');
            }
            else {
                this.header.classList.remove('hidden');
            }
        }
        this.lastScrollTop = scrollTop;
    }
}
function init() {
    const modal = new Modal('modal');
    const apiService = new ApiService();
    const uiRenderer = new UIRenderer();
    const scrollManager = new ScrollManager('header');
    const openModalBtn = document.getElementById('openModal');
    if (openModalBtn) {
        openModalBtn.addEventListener('click', () => modal.open());
    }
    const loadUsersBtn = document.getElementById('loadUsers');
    if (loadUsersBtn) {
        loadUsersBtn.addEventListener('click', async () => {
            uiRenderer.showLoading('usersList');
            const users = await apiService.fetchUsers();
            uiRenderer.renderUsers(users, 'usersList');
        });
    }
    const loadPostsBtn = document.getElementById('loadPosts');
    if (loadPostsBtn) {
        loadPostsBtn.addEventListener('click', async () => {
            uiRenderer.showLoading('postsList');
            const posts = await apiService.fetchPosts();
            uiRenderer.renderPosts(posts, 'postsList');
        });
    }
    document.addEventListener('DOMContentLoaded', () => {
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.classList.add('visible');
            }, index * 100);
        });
    });
}
init();
export {};
//# sourceMappingURL=main.js.map