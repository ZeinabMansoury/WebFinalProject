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
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');
        
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
            
            emailError.textContent = '';
            passwordError.textContent = '';
            
            let isValid = true;
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            const role = userRoleInput.value;
            
            if (!email) {
                emailError.textContent = 'Username or email is required';
                isValid = false;
            }
            
            if (!password) {
                passwordError.textContent = 'Password is required';
                isValid = false;
            } else if (password.length < 6) {
                passwordError.textContent = 'Password must be at least 6 characters';
                isValid = false;
            }
            
            if (!role) {
                alert('Please select your role (Job Seeker or Employer)');
                isValid = false;
            }
            
            if (isValid) {
                console.log('Log attempt with:', {email, password, role});
                
                if (role === 'employer') {
                    window.location.href = 'employer_dashboard.html';
                } else if (role === 'seeker') {
                    window.location.href = 'seeker_dashboard.html';
                }
            }
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
            submitText.textContent = 'Processing...';
            submitSpinner.style.display = 'inline-block';
            
            const formData = {
                username: document.getElementById('username').value.trim(),
                firstName: document.getElementById('firstName').value.trim(),
                lastName: document.getElementById('lastName').value.trim(),
                email: document.getElementById('email').value.trim(),
                password: document.getElementById('password').value.trim(),
                confirmPassword: document.getElementById('confirmPassword').value.trim(),
                role: userRoleInput.value
            };
            
            const errors = validateSignupForm(formData);
            if (errors.length > 0) {
                showSignupErrors(errors);
                submitBtn.disabled = false;
                submitText.textContent = 'Register';
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
                console.error('Registration error:', error);
                alert('An error occurred during registration. Please try again.');
                submitBtn.disabled = false;
                submitText.textContent = 'Register';
                submitSpinner.style.display = 'none';
            }
        });
        
        function validateSignupForm(data) {
            const errors = [];
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!data.username || data.username.length < 4) {
                errors.push({ field: 'username', message: 'Username must be at least 4 characters' });
            }
            
            if (!data.firstName) {
                errors.push({ field: 'firstName', message: 'First name is required' });
            }
            
            if (!data.lastName) {
                errors.push({ field: 'lastName', message: 'Last name is required' });
            }
            
            if (!data.email) {
                errors.push({ field: 'email', message: 'Email is required' });
            } else if (!emailRegex.test(data.email)) {
                errors.push({ field: 'email', message: 'Please enter a valid email address' });
            }
            
            if (!data.password) {
                errors.push({ field: 'password', message: 'Password is required' });
            } else if (data.password.length < 8) {
                errors.push({ field: 'password', message: 'Password must be at least 8 characters' });
            }
            
            if (!data.confirmPassword) {
                errors.push({ field: 'confirmPassword', message: 'Please confirm your password' });
            } else if (data.password !== data.confirmPassword) {
                errors.push({ field: 'confirmPassword', message: 'Passwords do not match' });
            }
            
            if (!data.role) {
                errors.push({ field: 'role', message: 'Please select your role' });
            }
            
            return errors;
        }
        
        function showSignupErrors(errors) {
            document.querySelectorAll('.error').forEach(el => {
                el.textContent = '';
            });
            
            errors.forEach(error => {
                if (error.field === 'role') {
                    alert(error.message);
                } else {
                    const errorElement = document.getElementById(`${error.field}Error`);
                    if (errorElement) {
                        errorElement.textContent = error.message;
                    }
                }
            });
        }
    }


    const newJobBtn = document.querySelector('.new-job-btn');
    if (newJobBtn) {
        newJobBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'creat_job.html';
        });
    }

    const jobForm = document.getElementById('jobForm');
    if (jobForm) {
        jobForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Job post created successfully!');
            window.location.href = 'employer_dashboard.html';
        });
    }
});