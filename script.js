document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const urlInput = document.getElementById('urlInput');
    const startDetectionBtn = document.getElementById('startDetection');
    const removeAiImagesBtn = document.getElementById('removeAiImages');
    const exportReportBtn = document.getElementById('exportReport');
    const resultsGrid = document.getElementById('resultsGrid');
    const paymentModal = document.getElementById('paymentModal');
    const closeModal = document.querySelector('.close');

    // Create progress bar element
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';
    progressContainer.innerHTML = `
        <div class="progress-bar" id="progressBar"></div>
        <div class="progress-text" id="progressText">0%</div>
    `;
    document.querySelector('.controls').after(progressContainer);

    // Global app state
    const appState = {
        isPro: localStorage.getItem('slop_killer_pro') === 'true',
        usageCount: 0
    };

    // Initialize app based on pro status
    const initializeApp = () => {
        if (appState.isPro) {
            exportReportBtn.disabled = false;
        } else {
            exportReportBtn.disabled = true;
        }
    };

    // Call initialize on page load
    initializeApp();

    let images = [];

    // Drag and drop functionality
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        handleFiles(e.dataTransfer.files);
    });

    // Click to browse files
    dropZone.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', function() {
        handleFiles(this.files);
    });

    // Handle files
    const handleFiles = (files) => {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const imageData = {
                        id: Date.now() + i,
                        src: e.target.result,
                        type: 'file',
                        status: 'pending'
                    };
                    images.push(imageData);
                    displayImage(imageData);
                };
                reader.readAsDataURL(file);
            }
        }
    };

    // Start detection
    startDetectionBtn.addEventListener('click', () => {
        // Process URLs from textarea
        const urls = urlInput.value.trim().split('\n').filter(url => url.trim() !== '');
        urls.forEach((url, index) => {
            const imageData = {
                id: Date.now() + index + 1000,
                src: url.trim(),
                type: 'url',
                status: 'pending'
            };
            images.push(imageData);
            displayImage(imageData);
        });

        // Clear URL input
        urlInput.value = '';

        if (images.length === 0) {
            alert('Please upload images or enter image URLs first.');
            return;
        }

        // Check image limit based on pro status
        const maxImages = appState.isPro ? 500 : 10;
        if (images.length > maxImages) {
            // Truncate images array
            images = images.slice(0, maxImages);
            updateResultsGrid();
            
            // Show payment modal for non-pro users
            if (!appState.isPro) {
                paymentModal.style.display = 'block';
                alert(`You've reached the limit of ${maxImages} images. Upgrade to Pro for up to 500 images.`);
            }
        }

        // Increment usage count
        appState.usageCount += images.length;

        // Reset progress bar
        const progressBar = document.getElementById('progressBar');
        const progressText = document.getElementById('progressText');
        progressBar.style.width = '0%';
        progressText.textContent = '0%';

        // Start detection with concurrency control
        detectImagesWithConcurrency();
    });

    // Detect images with concurrency control
    const detectImagesWithConcurrency = async () => {
        const concurrencyLimit = 3;
        const imageChunks = [];
        let processedCount = 0;
        const totalImages = images.length;
        
        // Split images into chunks for concurrent processing
        for (let i = 0; i < totalImages; i += concurrencyLimit) {
            imageChunks.push(images.slice(i, i + concurrencyLimit));
        }
        
        // Process each chunk sequentially
        for (const chunk of imageChunks) {
            // Process all images in the chunk concurrently
            await Promise.all(chunk.map(async (image) => {
                const imgElement = document.createElement('img');
                imgElement.src = image.src;
                
                // Wait for image to load
                await new Promise((resolve) => {
                    imgElement.onload = resolve;
                    imgElement.onerror = resolve;
                });
                
                // Use detectAI function to determine status
                const isAI = await detectAI(imgElement);
                image.status = isAI ? 'ai-slop' : 'pass';
                updateImageStatus(image);
                
                // Update progress
                processedCount++;
                const progress = Math.round((processedCount / totalImages) * 100);
                const progressBar = document.getElementById('progressBar');
                const progressText = document.getElementById('progressText');
                if (progressBar && progressText) {
                    progressBar.style.width = `${progress}%`;
                    progressText.textContent = `${progress}%`;
                }
            }));
            
            // Add a small delay between chunks
            await new Promise(resolve => setTimeout(resolve, 300));
        }
    };

    // Detect images using AI detection function (original sequential version)
    const detectImages = async () => {
        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            const imgElement = document.createElement('img');
            imgElement.src = image.src;
            
            // Wait for image to load
            await new Promise((resolve) => {
                imgElement.onload = resolve;
                imgElement.onerror = resolve;
            });
            
            // Use detectAI function to determine status
            const isAI = await detectAI(imgElement);
            image.status = isAI ? 'ai-slop' : 'pass';
            updateImageStatus(image);
            
            // Add a small delay between detections
            await new Promise(resolve => setTimeout(resolve, 200));
        }
    };

    // AI detection function using feature engineering
    const detectAI = async (imageElement) => {
        // 1. Metadata scan
        const metadataScore = await scanMetadata(imageElement);
        
        // 2. Visual pattern analysis
        const visualScore = await analyzeVisualPatterns(imageElement);
        
        // 3. Fingerprint analysis
        const fingerprintScore = await analyzeFingerprint(imageElement);
        
        // Combine scores to determine if it's AI-generated
        const totalScore = metadataScore + visualScore + fingerprintScore;
        return totalScore > 1.5;
    };

    // Metadata scanning
    const scanMetadata = async (imageElement) => {
        const aiKeywords = ['Midjourney', 'Dall-E', 'Stable Diffusion', 'Steerable-Motion', 'AI Generated', 'Generated by AI'];
        let score = 0;
        
        // Check if image is a data URL (from file upload)
        if (imageElement.src.startsWith('data:')) {
            // For data URLs, check if any AI keywords are present
            for (const keyword of aiKeywords) {
                if (imageElement.src.includes(keyword)) {
                    score += 1;
                    break;
                }
            }
        } else {
            // For external URLs, check the URL for AI-related domains
            const aiDomains = ['midjourney', 'dall-e', 'stable-diffusion', 'ai-image', 'generated.ai'];
            for (const domain of aiDomains) {
                if (imageElement.src.toLowerCase().includes(domain)) {
                    score += 0.5;
                    break;
                }
            }
        }
        
        return score;
    };

    // Visual pattern analysis using Canvas
    const analyzeVisualPatterns = async (imageElement) => {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');
        
        // Draw image to canvas
        ctx.drawImage(imageElement, 0, 0, 128, 128);
        
        // Get image data
        const imageData = ctx.getImageData(0, 0, 128, 128);
        const data = imageData.data;
        
        // 1. High-frequency noise detection
        let totalColorDifference = 0;
        let pixelCount = 0;
        
        for (let y = 0; y < 128 - 1; y++) {
            for (let x = 0; x < 128 - 1; x++) {
                const currentIndex = (y * 128 + x) * 4;
                const nextIndex = (y * 128 + x + 1) * 4;
                const belowIndex = ((y + 1) * 128 + x) * 4;
                
                // Calculate color difference with right neighbor
                const r1 = data[currentIndex];
                const g1 = data[currentIndex + 1];
                const b1 = data[currentIndex + 2];
                
                const r2 = data[nextIndex];
                const g2 = data[nextIndex + 1];
                const b2 = data[nextIndex + 2];
                
                const r3 = data[belowIndex];
                const g3 = data[belowIndex + 1];
                const b3 = data[belowIndex + 2];
                
                // Euclidean distance for color difference
                const diffRight = Math.sqrt(
                    Math.pow(r1 - r2, 2) + 
                    Math.pow(g1 - g2, 2) + 
                    Math.pow(b1 - b2, 2)
                );
                
                const diffBelow = Math.sqrt(
                    Math.pow(r1 - r3, 2) + 
                    Math.pow(g1 - g3, 2) + 
                    Math.pow(b1 - b3, 2)
                );
                
                totalColorDifference += diffRight + diffBelow;
                pixelCount += 2;
            }
        }
        
        const avgColorDifference = totalColorDifference / pixelCount;
        
        // 2. Saturation analysis
        let totalSaturation = 0;
        let saturationCount = 0;
        
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i] / 255;
            const g = data[i + 1] / 255;
            const b = data[i + 2] / 255;
            
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            const saturation = max === 0 ? 0 : (max - min) / max;
            
            totalSaturation += saturation;
            saturationCount++;
        }
        
        const avgSaturation = totalSaturation / saturationCount;
        
        // Calculate visual score
        let visualScore = 0;
        
        // AI images often have higher color differences in smooth areas
        if (avgColorDifference > 15) {
            visualScore += 0.5;
        }
        
        // AI images often have unusual saturation patterns
        if (avgSaturation > 0.6 || avgSaturation < 0.1) {
            visualScore += 0.5;
        }
        
        return visualScore;
    };

    // Fingerprint analysis
    const analyzeFingerprint = async (imageElement) => {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        
        // Draw image to canvas
        ctx.drawImage(imageElement, 0, 0, 64, 64);
        
        // Get image data
        const imageData = ctx.getImageData(0, 0, 64, 64);
        const data = imageData.data;
        
        // Sample specific regions (corners and center)
        const regions = [
            { x: 0, y: 0, width: 10, height: 10 },
            { x: 54, y: 0, width: 10, height: 10 },
            { x: 0, y: 54, width: 10, height: 10 },
            { x: 54, y: 54, width: 10, height: 10 },
            { x: 27, y: 27, width: 10, height: 10 }
        ];
        
        let fingerprintScore = 0;
        
        for (const region of regions) {
            let regionAvgBrightness = 0;
            let regionPixelCount = 0;
            
            for (let y = region.y; y < region.y + region.height; y++) {
                for (let x = region.x; x < region.x + region.width; x++) {
                    const index = (y * 64 + x) * 4;
                    const r = data[index];
                    const g = data[index + 1];
                    const b = data[index + 2];
                    
                    // Calculate brightness
                    const brightness = (r + g + b) / 3;
                    regionAvgBrightness += brightness;
                    regionPixelCount++;
                }
            }
            
            const avgBrightness = regionAvgBrightness / regionPixelCount;
            
            // AI images often have consistent patterns in these regions
            if (avgBrightness > 100 && avgBrightness < 150) {
                fingerprintScore += 0.2;
            }
        }
        
        return fingerprintScore;
    };

    // Display image in results grid
    const displayImage = (imageData) => {
        const imageItem = document.createElement('div');
        imageItem.className = 'image-item';
        imageItem.dataset.id = imageData.id;
        
        imageItem.innerHTML = `
            <img src="${imageData.src}" alt="Image">
            <div class="image-overlay ${imageData.status}">
                ${imageData.status === 'pending' ? 'Processing...' : 
                  imageData.status === 'pass' ? 'PASS' : 'AI SLOP'}
            </div>
        `;
        
        resultsGrid.appendChild(imageItem);
    };

    // Update image status
    const updateImageStatus = (imageData) => {
        const imageItem = document.querySelector(`.image-item[data-id="${imageData.id}"]`);
        if (imageItem) {
            const overlay = imageItem.querySelector('.image-overlay');
            overlay.className = `image-overlay ${imageData.status}`;
            overlay.textContent = imageData.status === 'pass' ? 'PASS' : 'AI SLOP';
        }
    };

    // Remove AI images
    removeAiImagesBtn.addEventListener('click', () => {
        images = images.filter(image => image.status !== 'ai-slop');
        updateResultsGrid();
    });

    // Export filter report
    exportReportBtn.addEventListener('click', () => {
        const report = {
            totalImages: images.length,
            passImages: images.filter(image => image.status === 'pass').length,
            aiSlopImages: images.filter(image => image.status === 'ai-slop').length,
            timestamp: new Date().toISOString()
        };

        const reportText = `Slop Killer Filter Report\n` +
                          `=========================\n` +
                          `Total Images: ${report.totalImages}\n` +
                          `PASS Images: ${report.passImages}\n` +
                          `AI SLOP Images: ${report.aiSlopImages}\n` +
                          `Generated on: ${new Date(report.timestamp).toLocaleString()}\n`;

        const blob = new Blob([reportText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'slop-killer-report.txt';
        a.click();
        URL.revokeObjectURL(url);
    });

    // Update results grid
    const updateResultsGrid = () => {
        resultsGrid.innerHTML = '';
        images.forEach(image => {
            displayImage(image);
        });
    };

    // Payment modal
    startDetectionBtn.addEventListener('click', () => {
        // Show payment modal for demo purposes
        paymentModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        paymentModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === paymentModal) {
            paymentModal.style.display = 'none';
        }
    });

    // PayPal integration
    if (window.paypal) {
        paypal.Buttons({
            createOrder: (data, actions) => {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: '9.90'
                        }
                    }]
                });
            },
            onApprove: (data, actions) => {
                return actions.order.capture().then((details) => {
                    alert('Transaction completed by ' + details.payer.name.given_name);
                    paymentModal.style.display = 'none';
                    
                    // Upgrade to Pro status
                    appState.isPro = true;
                    localStorage.setItem('slop_killer_pro', 'true');
                    
                    // Update UI to reflect pro status
                    exportReportBtn.disabled = false;
                    
                    alert('Congratulations! You have upgraded to Pro version. You can now process up to 500 images and access all features.');
                });
            }
        }).render('#paypal-button-container');
    }
});