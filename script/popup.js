// popup.js
document.addEventListener('DOMContentLoaded', () => {
  const checkButton = document.getElementById('checkButton');
  const passwordInput = document.getElementById('passwordInput');
  const result = document.getElementById('result');
  const loading = document.getElementById('loading');

  checkButton.addEventListener('click', () => {
    const password = passwordInput.value;

    // Show loading animation
    loading.style.display = 'block';

    // Hide loading animation after 3 seconds
    setTimeout(() => {
      loading.style.display = 'none';

      // Proceed with password checking logic
      const hash = sha1(password).toUpperCase();
      const PASS_PROTECT_PASSWORD_CHECK_URI = `https://api.pwnedpasswords.com/range/${hash.substring(0, 5)}`;

      fetch(PASS_PROTECT_PASSWORD_CHECK_URI)
        .then(response => {
          if (response.ok) {
            return response.text();
          }
          throw new Error('Network response was not ok.');
        })
        .then(data => {
          const lines = data.split('\n');
          const passwordHash = hash.substring(5);

          const isPasswordPwned = lines.some(line => {
            const [hash, count] = line.split(':');
            return hash === passwordHash;
          });

          if (isPasswordPwned) {
            result.textContent = 'Password compromised by hacker';
            result.style.color = 'red'; // Apply red color
          } else {
            const passwordStatus = checkPasswordStrength(password);
            result.textContent = passwordStatus;
            result.style.color = 'green'; // Apply green color
            // savePasswordToFile(password);
          }
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
          result.textContent = 'Error occurred. Please try again later.';
          result.style.color = 'black'; // Reset color to black
        });
    }, 3000); // 3 seconds
  });
});

function sha1(input) {
  const hash = CryptoJS.SHA1(input);
  return hash.toString(CryptoJS.enc.Hex);
}

function checkPasswordStrength(password) {
  if (password.length < 8) {
    return 'Password too short.';
  }

  if (password.search(/[A-Z]/) === -1) {
    return 'Password must contain at least one uppercase letter.';
  }

  if (password.search(/[a-z]/) === -1) {
    return 'Password must contain at least one lowercase letter.';
  }

  if (password.search(/[0-9]/) === -1) {
    return 'Password must contain at least one number.';
  }

  if (password.search(/[!@#$%^&*]/) === -1) {
    return 'Password must contain at least one special character.';
  }

  return 'Password is strong!';
}

// function savePasswordToFile(password) {
//   const blob = new Blob([password], { type: 'text/plain' });
//   const link = document.createElement('a');

//   link.download = 'savepass.txt';
//   link.href = window.URL.createObjectURL(blob);
//   link.click();
// }
