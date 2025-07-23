// Import Supabase client
import { supabase } from './js/supabase.js';

// Helper functions for UI feedback
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-toast';
    errorDiv.innerHTML = `
        <div style="display: flex; align-items: center; padding: 12px 16px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 8px; color: #dc2626; margin: 16px 0;">
            <svg style="width: 20px; height: 20px; margin-right: 8px;" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            </svg>
            ${message}
        </div>
    `;
    
    const container = document.querySelector('.form-container') || document.body;
    container.insertBefore(errorDiv.firstElementChild, container.firstChild);
    
    setTimeout(() => {
        const toast = container.querySelector('.error-toast');
        if (toast) toast.remove();
    }, 5000);
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-toast';
    successDiv.innerHTML = `
        <div style="display: flex; align-items: center; padding: 12px 16px; background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.2); border-radius: 8px; color: #16a34a; margin: 16px 0;">
            <svg style="width: 20px; height: 20px; margin-right: 8px;" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            ${message}
        </div>
    `;
    
    const container = document.querySelector('.form-container') || document.body;
    container.insertBefore(successDiv.firstElementChild, container.firstChild);
    
    setTimeout(() => {
        const toast = container.querySelector('.success-toast');
        if (toast) toast.remove();
    }, 5000);
}

function setLoading(isLoading, button = null) {
    if (button) {
        if (isLoading) {
            button.disabled = true;
            button.innerHTML = '<div style="width: 20px; height: 20px; border: 2px solid #fff; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>';
        } else {
            button.disabled = false;
            // Restore original text based on button context
            if (button.classList.contains('reset-btn')) {
                button.innerHTML = 'Send Reset Email';
            } else if (button.classList.contains('resend-btn')) {
                button.innerHTML = 'Resend Email';
            } else if (button.classList.contains('update-btn')) {
                button.innerHTML = 'Update Password';
            }
        }
    }
}

// Main reset password function
async function handlePasswordReset(email) {
    const resetBtn = document.querySelector('.reset-btn');
    setLoading(true, resetBtn);
    
    try {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password.html`
        });
        
        if (error) {
            throw error;
        }
        
        // Show confirmation step
        document.getElementById('email-display').textContent = email;
        showStep(document.getElementById('step-confirmation'));
        showSuccess('Password reset email sent! Please check your inbox.');
        
    } catch (error) {
        console.error('Password reset error:', error);
        showError(error.message || 'Failed to send reset email. Please try again.');
    } finally {
        setLoading(false, resetBtn);
    }
}

// Update password function
async function handlePasswordUpdate(newPassword) {
    const updateBtn = document.querySelector('.update-btn');
    setLoading(true, updateBtn);
    
    try {
        const { data, error } = await supabase.auth.updateUser({
            password: newPassword
        });
        
        if (error) {
            throw error;
        }
        
        showSuccess('Password updated successfully! Redirecting to login...');
        setTimeout(() => {
            window.location.href = '/login.html';
        }, 2000);
        
    } catch (error) {
        console.error('Password update error:', error);
        showError(error.message || 'Failed to update password. Please try again.');
    } finally {
        setLoading(false, updateBtn);
    }
}

// Check for auth state changes and handle password reset flow
supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'PASSWORD_RECOVERY') {
        // User clicked the password reset link - show new password form
        showStep(document.getElementById('step-new-password'));
    }
    
    if (event === 'SIGNED_IN' && session) {
        // After successful password update, user will be signed in
        console.log('User signed in after password update');
    }
});

// Reset password functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Get all step containers
    const stepRequest = document.getElementById('step-request');
    const stepConfirmation = document.getElementById('step-confirmation');
    const stepNewPassword = document.getElementById('step-new-password');
    
    // Get forms
    const requestForm = document.getElementById('request-form');
    const newPasswordForm = document.getElementById('new-password-form');
    
    // Get elements
    const emailInput = document.getElementById('email-input');
    const emailDisplay = document.getElementById('email-display');
    const resendBtn = document.getElementById('resend-btn');
    
    // Password toggle functionality
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
                svg.setAttribute('d', 'M2 4.27l2.28 2.28.46-.42C8.66 3.09 10.26 2 12 2c1.74 0 3.34 1.09 7.26 4.13.39.3.39.84 0 1.14-.87.68-1.81 1.24-2.81 1.65L17.73 10c.56-.4 1.12-.87 1.67-1.4.38-.36.38-.94 0-1.3C15.34 3.09 13.74 2 12 2s-3.34 1.09-7.4 5.3c-.38.36-.38.94 0 1.3.28.26.57.5.87.73L2 12.27 2 4.27zm1.73 1.73L12 14.27c-.33-.07-.66-.2-.95-.4-1.45-1.01-2.67-2.35-3.62-3.97L6.27 8.73c-.28-.28-.73-.28-1.01 0-.28.28-.28.73 0 1.01L6.43 11c.95 1.62 2.17 2.96 3.62 3.97.29.2.62.33.95.4L12 16.27l8.27-8.27c.28-.28.28-.73 0-1.01-.28-.28-.73-.28-1.01 0L12 14.27z');
            } else {
                // Show "eye" icon
                svg.setAttribute('d', 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z');
            }
        });
    });
    
    // Step navigation functions
    function showStep(step) {
        // Hide all steps
        stepRequest.classList.add('hidden');
        stepConfirmation.classList.add('hidden');
        stepNewPassword.classList.add('hidden');
        
        // Show requested step
        step.classList.remove('hidden');
    }
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Password validation
    function validatePassword(password) {
        const requirements = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password)
        };
        
        return requirements;
    }
    
    // Update password requirements UI
    function updatePasswordRequirements(password) {
        const requirements = validatePassword(password);
        
        document.getElementById('req-length').classList.toggle('valid', requirements.length);
        document.getElementById('req-uppercase').classList.toggle('valid', requirements.uppercase);
        document.getElementById('req-lowercase').classList.toggle('valid', requirements.lowercase);
        document.getElementById('req-number').classList.toggle('valid', requirements.number);
    }
    
    // Handle request reset form submission
    requestForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        // Validate email
        if (!email) {
            showError('Please enter your email address');
            return;
        }
        
        if (!isValidEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }
        
        // Call Supabase password reset
        handlePasswordReset(email);
    });
    
    // Handle resend button
    resendBtn.addEventListener('click', function() {
        const email = emailDisplay.textContent;
        
        if (!email || email === 'your email') {
            showError('No email found to resend to');
            return;
        }
        
        const resendButton = this;
        setLoading(true, resendButton);
        
        // Resend password reset email
        handlePasswordReset(email).finally(() => {
            setLoading(false, resendButton);
        });
    });
    
    // Handle new password form
    newPasswordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        // Validate passwords
        if (!newPassword || !confirmPassword) {
            showError('Please fill in both password fields');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            showError('Passwords do not match');
            return;
        }
        
        const requirements = validatePassword(newPassword);
        const isValid = Object.values(requirements).every(req => req);
        
        if (!isValid) {
            showError('Password does not meet all requirements');
            return;
        }
        
        // Call Supabase password update
        handlePasswordUpdate(newPassword);
    });
    
    // Real-time password validation for new password step
    const newPasswordInput = document.getElementById('new-password');
    if (newPasswordInput) {
        newPasswordInput.addEventListener('input', function() {
            updatePasswordRequirements(this.value);
        });
    }
    
    // Check URL parameters for Supabase auth flow
    const urlParams = new URLSearchParams(window.location.search);
    const tokenHash = urlParams.get('token_hash');
    const type = urlParams.get('type');
    const next = urlParams.get('next');
    
    if (tokenHash && type === 'recovery') {
        // Handle password recovery flow from email link
        showStep(stepNewPassword);
        
        // Verify the token hash
        supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: 'recovery'
        }).then(({ data, error }) => {
            if (error) {
                console.error('Token verification error:', error);
                showError('Invalid or expired reset link. Please request a new one.');
                showStep(stepRequest);
            } else {
                console.log('Password recovery token verified successfully');
            }
        });
    } else if (urlParams.get('step') === 'sent') {
        // Show confirmation step if coming from email sent
        showStep(stepConfirmation);
        emailDisplay.textContent = urlParams.get('email') || 'your email';
    }
    
    // Demo button to show new password step (for testing)
    // This would not exist in production
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const demoBtn = document.createElement('button');
        demoBtn.textContent = 'Demo: Show New Password Step';
        demoBtn.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: #ef4444;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 12px;
            cursor: pointer;
            z-index: 9999;
        `;
        demoBtn.addEventListener('click', () => {
            showStep(stepNewPassword);
        });
        document.body.appendChild(demoBtn);
    }
    
    // Handle browser back button
    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.step) {
            switch (event.state.step) {
                case 'request':
                    showStep(stepRequest);
                    break;
                case 'confirmation':
                    showStep(stepConfirmation);
                    break;
                case 'newPassword':
                    showStep(stepNewPassword);
                    break;
            }
        }
    });
    
    // Push initial state
    history.replaceState({ step: 'request' }, '', window.location.href);
});
