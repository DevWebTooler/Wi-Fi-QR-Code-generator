document.addEventListener('DOMContentLoaded', function() {
    const ssidInput = document.querySelector('.ssid');
    const passwordInput = document.querySelector('.password');
    const qrcodeDiv = document.getElementById('qrcode');
    const printButton = document.querySelector('button');
    
    function generateQRCode() {
        const ssid = ssidInput.value.trim();
        const password = passwordInput.value.trim();
        
        if (!ssid) {
            qrcodeDiv.innerHTML = '<p>Please enter the network name</p>';
            return;
        }
        
        // Format the WiFi credentials according to the WIFI:T:WPA;S:SSID;P:Password; format
        const wifiString = `WIFI:T:WPA;S:${ssid};P:${password};;`;
        
        // Clear previous QR code
        qrcodeDiv.innerHTML = '';
        
        // Generate new QR code
        const qr = qrcode(0, 'L');
        qr.addData(wifiString);
        qr.make();
        
        // Create and append the QR code image
        const qrImage = qr.createImgTag(4);
        qrcodeDiv.innerHTML = qrImage;
    }
    
    // Generate QR code on input changes
    ssidInput.addEventListener('input', generateQRCode);
    passwordInput.addEventListener('input', generateQRCode);
    
    // Print functionality
    printButton.addEventListener('click', function() {
        // Add credentials text to the QR container
        const credentialsText = document.createElement('div');
        credentialsText.style.textAlign = 'center';
        credentialsText.style.marginBottom = '20px';
        credentialsText.innerHTML = `
            <p style="font-size: 18px; margin: 5px 0;">Network: ${ssidInput.value}</p>
            <p style="font-size: 18px; margin: 5px 0;">Password: ${passwordInput.value}</p>
        `;
        qrcodeDiv.parentNode.insertBefore(credentialsText, qrcodeDiv);
        
        // Print the page
        window.print();
        
        // Remove the credentials text after printing
        credentialsText.remove();
    });
    
    // Initial QR code generation
    generateQRCode();
}); 