// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Form validation and submission
    const orderForm = document.getElementById('orderForm');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const addressInput = document.getElementById('address');
    
    // Error message elements
    const nameError = document.getElementById('nameError');
    const phoneError = document.getElementById('phoneError');
    const addressError = document.getElementById('addressError');
    
    // Smooth scrolling for order buttons
    const orderButtons = document.querySelectorAll('.btn-order-header, .btn-order-main, .btn-order-slogan, .btn-buy-now, .btn-buy-testimonials');
    
    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const orderForm = document.getElementById('order-form');
            orderForm.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
    
    // Form validation functions
    function validateName(name) {
        const nameRegex = /^[a-zA-ZÀ-ỹ\s]{2,50}$/;
        return nameRegex.test(name.trim());
    }
    
    function validatePhone(phone) {
        const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }
    
    function validateAddress(address) {
        return address.trim().length >= 10;
    }
    
    // Show error message
    function showError(errorElement, message) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    // Hide error message
    function hideError(errorElement) {
        errorElement.style.display = 'none';
    }
    
    // Add input validation styling
    function addValidationStyling(input, isValid) {
        input.classList.remove('error', 'success');
        if (isValid) {
            input.classList.add('success');
        } else {
            input.classList.add('error');
        }
    }
    
    // Real-time validation
    nameInput.addEventListener('blur', function() {
        const isValid = validateName(this.value);
        if (!isValid && this.value.trim() !== '') {
            showError(nameError, 'Vui lòng nhập họ tên hợp lệ (2-50 ký tự, chỉ chứa chữ cái)');
            addValidationStyling(this, false);
        } else {
            hideError(nameError);
            if (this.value.trim() !== '') {
                addValidationStyling(this, true);
            }
        }
    });
    
    phoneInput.addEventListener('blur', function() {
        const isValid = validatePhone(this.value);
        if (!isValid && this.value.trim() !== '') {
            showError(phoneError, 'Vui lòng nhập số điện thoại hợp lệ (10-11 số, bắt đầu bằng 0 hoặc +84)');
            addValidationStyling(this, false);
        } else {
            hideError(phoneError);
            if (this.value.trim() !== '') {
                addValidationStyling(this, true);
            }
        }
    });
    
    addressInput.addEventListener('blur', function() {
        const isValid = validateAddress(this.value);
        if (!isValid && this.value.trim() !== '') {
            showError(addressError, 'Vui lòng nhập địa chỉ chi tiết (ít nhất 10 ký tự)');
            addValidationStyling(this, false);
        } else {
            hideError(addressError);
            if (this.value.trim() !== '') {
                addValidationStyling(this, true);
            }
        }
    });
    
    // Clear validation styling on input
    [nameInput, phoneInput, addressInput].forEach(input => {
        input.addEventListener('input', function() {
            if (this.classList.contains('error') || this.classList.contains('success')) {
                this.classList.remove('error', 'success');
            }
        });
    });
    
    // Form submission
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isFormValid = true;
        
        // Validate name
        if (!validateName(nameInput.value)) {
            showError(nameError, nameInput.value.trim() === '' ? 'Vui lòng nhập họ tên' : 'Họ tên không hợp lệ');
            addValidationStyling(nameInput, false);
            isFormValid = false;
        } else {
            hideError(nameError);
            addValidationStyling(nameInput, true);
        }
        
        // Validate phone
        if (!validatePhone(phoneInput.value)) {
            showError(phoneError, phoneInput.value.trim() === '' ? 'Vui lòng nhập số điện thoại' : 'Số điện thoại không hợp lệ');
            addValidationStyling(phoneInput, false);
            isFormValid = false;
        } else {
            hideError(phoneError);
            addValidationStyling(phoneInput, true);
        }
        
        // Validate address
        if (!validateAddress(addressInput.value)) {
            showError(addressError, addressInput.value.trim() === '' ? 'Vui lòng nhập địa chỉ' : 'Địa chỉ quá ngắn');
            addValidationStyling(addressInput, false);
            isFormValid = false;
        } else {
            hideError(addressError);
            addValidationStyling(addressInput, true);
        }
        
        // Check if package is selected
        const selectedPackage = document.querySelector('input[name="package"]:checked');
        if (!selectedPackage) {
            alert('Vui lòng chọn gói sản phẩm');
            isFormValid = false;
        }
        
        if (isFormValid) {
            // Simulate form submission
            const submitButton = document.querySelector('.btn-submit');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'ĐANG XỬ LÝ...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Cảm ơn bạn đã đặt hàng! Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.');
                
                // Reset form
                orderForm.reset();
                
                // Clear validation styling
                [nameInput, phoneInput, addressInput].forEach(input => {
                    input.classList.remove('error', 'success');
                });
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
            }, 2000);
        }
    });
    
    // Phone number formatting
    phoneInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, ''); // Remove non-digits
        
        if (value.length > 0) {
            if (value.startsWith('84')) {
                value = '+' + value;
            } else if (!value.startsWith('0') && !value.startsWith('+84')) {
                value = '0' + value;
            }
        }
        
        // Limit length
        if (value.startsWith('+84')) {
            value = value.substring(0, 13);
        } else {
            value = value.substring(0, 11);
        }
        
        this.value = value;
    });
    
    // Testimonials interaction
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    
    testimonialItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Image lazy loading
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Package selection highlighting
    const packageOptions = document.querySelectorAll('.package-option input[type="radio"]');
    
    packageOptions.forEach(option => {
        option.addEventListener('change', function() {
            // Remove highlight from all options
            document.querySelectorAll('.package-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Add highlight to selected option
            if (this.checked) {
                this.closest('.package-option').classList.add('selected');
            }
        });
    });
    
    // Add CSS for selected package option
    const style = document.createElement('style');
    style.textContent = `
        .package-option.selected {
            background-color: #e8f5e8;
            padding: 10px;
            border-radius: 8px;
            border: 2px solid #4CAF50;
        }
        
        .package-option {
            transition: all 0.3s ease;
            padding: 10px;
            border-radius: 8px;
            border: 2px solid transparent;
        }
        
        .package-option:hover {
            background-color: #f5f5f5;
        }
    `;
    document.head.appendChild(style);
    
    // Scroll to top button (optional enhancement)
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #4CAF50;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Error handling for images
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Failed to load image:', this.src);
        });
    });
    
    // Console log for debugging
    console.log('Trà Ngũ Mộc Hương website loaded successfully');
    
    // Performance monitoring
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Page loaded in ${Math.round(loadTime)}ms`);
    });
    
});

// Global error handler
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Handle form submission for browsers without JavaScript
if (!window.addEventListener) {
    // Fallback for older browsers
    document.getElementById('orderForm').onsubmit = function() {
        return confirm('Bạn có chắc chắn muốn đặt hàng không?');
    };
}
