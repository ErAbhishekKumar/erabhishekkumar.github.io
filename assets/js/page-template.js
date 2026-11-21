/**
 * Page Template Helper - Common functions for page modernization
 * Include this in modernized pages for common functionality
 */

(function() {
  'use strict';

  // Common page initialization
  function initPage(pageConfig = {}) {
    // Add common meta tags if not present
    if (!document.querySelector('meta[name="viewport"]')) {
      const viewport = document.createElement('meta');
      viewport.name = 'viewport';
      viewport.content = 'width=device-width, initial-scale=1.0';
      document.head.appendChild(viewport);
    }

    // Add canonical link if not present
    if (!document.querySelector('link[rel="canonical"]')) {
      const canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = window.location.href;
      document.head.appendChild(canonical);
    }

    // Add description if not present
    if (!document.querySelector('meta[name="description"]') && pageConfig.description) {
      const desc = document.createElement('meta');
      desc.name = 'description';
      desc.content = pageConfig.description;
      document.head.appendChild(desc);
    }

    // Add title if not present
    if (!document.title && pageConfig.title) {
      document.title = pageConfig.title;
    }

    // Initialize modern design system components
    if (window.LogicalAbhishek) {
      window.LogicalAbhishek.ThemeManager.init();
      window.LogicalAbhishek.MobileNav.init();
      window.LogicalAbhishek.ScrollEffects.init();
      window.LogicalAbhishek.CardTilt.init();
      window.LogicalAbhishek.DonateHandler.init();
      window.LogicalAbhishek.NotificationMarquee.init();
    }

    // Add scroll-top button if missing
    if (!document.querySelector('.scroll-top')) {
      const btn = document.createElement('button');
      btn.className = 'scroll-top';
      btn.setAttribute('aria-label', 'Scroll to top');
      btn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 15l-6-6-6 6"/></svg>';
      document.body.appendChild(btn);
      if (window.LogicalAbhishek && window.LogicalAbhishek.ScrollEffects) {
        window.LogicalAbhishek.ScrollEffects.init();
      }
    }

    // Add theme toggle if not present
    if (!document.querySelector('[data-theme-toggle]') && pageConfig.showThemeToggle !== false) {
      const toggle = document.createElement('button');
      toggle.className = 'theme-toggle';
      toggle.setAttribute('data-theme-toggle', '');
      toggle.setAttribute('aria-label', 'Toggle theme');
      toggle.innerHTML = `
        <svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
        <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
      document.body.appendChild(toggle);
      if (window.LogicalAbhishek && window.LogicalAbhishek.ThemeManager) {
        window.LogicalAbhishek.ThemeManager.init();
      }
    }

    // Initialize scroll effects
    initScrollAnimations();

    console.log('[Logical Abhishek] Page initialized:', document.title);
  }

  // Scroll reveal animations
  function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.card-3d, .tool-card, .section-header, .hero-content > *, .fade-in');
    if ('IntersectionObserver' in window && revealElements.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

      revealElements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease-out ${i * 50}ms, transform 0.6s ease-out ${i * 50}ms`;
        observer.observe(el);
      });
    }
  }

  // Common utility functions
  const Utils = {
    // Show loading state
    showLoading: (container) => {
      if (container) {
        container.innerHTML = `
          <div class="loading-overlay">
            <div class="spinner"></div>
            <div class="loading-text">Loading...</div>
          </div>
        `;
      }
    },

    // Hide loading state
    hideLoading: (container) => {
      if (container) {
        const loader = container.querySelector('.loading-overlay');
        if (loader) loader.remove();
      }
    },

    // Show toast notification
    showToast: (message, type = 'info', duration = 3000) => {
      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      toast.textContent = message;
      toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 12px 24px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        background: ${type === 'error' ? '#ff3d5a' : type === 'success' ? '#00e676' : type === 'warning' ? '#ffab00' : '#00d4ff'};
      `;

      // Add animation styles if not present
      if (!document.getElementById('toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
          @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
          }
        `;
        document.head.appendChild(style);
      }

      document.body.appendChild(toast);

      setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => toast.remove(), 300);
      }, duration);
    },

    // Debounce function
    debounce: (func, wait) => {
      let timeout;
      return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    },

    // Throttle function
    throttle: (func, limit) => {
      let inThrottle;
      return function(...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    },

    // Format number with commas
    formatNumber: (num) => {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    // Copy to clipboard
    copyToClipboard: async (text) => {
      try {
        await navigator.clipboard.writeText(text);
        Utils.showToast('Copied to clipboard!', 'success');
      } catch (err) {
        Utils.showToast('Failed to copy', 'error');
      }
    }
  };

  // Export for use in pages
  window.PageInit = initPage;
  window.PageUtils = Utils;

  // Auto-initialize if not already initialized
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (!window.pageInitialized) {
        initPage();
        window.pageInitialized = true;
      }
    });
  } else {
    if (!window.pageInitialized) {
      initPage();
      window.pageInitialized = true;
    }
  }

  // Export for manual use
  window.LogicalAbhishek.PageUtils = Utils;
})();