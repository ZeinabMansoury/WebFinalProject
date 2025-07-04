document.addEventListener('DOMContentLoaded', function() {
    const employerBtn = document.getElementById('employerBtn');
    const seekerBtn = document.getElementById('seekerBtn');
    const loginBtn = document.getElementById('login');
    const signupBtn = document.getElementById('signup');
    const ctaRegisterBtn = document.getElementById('ctaRegister');
    
    if (employerBtn && seekerBtn) {
        employerBtn.addEventListener('click', function() {
            window.location.href = 'login.html?role=employer';
        });
        
        seekerBtn.addEventListener('click', function() {
            window.location.href = 'login.html?role=seeker';
        });
    }
    
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

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        const roleButtons = document.querySelectorAll('.role-btn');
        const userRoleInput = document.getElementById('userRole');
        
        const urlParams = new URLSearchParams(window.location.search);
        const roleParam = urlParams.get('role');
        
        if (roleParam) {
            document.querySelector(`.role-btn[data-role="${roleParam}"]`)?.classList.add('active');
            userRoleInput.value = roleParam;
        } else {
            document.querySelector('.role-btn[data-role="seeker"]')?.classList.add('active');
            userRoleInput.value = 'seeker';
        }
        
        roleButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                roleButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                userRoleInput.value = this.dataset.role;
            });
        });
        
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const role = userRoleInput.value;
            
            if (!email || !password || !role) {
                alert('لطفاً تمام فیلدها را پر کنید و نقش خود را انتخاب نمایید');
                return;
            }
            
            console.log('ورود با:', { email, password, role });
        });
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        const roleButtons = document.querySelectorAll('.role-btn');
        const userRoleInput = document.getElementById('userRole');
        const submitBtn = document.getElementById('submitBtn');
        const submitText = document.getElementById('submitText');
        const submitSpinner = document.getElementById('submitSpinner');
        const successMessage = document.getElementById('successMessage');
        
        roleButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                roleButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                userRoleInput.value = this.dataset.role;
            });
        });
        
        signupForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            submitBtn.disabled = true;
            submitText.textContent = 'در حال پردازش...';
            submitSpinner.style.display = 'inline-block';
            
            const formData = {
                username: document.getElementById('username').value.trim(),
                firstName: document.getElementById('firstName').value.trim(),
                lastName: document.getElementById('lastName').value.trim(),
                email: document.getElementById('email').value.trim(),
                password: document.getElementById('password').value,
                confirmPassword: document.getElementById('confirmPassword').value,
                role: userRoleInput.value
            };
            
            const errors = validateSignupForm(formData);
            if (errors.length > 0) {
                alert(errors.join('\n'));
                submitBtn.disabled = false;
                submitText.textContent = 'ثبت نام';
                submitSpinner.style.display = 'none';
                return;
            }
            
            try {
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                successMessage.style.display = 'block';
                signupForm.style.display = 'none';
                
                setTimeout(() => {
                    window.location.href = `login.html?role=${formData.role}`;
                }, 2000);
            } catch (error) {
                console.error('خطا در ثبت نام:', error);
                alert('خطایی در ثبت نام رخ داد. لطفاً مجدداً تلاش کنید.');
                submitBtn.disabled = false;
                submitText.textContent = 'ثبت نام';
                submitSpinner.style.display = 'none';
            }
        });
        
        function validateSignupForm(data) {
            const errors = [];
            
            if (!data.username || data.username.length < 4) {
                errors.push('نام کاربری باید حداقل ۴ کاراکتر باشد');
            }
            
            if (!data.firstName) {
                errors.push('لطفاً نام خود را وارد کنید');
            }
            
            if (!data.lastName) {
                errors.push('لطفاً نام خانوادگی خود را وارد کنید');
            }
            
            if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
                errors.push('لطفاً یک ایمیل معتبر وارد کنید');
            }
            
            if (!data.password || data.password.length < 8) {
                errors.push('رمز عبور باید حداقل ۸ کاراکتر باشد');
            }
            
            if (data.password !== data.confirmPassword) {
                errors.push('رمزهای عبور وارد شده مطابقت ندارند');
            }
            
            if (!data.role) {
                errors.push('لطفاً نقش خود را انتخاب کنید');
            }
            
            return errors;
        }
    }
});