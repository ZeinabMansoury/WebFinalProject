// script.js - برای همه صفحات مشترک است
document.addEventListener('DOMContentLoaded', function() {
    // بررسی وجود عناصر در صفحه
    const employerBtn = document.getElementById('employerBtn');
    const seekerBtn = document.getElementById('seekerBtn');
    const loginBtn = document.getElementById('login');
    const signupBtn = document.getElementById('signup');
    const ctaRegisterBtn = document.getElementById('ctaRegister');
    
    // مدیریت دکمه‌های صفحه اصلی
    if (employerBtn && seekerBtn) {
        employerBtn.addEventListener('click', function() {
            window.location.href = 'login.html?role=employer';
        });
        
        seekerBtn.addEventListener('click', function() {
            window.location.href = 'login.html?role=seeker';
        });
    }
    
    // مدیریت دکمه‌های لاگین/ثبت‌نام در هدر
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            window.location.href = 'login.html';
        });
    }
    
    if (signupBtn || ctaRegisterBtn) {
        const registerHandler = function() {
            window.location.href = 'signup.html';
        };
        
        if (signupBtn) signupBtn.addEventListener('click', registerHandler);
        if (ctaRegisterBtn) ctaRegisterBtn.addEventListener('click', registerHandler);
    }
    
    // مدیریت نقش‌ها در صفحه لاگین
    const roleButtons = document.querySelectorAll('.role-btn');
    const userRoleInput = document.getElementById('userRole');
    
    if (roleButtons.length > 0 && userRoleInput) {
        // دریافت پارامتر role از URL
        const urlParams = new URLSearchParams(window.location.search);
        const role = urlParams.get('role');
        
        // تنظیم نقش پیش‌فرض
        roleButtons.forEach(btn => {
            if (btn.dataset.role === role) {
                btn.classList.add('active');
                userRoleInput.value = role;
            }
            
            // مدیریت کلیک روی دکمه‌های نقش
            btn.addEventListener('click', function() {
                roleButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                userRoleInput.value = this.dataset.role;
            });
        });
        
        // اگر نقشی انتخاب نشده، پیش‌فرض seeker باشد
        if (!role && userRoleInput.value === '') {
            const defaultBtn = document.querySelector('.role-btn[data-role="seeker"]');
            if (defaultBtn) {
                defaultBtn.classList.add('active');
                userRoleInput.value = 'seeker';
            }
        }
    }
});