document.getElementById('login').onclick = function() {
    window.location.href = 'login.html'
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    const isValidEmail = (value) => 
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        [emailError, passwordError].forEach((el) => {
            el.textContent = "";
            el.classList.remove("show");
        });
        [emailInput, passwordInput].forEach((inp) =>
            inp.classList.remove("error-field")
        );

        let hasError = false;

        const emailVal = emailInput.value.trim();
        if (!emailVal) {
          emailError.textContent = "ایمیل یا نام کاربری را وارد کنید.";
          emailError.classList.add("show");
          emailInput.classList.add("error-field");
          hasError = true;
        } else if (!isValidEmail(emailVal) && !emailVal.includes(" ")) {
          emailError.textContent = "فرمت ایمیل معتبر نیست.";
          emailError.classList.add("show");
          emailInput.classList.add("error-field");
          hasError = true;
        }


        const passVal = passwordInput.value.trim();
        if (!passVal) {
          passwordError.textContent = "رمز عبور را وارد کنید.";
          passwordError.classList.add("show");
          passwordInput.classList.add("error-field");
          hasError = true;
        } else if (passVal.length < 6) {
          passwordError.textContent = "رمز باید حداقل ۶ کاراکتر باشد.";
          passwordError.classList.add("show");
          passwordInput.classList.add("error-field");
          hasError = true;
        }


        if (!hasError) {
          emailInput.disabled = passwordInput.disabled = true;
          const btn = form.querySelector("button");
          btn.textContent = "Signing in…";
          btn.disabled = true;
    
          setTimeout(() => {
            alert("Login successful!");
            window.location.href = "dashboard.html"; 
          }, 1000);
        }
    })
})