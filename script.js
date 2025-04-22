document.addEventListener('DOMContentLoaded', () => {
    const privateKeyInput = document.getElementById('privateKey');
    const convertBtn = document.getElementById('convertBtn');
    const resultContainer = document.getElementById('resultContainer');
    const addressDisplay = document.getElementById('addressDisplay');
    const copyBtn = document.getElementById('copyBtn');
    const toggleVisibility = document.getElementById('toggleVisibility');
    let isPrivateKeyVisible = false;

    // Toggle private key visibility
    toggleVisibility.addEventListener('click', () => {
        isPrivateKeyVisible = !isPrivateKeyVisible;
        privateKeyInput.type = isPrivateKeyVisible ? 'text' : 'password';
        toggleVisibility.innerHTML = isPrivateKeyVisible ? 
            '<i class="fas fa-eye-slash"></i>' : 
            '<i class="fas fa-eye"></i>';
    });

    // Convert private key to address
    convertBtn.addEventListener('click', () => {
        const privateKey = privateKeyInput.value.trim();
        
        if (!privateKey) {
            alert('Please enter a private key');
            return;
        }

        try {
            // Create wallet from private key
            const wallet = new ethers.Wallet(privateKey);
            const address = wallet.address;

            // Display the address
            addressDisplay.textContent = address;
            resultContainer.style.display = 'block';

            // Scroll to result
            resultContainer.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            alert('Invalid private key. Please check and try again.');
            console.error('Error:', error);
        }
    });

    // Copy address to clipboard
    copyBtn.addEventListener('click', () => {
        const address = addressDisplay.textContent;
        navigator.clipboard.writeText(address).then(() => {
            // Show feedback
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
            alert('Failed to copy address to clipboard');
        });
    });

    // Clear result when private key input changes
    privateKeyInput.addEventListener('input', () => {
        resultContainer.style.display = 'none';
    });
}); 