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
    }, 5000);
}

function setLoading(isLoading) {
    const registerBtn = document.querySelector('.register-btn');
    const socialBtns = document.querySelectorAll('.social-btn');
    
    if (isLoading) {
        registerBtn.innerHTML = '<div style="width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3); border-top: 2px solid #fff; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>';
        registerBtn.disabled = true;
        socialBtns.forEach(btn => btn.disabled = true);
        
        // Add spinner animation CSS if not already present
        if (!document.querySelector('#spinner-styles')) {
            const style = document.createElement('style');
            style.id = 'spinner-styles';
            style.textContent = `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
    } else {
        registerBtn.innerHTML = 'Create Account';
        registerBtn.disabled = false;
        socialBtns.forEach(btn => btn.disabled = false);
    }
}

// Main signup handler
async function handleSignup(email, password, confirmPassword) {
    // Validation
    if (!email || !password || !confirmPassword) {
        showError('Please fill in all fields');
        return;
    }

    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }

    if (password.length < 6) {
        showError('Password must be at least 6 characters long');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('Please enter a valid email address');
        return;
    }

    setLoading(true);
    
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                emailRedirectTo: `${window.location.origin}/login.html`,
                data: {
                    full_name: email.split('@')[0] // Extract name from email
                }
            }
        });

        if (error) {
            throw error;
        }

        // Instead of showing success popup, redirect to verification page
        if (data.user && !data.user.email_confirmed_at) {
            // Show loading spinner briefly, then redirect
            setTimeout(() => {
                window.location.href = `email-verification.html?email=${encodeURIComponent(email)}`;
            }, 1000);
        } else {
            // User is already confirmed (unlikely for new signups)
            showSuccess('Account created successfully!');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        }

        // Reset form
        document.querySelector('.register-form').reset();

    } catch (error) {
        console.error('Signup error:', error);
        showError(error.message || 'An unexpected error occurred');
    } finally {
        setLoading(false);
    }
}

// Social authentication handlers
async function handleGoogleSignup() {
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
        console.error('Google signup error:', error);
        showError(error.message || 'Google signup failed');
        setLoading(false);
    }
}

async function handleAppleSignup() {
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
        console.error('Apple signup error:', error);
        showError(error.message || 'Apple signup failed');
        setLoading(false);
    }
}

async function handleFacebookSignup() {
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
        console.error('Facebook signup error:', error);
        showError(error.message || 'Facebook signup failed');
        setLoading(false);
    }
}

// Password toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const passwordToggles = document.querySelectorAll('.toggle-password');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const isPassword = input.type === 'password';
            
            // Toggle input type
            input.type = isPassword ? 'text' : 'password';
            
            // Update icon
            const svg = this.querySelector('svg path');
            if (isPassword) {
                // Show "eye-off" icon
                svg.setAttribute('d', 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z');
            } else {
                // Show "eye" icon
                svg.setAttribute('d', 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z');
            }
        });
    });
    
    // Form submission handling
    const registerForm = document.querySelector('.register-form');
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const email = document.querySelector('input[type="email"]').value;
        const password = document.querySelector('input[placeholder="Password"]').value;
        const confirmPassword = document.querySelector('input[placeholder="Confirm Password"]').value;
        
        // Call the async signup handler
        handleSignup(email, password, confirmPassword);
    });
    
    // Social login handlers
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.classList.contains('google')) {
                handleGoogleSignup();
            } else if (this.classList.contains('facebook')) {
                handleFacebookSignup();
            } else if (this.classList.contains('apple')) {
                handleAppleSignup();
            }
        });
    });
    
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
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .input-group.focused input {
            border-color: #6366f1;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        
        .register-btn:disabled {
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
