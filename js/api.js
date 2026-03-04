// ===================================
// API CLIENT
// ===================================

// ===== Contact Form Submission =====
// Static site: mailto fallback instead of backend API

async function submitContactForm(formData) {
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to submit form');
        }

        return data;
    } catch (error) {
        console.error('Contact Error:', error);
        throw error;
    }
}

// ===== Error Handling =====

function handleAPIError(error) {
    console.error('API Error:', error);

    if (error.message && error.message.includes('Failed to fetch')) {
        return {
            success: false,
            message: 'Network error. Please check your connection.'
        };
    }

    return {
        success: false,
        message: 'An error occurred. Please try again later.'
    };
}
