// Client-side auth helper for the existing login/signup forms
(function () {
  async function postJson(url, data) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json().then(body => ({ ok: res.ok, status: res.status, body }));
  }

  // Signup
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('signupUsername').value.trim();
      const email = document.getElementById('signupEmail').value.trim();
      const password = document.getElementById('signupPassword').value;
      const confirm = document.getElementById('signupConfirmPassword').value;
      if (password !== confirm) return alert('Passwords do not match');

      const { ok, body } = await postJson('/api/auth/signup', { username, email, password });
      if (!ok) return alert(body.message || 'Signup failed');
      // Save token to localStorage and redirect
      localStorage.setItem('token', body.token);
      window.location.href = 'home.html';
    });
  }

  // Login
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;

      const { ok, body } = await postJson('/api/auth/login', { email, password });
      if (!ok) return alert(body.message || 'Login failed');
      localStorage.setItem('token', body.token);
      window.location.href = 'home.html';
    });
  }

  // Password visibility toggles for any password input on the page
  function addPasswordToggles() {
    const pwdInputs = Array.from(document.querySelectorAll('input[type="password"]'));
    pwdInputs.forEach(input => {
      const container = input.closest('.input-group') || input.parentElement;
      if (!container) return;

      // Avoid adding multiple toggles
      if (container.querySelector('.password-toggle')) return;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'password-toggle';
      btn.setAttribute('aria-label', 'Show password');
      btn.textContent = 'Show';

      btn.addEventListener('click', () => {
        if (input.type === 'password') {
          input.type = 'text';
          btn.textContent = 'Hide';
          btn.setAttribute('aria-label', 'Hide password');
        } else {
          input.type = 'password';
          btn.textContent = 'Show';
          btn.setAttribute('aria-label', 'Show password');
        }
        input.focus();
      });

      // Position the button inside the input-group
      container.style.position = container.style.position || 'relative';
      container.appendChild(btn);
    });
  }

  // Run on DOM ready (forms are already present) and also after any dynamic changes
  addPasswordToggles();

})();
