document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const generator = document.getElementById('generator');
    const hero = document.getElementById('hero');
    const form = document.getElementById('workplace-form');
    const resultSection = document.getElementById('result');
    const output = document.getElementById('output');
    const againBtn = document.getElementById('again-btn');
    const homeBtn = document.getElementById('home-btn');
  
    // Show generator form
    startBtn.addEventListener('click', () => {
      hero.classList.add('hidden');
      generator.classList.remove('hidden');
    });
  
    // Handle form submission
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      // Gather inputs
      const firstName = document.getElementById('firstName').value.trim();
      const lastName = document.getElementById('lastName').value.trim();
      const dob = document.getElementById('dob').value;
      const jobTitle = document.getElementById('jobTitle').value.trim();
      const module = document.getElementById('module').value;
      let tcodes = document.getElementById('tcodeText').value;
      // TODO: add file parsing if needed
  
      // Basic validation
      if (!firstName || !lastName || !dob || !jobTitle || !module) {
        alert('Please fill in all required fields.');
        return;
      }
  
      // Simulate role generation logic
      const roles = [`Y${module}_D_ORGSET:DEFAULTPROC`];
      // Render output
      output.textContent =
        `Employee: ${firstName} ${lastName} (${dob}) – ${jobTitle}\n` +
        `Module: ${module}\n` +
        `Generated Roles:\n` +
        roles.map(r => `• ${r}`).join('\n');
      resultSection.classList.remove('hidden');
      form.classList.add('hidden');
    });
  
    // Reset for another workplace
    againBtn.addEventListener('click', () => {
      form.reset();
      resultSection.classList.add('hidden');
      form.classList.remove('hidden');
    });
  
    // Back to home
    homeBtn.addEventListener('click', () => {
      resultSection.classList.add('hidden');
      form.classList.add('hidden');
      hero.classList.remove('hidden');
    });
  });
  