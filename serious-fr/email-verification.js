// Import Supabase client
import { supabase } from './js/supabase.js';

// Helper functions for UI feedback
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; z-index: 1000; display: flex; align-items: center; padding: 12px 16px; background: rgba(239, 68, 68, 0.9); border: 1px solid rgba(239, 68, 68, 1); border-radius: 8px; color: white; backdrop-filter: blur(10px); box-shadow: 0 8px 25px rgba(239, 68, 68, 0.3);">
            <svg style="width: 20px; height: 20px; margin-right: 8px;" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            </svg>
            ${message}
        </div>
    `;
    
    document.body.appendChild(errorDiv.firstElementChild);
    
    setTimeout(() => {
        const toast = document.querySelector('[style*="position: fixed"][style*="top: 20px"]');
        if (toast) toast.remove();
    }, 5000);
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; z-index: 1000; display: flex; align-items: center; padding: 12px 16px; background: rgba(139, 92, 246, 0.9); border: 1px solid rgba(139, 92, 246, 1); border-radius: 8px; color: white; backdrop-filter: blur(10px); box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);">
            <svg style="width: 20px; height: 20px; margin-right: 8px;" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            ${message}
        </div>
    `;
    
    document.body.appendChild(successDiv.firstElementChild);
    
    setTimeout(() => {
        const toast = document.querySelector('[style*="position: fixed"][style*="top: 20px"]');
        if (toast) toast.remove();
    }, 5000);
}

function setLoading(isLoading, button) {
    if (isLoading) {
        button.disabled = true;
        button.innerHTML = '<span class="loading-spinner"></span>';
    } else {
        button.disabled = false;
        // Restore original text based on button ID
        if (button.id === 'login-btn') {
            button.innerHTML = 'Go to Login Page';
        } else if (button.id === 'resend-btn') {
            button.innerHTML = 'Resend Verification Email';
        }
    }
}

// Resend verification email function
async function handleResendEmail(email) {
    const resendBtn = document.getElementById('resend-btn');
    setLoading(true, resendBtn);
    
    try {
        const { data, error } = await supabase.auth.resend({
            type: 'signup',
            email: email,
            options: {
                emailRedirectTo: `${window.location.origin}/login.html`
            }
        });
        
        if (error) {
            throw error;
        }
        
        showSuccess('Verification email sent successfully! Please check your inbox.');
        
    } catch (error) {
        console.error('Resend email error:', error);
        showError(error.message || 'Failed to resend verification email. Please try again.');
    } finally {
        setLoading(false, resendBtn);
    }
}

// Page initialization
document.addEventListener('DOMContentLoaded', function() {
    // Get email from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    
    // Display user email
    const emailDisplay = document.getElementById('user-email');
    if (email) {
        emailDisplay.textContent = email;
    } else {
        emailDisplay.textContent = 'your-email@example.com';
    }
    
    // Login button handler
    const loginBtn = document.getElementById('login-btn');
    loginBtn.addEventListener('click', function() {
        window.location.href = 'login.html';
    });
    
    // Resend button handler
    const resendBtn = document.getElementById('resend-btn');
    resendBtn.addEventListener('click', function() {
        if (email) {
            handleResendEmail(email);
        } else {
            showError('No email address found. Please go back and sign up again.');
        }
    });
    
    // Contact support handler
    const contactLink = document.querySelector('.contact-link');
    if (contactLink) {
        contactLink.addEventListener('click', function(e) {
            e.preventDefault();
            showSuccess('Support contact feature coming soon!');
        });
    }
    
    // Listen for auth state changes only for email verification events
    supabase.auth.onAuthStateChange((event, session) => {
        // Only redirect if user actually verified their email (not just signed up)
        if (event === 'SIGNED_IN' && session && session.user.email_confirmed_at) {
            showSuccess('Email verified successfully! You can now log in.');
            // Don't auto-redirect - let user click "Go to Login Page" button
        }
    });
});
