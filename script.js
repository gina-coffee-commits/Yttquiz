let currentScreen = 0;
let totalScore = 0;
let userEmail = '';
let readinessLevel = '';
const answers = {};

// Initialize option click handlers
document.querySelectorAll('.options').forEach(optionsGroup => {
    optionsGroup.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function() {
            this.parentElement.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            this.classList.add('selected');
            
            const questionNum = this.parentElement.getAttribute('data-question');
            answers[questionNum] = parseInt(this.getAttribute('data-value'));
            
            const nextBtn = this.parentElement.nextElementSibling;
            if (nextBtn && nextBtn.classList.contains('cta-btn')) {
                nextBtn.disabled = false;
            }
        });
    });
});

function updateProgress() {
    const progress = (currentScreen / 9) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

function nextScreen() {
    document.getElementById('screen-' + currentScreen).classList.remove('active');
    currentScreen++;
    document.getElementById('screen-' + currentScreen).classList.add('active');
    updateProgress();
}

function showResults() {
    const email = document.getElementById('emailInput').value;
    
    if (!email || !email.includes('@')) {
        alert('Please enter a valid email address');
        return;
    }

    userEmail = email;

    // Calculate total score
    totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
    
    console.log('Total Score:', totalScore);
    console.log('Email:', email);

    // Hide email screen
    document.getElementById('screen-9').classList.remove('active');

    // Show appropriate result
    let resultScreen;
    if (totalScore >= 32) {
        resultScreen = 'result-high';
        readinessLevel = 'high';
    } else if (totalScore >= 24) {
        resultScreen = 'result-mid';
        readinessLevel = 'mid';
    } else {
        resultScreen = 'result-low';
        readinessLevel = 'low';
    }

    document.getElementById(resultScreen).classList.add('active');
    
    // Keep progress bar
    updateProgress();
}

function showFreebies(level) {
    // Hide result screens
    document.getElementById('result-high').classList.remove('active');
    document.getElementById('result-mid').classList.remove('active');
    document.getElementById('result-low').classList.remove('active');

    // Show freebies screen
    document.getElementById('screen-freebies').classList.add('active');

    // Show consultation option only for high scorers
    if (level === 'high') {
        document.getElementById('consultation-card').style.display = 'flex';
        document.getElementById('consultation-checkbox').style.display = 'flex';
    }

    // Update progress to 100%
    document.getElementById('progressBar').style.width = '100%';
}

function claimFreebies(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const wantsConsultation = document.getElementById('consultation').checked;

    // Prepare data for submission
    const quizData = {
        name,
        email: userEmail,
        score: totalScore,
        readinessLevel,
        wantsConsultation,
        answers: answers,
        timestamp: new Date().toISOString(),
        updates: document.getElementById('updatesCheckbox').checked
    };

    // Log data for debugging
    console.log('Quiz Data:', quizData);

    // Send to your backend/email service
    submitQuizData(quizData);

    // Show thank you screen
    document.getElementById('screen-freebies').classList.remove('active');
    document.getElementById('screen-thanks').classList.add('active');

    // Show consultation note if applicable
    if (wantsConsultation && readinessLevel === 'high') {
        document.getElementById('consultation-note').style.display = 'inline';
        document.getElementById('booking-link').style.display = 'flex';
    }

    // Hide progress bar
    document.querySelector('.progress-bar').style.display = 'none';
}

function submitQuizData(data) {
    // Replace with your actual backend endpoint
    const endpoint = '/api/quiz-submit' || process.env.REACT_APP_API_ENDPOINT;
    
    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .catch(error => {
        // Log error but don't break user flow
        console.error('Error submitting quiz data:', error);
        // Data is still logged to console for debugging
    });
}

function handlePdfDownload(event) {
    event.preventDefault();
    // Replace with your actual PDF URL
    const pdfUrl = process.env.REACT_APP_PDF_URL || '/downloads/bali-ytt-guide.pdf';
    
    // Trigger download
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Bali-YTT-Guide.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function handleBookingClick(event) {
    event.preventDefault();
    // Replace with your actual booking calendar URL
    const bookingUrl = process.env.REACT_APP_BOOKING_URL || 'https://calendly.com/your-calendar';
    window.open(bookingUrl, '_blank');
}

function closePopup() {
    // Remove popup and overlay
    document.querySelector('.overlay').style.display = 'none';
    document.querySelector('.popup').style.display = 'none';
}

// Initialize progress bar
updateProgress();
