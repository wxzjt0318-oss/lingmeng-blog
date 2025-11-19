// public/scripts/visitorbook-loader.js
// 动态加载留言板面板（点击 #visitorbook 时触发）

(function () {
  let hasLoaded = false;

  function loadVisitorBook() {
    const container = document.getElementById('visitorbook-container');
    if (!container || hasLoaded) return;

    // 插入完整的留言板 HTML 结构（匹配你的设计）
    container.innerHTML = `
      <div class="visitorbook-panel">
        <div class="header">
          <span class="icon">💬</span>
          <h2>留言板</h2>
        </div>
        <p class="intro">欢迎来到留言板！这里是一个自由交流的空间，你可以：</p>
        <ul class="features-list">
          <li><span class="emoji">💬</span> 分享你的想法和观点</li>
          <li><span class="emoji">📝</span> 留下你的建议和反馈</li>
          <li><span class="emoji">🎨</span> 记录你的心情和故事</li>
          <li><span class="emoji">🤝</span> 与其他访客互动交流</li>
        </ul>
        <p class="welcome-text">无论你想说什么，都欢迎在下方评论区留言！</p>
        
        <div class="divider"></div>
        
        <div class="notice-section">
          <p class="notice-title">温馨提示：</p>
          <ul class="notice-list">
            <li>请保持友善和尊重，营造良好的交流氛围</li>
            <li>欢迎分享你的想法，也可以提出对网站的建议</li>
            <li>你的每一条留言都是对我最大的支持 ✨</li>
          </ul>
        </div>
        
        <div class="divider"></div>
        
        <div id="twikoo"></div>
      </div>
    `;

    // 注入所需样式（防止重复）
    injectStyles();

    // 延迟初始化 Twikoo（确保 DOM 已就绪）
    setTimeout(() => {
      loadTwikoo();
    }, 150);

    hasLoaded = true;
  }

  function injectStyles() {
    const styleId = 'visitorbook-dynamic-style';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .visitorbook-panel {
        max-width: 800px;
        margin: 2rem auto;
        padding: 1.5rem;
        background: #f8f9fa;
        border-radius: 16px;
        border: 1px solid #e9ecef;
        box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        line-height: 1.7;
        color: #333;
      }
      .header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }
      .header h2 {
        font-size: 1.3rem;
        margin: 0;
        font-weight: 500;
        color: #333;
      }
      .icon {
        font-size: 1.2rem;
        color: #6c757d;
      }
      .intro, .welcome-text {
        color: #666;
        font-size: 0.95rem;
        margin: 1rem 0;
      }
      .features-list, .notice-list {
        list-style: none;
        padding-left: 0;
        margin: 1rem 0;
      }
      .features-list li, .notice-list li {
        margin: 0.6rem 0;
        display: flex;
        align-items: center;
        font-size: 0.95rem;
        color: #555;
      }
      .emoji {
        margin-right: 0.6rem;
        font-size: 1rem;
      }
      .notice-title {
        font-size: 0.9rem;
        color: #495057;
        font-weight: 500;
        margin-bottom: 0.5rem;
      }
      .divider {
        height: 1px;
        background: linear-gradient(90deg, transparent, #e9ecef, transparent);
        margin: 1.5rem 0;
      }
      #twikoo {
        margin-top: 1.5rem;
        width: 100%;
        min-height: 250px;
      }

      @media (max-width: 768px) {
        .visitorbook-panel {
          padding: 1rem;
        }
        .header h2 {
          font-size: 1.2rem;
        }
        .features-list li,
        .notice-list li {
          font-size: 0.9rem;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function loadTwikoo() {
    if (window.twikoo) {
      window.twikoo.init({
        envId: "https://twikoo-api-gmgc.vercel.app/",
        el: '#twikoo',
        path: '/',
        lang: 'zh-CN'
      });
      return;
    }

    // 动态加载 Twikoo SDK
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/twikoo@latest/dist/twikoo.all.min.js';
    script.defer = true;
    script.onload = () => {
      if (typeof window.twikoo !== 'undefined') {
        window.twikoo.init({
          envId: "https://twikoo-api-gmgc.vercel.app/",
          el: '#twikoo',
          path: '/',
          lang: 'zh-CN'
        });
      }
    };
    document.body.appendChild(script);
  }

  // 🌐 支持浏览器前进/后退（hash 变化）
  window.addEventListener('hashchange', () => {
    if (location.hash === '#visitorbook') {
      loadVisitorBook();
      const target = document.getElementById('visitorbook');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });

  // 📄 页面加载时检查是否带 #visitorbook
  if (location.hash === '#visitorbook') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadVisitorBook);
    } else {
      loadVisitorBook();
    }
  }

  // 🔗 拦截点击“留言版”链接的行为
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href="#visitorbook"]');
    if (link) {
      e.preventDefault();
      loadVisitorBook();
      setTimeout(() => {
        const target = document.getElementById('visitorbook');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  });
})();
