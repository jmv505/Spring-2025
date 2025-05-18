// main.js - Handles navigation, slideshow, creative features

document.addEventListener('DOMContentLoaded', function () {
    // Responsive Navbar Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navList = document.querySelector('.navbar ul');
    if (navToggle && navList) {
        navToggle.addEventListener('click', function () {
            navList.classList.toggle('active');
        });
    }

    // Initialize Slideshow
    function initSlideshow(containerId, images, interval = 3000) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('Slideshow container not found:', containerId);
            return;
        }

        console.log('Initializing slideshow with container:', containerId);
        console.log('Images to load:', images);

        // Clear existing images
        container.innerHTML = '';

        // Add images
        images.forEach((src, i) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Gym Image ${i + 1}`;
            img.className = i === 0 ? 'active' : '';
            img.style.width = '100%'; // Ensure images fill the container
            img.style.height = '400px'; // Set fixed height
            img.style.objectFit = 'cover'; // Ensure proper scaling
            
            img.onload = function() {
                console.log(`Image ${i + 1} loaded successfully`);
                console.log('Image dimensions:', this.naturalWidth, 'x', this.naturalHeight);
            };
            
            img.onerror = function() {
                console.error(`Error loading image ${i + 1}: ${src}`);
                console.error('Error details:', event);
            };
            
            container.appendChild(img);
        });

        // Add navigation arrows
        const arrowLeft = document.createElement('div');
        arrowLeft.className = 'slideshow-arrow left';
        arrowLeft.innerHTML = '<';
        container.appendChild(arrowLeft);

        const arrowRight = document.createElement('div');
        arrowRight.className = 'slideshow-arrow right';
        arrowRight.innerHTML = '>'; 
        container.appendChild(arrowRight);

        // Auto-advance slides
        let current = 0;
        const total = images.length;
        const imgs = container.querySelectorAll('img');

        if (imgs.length === 0) {
            console.error('No images found in container after loading');
            return;
        }

        function showNextSlide() {
            imgs[current].classList.remove('active');
            current = (current + 1) % total;
            imgs[current].classList.add('active');
        }

        // Start slideshow
        setInterval(showNextSlide, interval);

        // Add click handlers for navigation arrows
        container.addEventListener('click', function(e) {
            if (e.target.className.includes('left')) {
                imgs[current].classList.remove('active');
                current = (current - 1 + total) % total;
                imgs[current].classList.add('active');
            } else if (e.target.className.includes('right')) {
                showNextSlide();
            }
        });
    }

    // Initialize About Us page slideshow
    if (document.getElementById('slideshow')) {
        initSlideshow('slideshow', [
            './gympic1.jpg',
            './gympic2.jpg',
            './gympic3.jpg'
        ]);
    }

    // Initialize Creative page slideshow
    if (document.getElementById('creative-slideshow')) {
        initSlideshow('creative-slideshow', [
            './gympic1.jpg',
            './gympic2.jpg',
            './gympic3.jpg'
        ]);
    }

    // BMI Calculator (Creative Page)
    const bmiForm = document.getElementById('bmi-form');
    if (bmiForm) {
        bmiForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const height = parseFloat(document.getElementById('height').value) / 100;
            const weight = parseFloat(document.getElementById('weight').value);
            if (height > 0 && weight > 0) {
                const bmi = weight / (height * height);
                let category = '';
                if (bmi < 18.5) category = 'Underweight';
                else if (bmi < 25) category = 'Normal weight';
                else if (bmi < 30) category = 'Overweight';
                else category = 'Obese';
                document.getElementById('bmi-result').textContent = `Your BMI is ${bmi.toFixed(1)} (${category})`;
            } else {
                document.getElementById('bmi-result').textContent = 'Please enter valid values.';
            }
        });
    }
});

// Leaflet OpenStreetMap for About Us page
if (document.getElementById('map')) {
    // Coordinates for New York City (example)
    var lat = 40.7128;
    var lng = -74.0060;
    var map = L.map('map').setView([lat, lng], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    L.marker([lat, lng]).addTo(map)
        .bindPopup('Our Gym Location')
        .openPopup();
}
