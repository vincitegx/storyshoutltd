document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', async (e) => {
    // 1. Prevent page refresh
    e.preventDefault();
    
    const submitBtn = form.querySelector('[type="submit"]');
    const originalBtnText = submitBtn.innerText;
    
    // 2. Visual feedback (Loading state)
    submitBtn.innerText = 'Sending...';
    submitBtn.disabled = true;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        // 3. Success Toast
        alert(result.message || 'Success!'); 
        form.reset();
      } else {
        alert('Error: ' + (result.error || 'Failed to send'));
      }
    } catch (err) {
      alert('Network error. Please check your connection.');
    } finally {
      submitBtn.innerText = originalBtnText;
      submitBtn.disabled = false;
    }
  });
});