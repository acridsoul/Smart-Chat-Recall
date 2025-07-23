// Import Supabase client
import { supabase } from './js/supabase.js'

// Utility functions for UI feedback
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ef4444, #dc2626);
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        z-index: 1000;
        font-weight: 500;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => errorDiv.remove(), 300);
    }, 5000);
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        z-index: 1000;
        font-weight: 500;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;
    successDiv.textContent = message;
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => successDiv.remove(), 300);
    }, 3000);
}

function setLoading(isLoading) {
    const loginBtn = document.querySelector('.login-btn');
    const socialBtns = document.querySelectorAll('.social-btn');
    
    if (isLoading) {
        loginBtn.textContent = 'Logging in...';
        loginBtn.disabled = true;
        socialBtns.forEach(btn => btn.disabled = true);
    } else {
        loginBtn.textContent = 'Log In';
        loginBtn.disabled = false;
        socialBtns.forEach(btn => btn.disabled = false);
    }
}

// Main login handler
async function handleLogin(email, password, rememberMe) {
    // Validation
    if (!email || !password) {
        showError('Please fill in all fields');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('Please enter a valid email address');
        return;
    }

    if (password.length < 6) {
        showError('Password must be at least 6 characters long');
        return;
    }

    setLoading(true);
    
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            throw error;
        }

        // Store remember me preference
        if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('userEmail', email);
        } else {
            localStorage.removeItem('rememberMe');
            localStorage.removeItem('userEmail');
        }
        
        showSuccess('Login successful! Welcome back!');
        
        // Redirect to main app after short delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);

    } catch (error) {
        console.error('Login error:', error);
        let errorMessage = 'Login failed. Please try again.';
        
        // Handle specific error cases
        if (error.message === 'Invalid login credentials') {
            errorMessage = 'Invalid email or password. Please check your credentials.';
        } else if (error.message === 'Email not confirmed') {
            errorMessage = 'Please check your email and confirm your account first.';
        } else if (error.message) {
            errorMessage = error.message;
        }
        
        showError(errorMessage);
    } finally {
        setLoading(false);
    }
}

// Social authentication handlers
async function handleGoogleLogin() {
    setLoading(true);
    
    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/index.html`
            }
        });
        
        if (error) {
            throw error;
        }
        
        // OAuth redirect will handle the rest
    } catch (error) {
        console.error('Google login error:', error);
        showError(error.message || 'Google login failed');
        setLoading(false);
    }
}

async function handleAppleLogin() {
    setLoading(true);
    
    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'apple',
            options: {
                redirectTo: `${window.location.origin}/index.html`
            }
        });
        
        if (error) {
            throw error;
        }
        
        // OAuth redirect will handle the rest
    } catch (error) {
        console.error('Apple login error:', error);
        showError(error.message || 'Apple login failed');
        setLoading(false);
    }
}

async function handleFacebookLogin() {
    setLoading(true);
    
    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'facebook',
            options: {
                redirectTo: `${window.location.origin}/index.html`
            }
        });
        
        if (error) {
            throw error;
        }
        
        // OAuth redirect will handle the rest
    } catch (error) {
        console.error('Facebook login error:', error);
        showError(error.message || 'Facebook login failed');
        setLoading(false);
    }
}

// Password toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const rememberCheckbox = document.querySelector('#remember');
    const emailInput = document.querySelector('input[type="email"]');
    const loginForm = document.querySelector('.login-form');
    
    // Check and restore remember me preference
    if (localStorage.getItem('rememberMe') === 'true') {
        rememberCheckbox.checked = true;
        const savedEmail = localStorage.getItem('userEmail');
        if (savedEmail) {
            emailInput.value = savedEmail;
        }
    }
    
    const passwordToggle = document.querySelector('.toggle-password');
    
    if (passwordToggle) {
        passwordToggle.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const isPassword = input.type === 'password';
            
            // Toggle input type
            input.type = isPassword ? 'text' : 'password';
            
            // Update icon
            const svg = this.querySelector('svg path');
            if (isPassword) {
                // Show "eye-off" icon when password is visible
                svg.setAttribute('d', 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z');
            } else {
                // Show "eye" icon when password is hidden
                svg.setAttribute('d', 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z');
            }
        });
    }
    
    // Form submission handling
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const email = emailInput.value;
        const password = document.querySelector('input[type="password"]').value;
        const rememberMe = rememberCheckbox.checked;
        
        // Call the async login handler
        handleLogin(email, password, rememberMe);
    });
    
    // Social login handlers - real Supabase integration
    const googleBtn = document.querySelector('.social-btn.google');
    const facebookBtn = document.querySelector('.social-btn.facebook');
    const appleBtn = document.querySelector('.social-btn.apple');
    
    if (googleBtn) {
        googleBtn.addEventListener('click', handleGoogleLogin);
    }
    if (facebookBtn) {
        facebookBtn.addEventListener('click', handleFacebookLogin);
    }
    if (appleBtn) {
        appleBtn.addEventListener('click', handleAppleLogin);
    }
    
    // Input focus animations
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
    
    // Contact support handler
    const contactSupport = document.querySelector('.contact-support');
    if (contactSupport) {
        contactSupport.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Contact support would be implemented here');
        });
    }
    
    // Add spinning animation keyframes to document
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .input-group.focused input {
            border-color: #6366f1;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        
        .login-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
        
        .social-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
    `;
    document.head.appendChild(style);
});
