document.getElementById('jobForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevents the browser's default form submission behavior

  const form = e.target;
  const formData = new FormData(form);

  const responseElement = document.getElementById('response');
  responseElement.textContent = 'Submitting...';
  responseElement.style.color = 'blue';

  fetch('/submit-application', {
    method: 'POST',
    body: formData,
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parses the JSON response from the server
  })
  .then(data => {
    if (data.success) {
      responseElement.textContent = data.message;
      responseElement.style.color = 'green';
      form.reset(); // Clears the form fields on successful submission
    } else {
      responseElement.textContent = data.message || 'Submission failed.';
      responseElement.style.color = 'red';
    }
  })
  .catch(error => {
    console.error('Error:', error);
    responseElement.textContent = 'An error occurred during submission.';
    responseElement.style.color = 'red';
  });
});