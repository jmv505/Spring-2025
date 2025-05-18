// form-validation.js - Membership Form Validation

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('membership-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let valid = true;
        const errors = {
            name: '',
            email: '',
            age: '',
            membership: ''
        };
        // Validate Name
        const name = form.name.value.trim();
        if (name.length < 2) {
            errors.name = 'Name must be at least 2 characters.';
            valid = false;
        }
        // Validate Email
        const email = form.email.value.trim();
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
            errors.email = 'Enter a valid email address.';
            valid = false;
        }
        // Validate Age
        const age = parseInt(form.age.value, 10);
        if (isNaN(age) || age < 16) {
            errors.age = 'You must be at least 16 years old.';
            valid = false;
        }
        // Validate Membership
        if (!form.membership.value) {
            errors.membership = 'Please select a membership type.';
            valid = false;
        }
        // Display errors using arrays and control structures
        ['name', 'email', 'age', 'membership'].forEach(function(field) {
            var errorElem = document.getElementById(field + '-error');
            if (errorElem) errorElem.textContent = errors[field];
        });
        if (valid) {
            document.getElementById('form-success').textContent = 'Form submitted successfully!';
            form.reset();
            // Clear errors
            ['name', 'email', 'age', 'membership'].forEach(function(field) {
                document.getElementById(field + '-error').textContent = '';
            });
        } else {
            document.getElementById('form-success').textContent = '';
        }
    });
});
