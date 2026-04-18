class PageGenerator {
    constructor(keywords) {
        this.keywords = keywords;
        this.cities = [
            'London', 'New York', 'Berlin', 'Paris', 'Tokyo', 'Los Angeles', 'Chicago',
            'San Francisco', 'Seattle', 'Boston', 'Miami', 'Toronto', 'Vancouver',
            'Sydney', 'Melbourne', 'Singapore', 'Hong Kong', 'Dubai', 'Rome', 'Madrid'
        ];
        this.codeSnippets = [
            {
                type: 'chrome',
                language: 'json',
                title: 'Chrome Extension: Block AI-Generated Images',
                description: 'Use this Manifest V3 code to create a Chrome extension that blocks AI-generated images:',
                code: `{
  "manifest_version": 3,
  "name": "AI Image Blocker",
  "version": "1.0",
  "description": "Blocks AI-generated images from your browsing experience",
  "permissions": ["declarativeNetRequest", "storage", "activeTab"],
  "background": {
    "service_worker": "background.js"
  },
  "declarative_net_request": {
    "rule_resources": [
      {
        "id": "ruleset_1",
        "enabled": true,
        "path": "rules.json"
      }
    ]
  }
}`
            },
            {
                type: 'chrome',
                language: 'json',
                title: 'Chrome Extension Rules',
                description: 'Add these rules to your rules.json file:',
                code: `[
  {
    "id": 1,
    "priority": 1,
    "action": {
      "type": "block"
    },
    "condition": {
      "urlFilter": "*",
      "resourceTypes": ["image"],
      "domains": ["*midjourney*", "*dall-e*", "*stable-diffusion*"]
    }
  },
  {
    "id": 2,
    "priority": 1,
    "action": {
      "type": "block"
    },
    "condition": {
      "urlFilter": "*",
      "resourceTypes": ["image"],
      "regexFilter": "(ai|generated|slop)"
    }
  }
]`
            },
            {
                type: 'python',
                language: 'python',
                title: 'Python: Detect AI-Generated Images with PIL',
                description: 'Use this Python code to detect AI-generated images by analyzing metadata:',
                code: `from PIL import Image
from PIL.ExifTags import TAGS

def detect_ai_image(image_path):
    try:
        img = Image.open(image_path)
        exif_data = {}
        
        if hasattr(img, '_getexif'):
            exif = img._getexif()
            if exif:
                for tag, value in exif.items():
                    tag_name = TAGS.get(tag, tag)
                    exif_data[tag_name] = value
        
        ai_keywords = ['midjourney', 'dall-e', 'stable diffusion', 'ai generated']
        
        file_name = image_path.lower()
        metadata_str = str(exif_data).lower()
        
        for keyword in ai_keywords:
            if keyword in file_name or keyword in metadata_str:
                return True
        
        return False
    except Exception as e:
        print(f"Error: {e}")
        return False

result = detect_ai_image('image.jpg')
print(f"Is AI-generated: {result}")`
            },
            {
                type: 'python',
                language: 'python',
                title: 'Python: Analyze Image Features with OpenCV',
                description: 'Use this Python code to analyze image features that indicate AI generation:',
                code: `import cv2
import numpy as np

def analyze_image_features(image_path):
    try:
        img = cv2.imread(image_path)
        
        hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
        
        saturation = hsv[:, :, 1].mean()
        
        edges = cv2.Canny(img, 100, 200)
        edge_density = np.sum(edges > 0) / (img.shape[0] * img.shape[1])
        
        hist = cv2.calcHist([img], [0, 1, 2], None, [8, 8, 8], [0, 256, 0, 256, 0, 256])
        hist = cv2.normalize(hist, hist).flatten()
        uniformity = np.sum(hist ** 2)
        
        is_ai_likely = False
        indicators = []
        
        if saturation > 150:
            indicators.append('High saturation')
            is_ai_likely = True
        
        if edge_density < 0.01:
            indicators.append('Low edge density')
            is_ai_likely = True
        
        if uniformity > 0.1:
            indicators.append('Unnatural color distribution')
            is_ai_likely = True
        
        return is_ai_likely, indicators
    except Exception as e:
        print(f"Error: {e}")
        return False, []

is_ai, indicators = analyze_image_features('image.jpg')
print(f"Is AI-generated: {is_ai}")
print(f"Indicators: {indicators}")`
            },
            {
                type: 'css',
                language: 'css',
                title: 'CSS: Hide AI-Generated Content',
                description: 'Use this CSS code to hide AI-generated content on websites:',
                code: `img[alt*="AI"],
img[alt*="ai"],
img[alt*="generated"],
img[alt*="midjourney"],
img[alt*="dall-e"] {
    display: none !important;
}

.ai-generated,
.ai-content,
.generated-content {
    display: none !important;
}

img[src*="midjourney"],
img[src*="dall-e"],
img[src*="stable-diffusion"] {
    display: none !important;
}

img[src*="ai"]::after {
    content: "Potential AI Content";
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(255, 0, 0, 0.8);
    color: white;
    padding: 2px 5px;
    font-size: 10px;
}`
            },
            {
                type: 'javascript',
                language: 'javascript',
                title: 'JavaScript: Detect AI-Generated Images',
                description: 'Use this JavaScript code to detect AI-generated images in the browser:',
                code: `function detectAIImage(imageElement) {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = 128;
        canvas.height = 128;
        
        ctx.drawImage(imageElement, 0, 0, 128, 128);
        
        const imageData = ctx.getImageData(0, 0, 128, 128);
        const data = imageData.data;
        
        let totalColorDifference = 0;
        let pixelCount = 0;
        
        for (let y = 0; y < 127; y++) {
            for (let x = 0; x < 127; x++) {
                const currentIndex = (y * 128 + x) * 4;
                const nextIndex = (y * 128 + x + 1) * 4;
                
                const r1 = data[currentIndex];
                const g1 = data[currentIndex + 1];
                const b1 = data[currentIndex + 2];
                
                const r2 = data[nextIndex];
                const g2 = data[nextIndex + 1];
                const b2 = data[nextIndex + 2];
                
                const diff = Math.sqrt(
                    Math.pow(r1 - r2, 2) + 
                    Math.pow(g1 - g2, 2) + 
                    Math.pow(b1 - b2, 2)
                );
                
                totalColorDifference += diff;
                pixelCount++;
            }
        }
        
        const avgColorDifference = totalColorDifference / pixelCount;
        const isAiLikely = avgColorDifference > 15;
        resolve(isAiLikely);
    });
}

document.querySelectorAll('img').forEach(async (img) => {
    const isAi = await detectAIImage(img);
    if (isAi) {
        img.style.border = '2px solid red';
        img.title = 'Potential AI-generated image';
    }
});`
            },
            {
                type: 'bash',
                language: 'bash',
                title: 'Bash: Filter AI-Generated Images',
                description: 'Use this bash script to filter AI-generated images in a directory:',
                code: `#!/bin/bash

IMAGE_DIR="./images"

mkdir -p "$IMAGE_DIR/ai"
mkdir -p "$IMAGE_DIR/human"

AI_KEYWORDS=("midjourney" "dall-e" "stable diffusion" "ai generated" "ai art")

for image in "$IMAGE_DIR"/*.{jpg,jpeg,png,webp};
do
    if [ -f "$image" ]; then
        filename=$(basename "$image")
        
        is_ai=false
        for keyword in "$AI_KEYWORDS"; do
            if echo "$filename" | grep -i "$keyword" > /dev/null; then
                is_ai=true
                break
            fi
        done
        
        if command -v exiftool &> /dev/null && ! $is_ai; then
            metadata=$(exiftool "$image" | grep -i "$AI_KEYWORDS" | wc -l)
            if [ "$metadata" -gt 0 ]; then
                is_ai=true
            fi
        fi
        
        if $is_ai; then
            mv "$image" "$IMAGE_DIR/ai/"
            echo "Moved $filename to AI directory"
        else
            mv "$image" "$IMAGE_DIR/human/"
            echo "Moved $filename to Human directory"
        fi
    fi
done

echo "Processing complete!"`
            },
            {
                type: 'php',
                language: 'php',
                title: 'PHP: Detect AI-Generated Images',
                description: 'Use this PHP code to detect AI-generated images on your website:',
                code: `<?php
function detectAIImage($imagePath) {
    $extension = strtolower(pathinfo($imagePath, PATHINFO_EXTENSION));
    $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
    
    if (!in_array($extension, $allowedExtensions)) {
        return false;
    }
    
    $filename = strtolower(basename($imagePath));
    $aiKeywords = ['midjourney', 'dall-e', 'stable diffusion', 'ai generated', 'ai art'];
    
    foreach ($aiKeywords as $keyword) {
        if (strpos($filename, $keyword) !== false) {
            return true;
        }
    }
    
    if (extension_loaded('exif')) {
        try {
            $exif = exif_read_data($imagePath, 'ANY_TAG', true);
            if ($exif) {
                $exifString = strtolower(print_r($exif, true));
                foreach ($aiKeywords as $keyword) {
                    if (strpos($exifString, $keyword) !== false) {
                        return true;
                    }
                }
            }
        } catch (Exception $e) {
        }
    }
    
    return false;
}

$imagePath = 'path/to/image.jpg';
if (detectAIImage($imagePath)) {
    echo "This image is likely AI-generated.";
} else {
    echo "This image appears to be human-created.";
}
?>`
            },
            {
                type: 'ruby',
                language: 'ruby',
                title: 'Ruby: Analyze Image for AI Generation',
                description: 'Use this Ruby code to analyze images for AI generation indicators:',
                code: `require 'mini_magick'

def detect_ai_image(image_path)
  begin
    image = MiniMagick::Image.open(image_path)
    
    filename = File.basename(image_path).downcase
    ai_keywords = ['midjourney', 'dall-e', 'stable diffusion', 'ai generated']
    
    ai_keywords.each do |keyword|
      return true if filename.include?(keyword)
    end
    
    width, height = image.dimensions
    aspect_ratio = width.to_f / height
    if aspect_ratio > 3 || aspect_ratio < 0.3
      return true
    end
    
    begin
      exif = image.exif
      if exif
        exif_string = exif.to_s.downcase
        ai_keywords.each do |keyword|
          return true if exif_string.include?(keyword)
        end
      end
    rescue
    end
    
    false
  rescue
    false
  end
end

result = detect_ai_image('image.jpg')
puts "Is AI-generated: #{result}"`
            },
            {
                type: 'java',
                language: 'java',
                title: 'Java: Detect AI-Generated Images',
                description: 'Use this Java code to detect AI-generated images:',
                code: `import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

public class AIImageDetector {
    
    public static boolean detectAIImage(String imagePath) {
        try {
            File file = new File(imagePath);
            BufferedImage img = ImageIO.read(file);
            
            String filename = file.getName().toLowerCase();
            String[] aiKeywords = {"midjourney", "dall-e", "stable diffusion", "ai generated"};
            
            for (String keyword : aiKeywords) {
                if (filename.contains(keyword)) {
                    return true;
                }
            }
            
            int width = img.getWidth();
            int height = img.getHeight();
            
            double aspectRatio = (double) width / height;
            if (aspectRatio > 3 || aspectRatio < 0.3) {
                return true;
            }
            
            int totalPixels = width * height;
            int[] pixelCounts = new int[256];
            
            for (int y = 0; y < height; y++) {
                for (int x = 0; x < width; x++) {
                    int rgb = img.getRGB(x, y);
                    int red = (rgb >> 16) & 0xFF;
                    pixelCounts[red]++;
                }
            }
            
            int uniqueColors = 0;
            for (int count : pixelCounts) {
                if (count > 0) uniqueColors++;
            }
            
            if (uniqueColors < 50 || uniqueColors > 200) {
                return true;
            }
            
            return false;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }
    
    public static void main(String[] args) {
        String imagePath = "image.jpg";
        boolean isAi = detectAIImage(imagePath);
        System.out.println("Is AI-generated: " + isAi);
    }
}`
            }
        ];
        this.paragraphTemplates = [
            {
                type: 'pain_point',
                generate: (keyword, scenario) => {
                    const city = this.getRandomCity();
                    return `\n<h2>The Growing Problem of AI-Generated Content</h2>\n<p>In today's digital age, users like you in ${city} are increasingly frustrated by the overwhelming amount of AI-generated content cluttering the internet. ${scenario} This issue has become particularly prevalent in image search results, where AI-generated "slop" often outranks authentic, human-created content.</p>\n<p>The problem has reached a critical point in 2026, with major platforms like Pinterest, Google Images, and Etsy becoming flooded with AI-generated images that lack the authenticity and quality of human-created work. Many users report feeling overwhelmed and disillusioned by the constant barrage of fake imagery.</p>\n`;
                }
            },
            {
                type: 'technical_analysis',
                generate: (keyword) => {
                    return `\n<h2>Technical Analysis: How AI Slop Invades Your Search Results</h2>\n<p>To understand why ${keyword} has become such a challenge, we need to look at how AI image generators work and why they're so prevalent. Modern AI models like Midjourney, DALL-E, and Stable Diffusion can produce thousands of images in minutes, often with minimal input from users.</p>\n<p>These AI systems are trained on vast datasets of human-created content, but they lack the creativity, context, and attention to detail that human artists bring to their work. The result is often uncanny, low-quality images that follow predictable patterns and suffer from common artifacts like extra fingers, unrealistic lighting, and generic compositions.</p>\n<p>Search engines, in their quest to index fresh content, often prioritize these AI-generated images because they're produced at such a rapid pace. This creates a vicious cycle where AI content crowds out human-created work, making it harder for users to find authentic images.</p>\n`;
                }
            },
            {
                type: 'solution',
                generate: (keyword) => {
                    const city = this.getRandomCity();
                    return `\n<h2>Slop Killer: Your Solution to AI Clutter</h2>\n<p>Fortunately, there's a powerful tool designed specifically to address this problem: Slop Killer. This innovative solution uses advanced AI detection algorithms to identify and filter out AI-generated content from your search results and social media feeds.</p>\n<p>Slop Killer works by analyzing multiple visual and metadata cues to distinguish between human-created and AI-generated images. Users in ${city} and around the world are already reporting significant improvements in their browsing experience after implementing Slop Killer.</p>\n<p>Whether you're a professional designer looking for authentic references, a blogger seeking high-quality stock photos, or simply a user tired of seeing fake content, Slop Killer provides a clean, curated browsing experience.</p>\n`;
                }
            },
            {
                type: 'how_it_works',
                generate: () => {
                    return `\n<h2>How Slop Killer Works</h2>\n<p>Slop Killer employs a multi-layered approach to detect and filter AI-generated content:</p>\n<ol>\n<li><strong>Metadata Analysis</strong>: The system scans image metadata for telltale signs of AI generation, such as specific software signatures or watermarks.</li>\n<li><strong>Visual Pattern Recognition</strong>: Using advanced computer vision techniques, Slop Killer analyzes pixel patterns, color distributions, and compositional elements that are characteristic of AI-generated content.</li>\n<li><strong>Contextual Analysis</strong>: The tool considers the context in which images appear, including surrounding text and user behavior, to make more accurate judgments.</li>\n<li><strong>Continuous Learning</strong>: Slop Killer's algorithms are constantly updated to keep pace with the latest AI generation techniques, ensuring it remains effective against new forms of AI slop.</li>\n<li><strong>User Customization</strong>: Users can adjust the filtering strength based on their specific needs, allowing for a personalized browsing experience.</li>\n</ol>\n`;
                }
            },
            {
                type: 'faq',
                generate: (keyword) => {
                    return `\n<h2>Frequently Asked Questions</h2>\n<h3>Will Slop Killer completely eliminate all AI-generated content?</h3>\n<p>While Slop Killer is highly effective, no system is 100% perfect. It will significantly reduce the amount of AI slop you see, but some edge cases may still slip through.</p>\n<h3>Does Slop Killer work on all platforms?</h3>\n<p>Yes, Slop Killer is designed to work across major browsers and platforms, including Chrome, Firefox, Safari, and mobile devices.</p>\n<h3>Will using Slop Killer slow down my browsing?</h3>\n<p>No, Slop Killer is optimized for performance and runs efficiently in the background without noticeable impact on your browsing speed.</p>\n<h3>How often is Slop Killer updated?</h3>\n<p>The system receives regular updates to adapt to new AI generation techniques and improve detection accuracy.</p>\n<h3>Is Slop Killer free to use?</h3>\n<p>Slop Killer offers a free version with basic filtering capabilities, and a pro version with advanced features for $9.99.</p>\n`;
                }
            }
        ];
    }

    getRandomCity() {
        return this.cities[Math.floor(Math.random() * this.cities.length)];
    }

    generateTitle(keyword) {
        return `${keyword} | Slop Killer - Filter AI-Generated Content`;
    }

    generateMetaDescription(keyword, scenario) {
        return `Tired of ${keyword}? Slop Killer helps you filter out AI-generated content and find authentic, human-created images. ${scenario}`;
    }

    generateH1(keyword) {
        return `How to ${keyword.replace(/\b(how|to|is|are|why|what|when|where)\b/gi, '').trim()}`;
    }

    generateContent(keyword, scenario) {
        let content = '';
        const shuffledTemplates = [...this.paragraphTemplates].sort(() => Math.random() - 0.5);
        
        shuffledTemplates.forEach(template => {
            content += template.generate(keyword, scenario);
        });
        
        const randomSnippet = this.codeSnippets[Math.floor(Math.random() * this.codeSnippets.length)];
        content += `\n<h2>Code Snippet: ${randomSnippet.title}</h2>\n<p>${randomSnippet.description}</p>\n<pre><code class="${randomSnippet.language}">${randomSnippet.code}</code></pre>\n`;
        
        content += this.generateUniqueTable(keyword);
        
        const contentLength = content.length;
        const cta30 = Math.floor(contentLength * 0.3);
        const cta80 = Math.floor(contentLength * 0.8);
        
        let break30 = content.indexOf('\n\n', cta30);
        if (break30 === -1) break30 = cta30;
        
        let break80 = content.indexOf('\n\n', cta80);
        if (break80 === -1) break80 = cta80;
        
        const ctaCard = `\n\n<div style="background: linear-gradient(135deg, #ff3333, #333333); color: white; padding: 2rem; border-radius: 10px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); position: fixed; right: 2rem; top: 50%; transform: translateY(-50%); z-index: 1000; width: 300px;">\n    <div style="display: flex; flex-direction: column; gap: 1rem;">\n        <h3 style="margin: 0; font-size: 1.5rem;">Slop Killer Pro</h3>\n        <p class="cta-personalized" style="margin: 0; font-size: 1.1rem;">Get Slop Killer Pro for enhanced protection.</p>\n        <p style="margin: 0; font-size: 1rem; opacity: 0.9;">Today's total filtered images: <span class="slop-counter" style="font-weight: bold; font-size: 1.2rem;">0</span></p>\n        <ul style="margin: 1rem 0; padding-left: 1.5rem;">\n            <li>Unlimited image processing</li>\n            <li>Advanced AI detection algorithms</li>\n            <li>Real-time filtering</li>\n            <li>Priority support</li>\n        </ul>\n        <button style="background-color: white; color: #ff3333; border: none; padding: 0.8rem 1.5rem; border-radius: 4px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">\n            Upgrade to Pro for $9.99\n        </button>\n    </div>\n</div>\n\n`;
        
        content = content.substring(0, break30) + ctaCard + content.substring(break30);
        
        const newContentLength = content.length;
        const adjustedCta80 = break80 + ctaCard.length;
        
        let newBreak80 = content.indexOf('\n\n', adjustedCta80);
        if (newBreak80 === -1) newBreak80 = adjustedCta80;
        
        content = content.substring(0, newBreak80) + ctaCard + content.substring(newBreak80);
        
        content += `\n<h2>Interactive AI Slop Calculators</h2>\n<p>Use these tools to understand the impact of AI-generated content and identify potential AI slop.</p>\n\n<h3>AI Distraction Time Waster Calculator</h3>\n<p>Calculate how much time you're losing to AI-generated content:</p>\n\n<div class="calculator-card">\n    <h3>AI Distraction Time Waster Calculator</h3>\n    <p>Calculate how much time you're losing to AI-generated content:</p>\n    <div class="calculator-content">\n        <div class="form-group">\n            <label for="daily-searches">Daily Image Searches</label>\n            <input type="number" id="daily-searches" min="1" max="100" value="10">\n        </div>\n        <div class="form-group">\n            <label for="seconds-wasted">Seconds Wasted per AI Image</label>\n            <input type="number" id="seconds-wasted" min="1" max="60" value="15">\n        </div>\n        <button id="calculate-time" class="btn btn-primary">Calculate</button>\n        <div class="result" id="time-result">\n            <p>Annual Productivity Loss: <span id="time-wasted">0</span> Hours</p>\n            <p>Status: <span id="productivity-status">Critical Productivity Drain</span></p>\n        </div>\n    </div>\n</div>\n\n<h3>Image Authenticity Probability Calculator</h3>\n<p>Check if an image might be AI-generated by selecting its features:</p>\n\n<div class="calculator-card">\n    <h3>Image Authenticity Probability Calculator</h3>\n    <p>Check if an image might be AI-generated by selecting its features:</p>\n    <div class="calculator-content">\n        <div class="form-group features">\n            <label>Image Features (select applicable)</label>\n            <div class="feature-options">\n                <label><input type="checkbox" class="feature" value="10"> Incorrect finger count</label>\n                <label><input type="checkbox" class="feature" value="15"> Oversaturation</label>\n                <label><input type="checkbox" class="feature" value="12"> Blurry background</label>\n                <label><input type="checkbox" class="feature" value="18"> Unnatural lighting</label>\n                <label><input type="checkbox" class="feature" value="20"> Strange facial expressions</label>\n                <label><input type="checkbox" class="feature" value="8"> Object proportion issues</label>\n                <label><input type="checkbox" class="feature" value="14"> Unrealistic textures</label>\n                <label><input type="checkbox" class="feature" value="16"> Abrupt color transitions</label>\n            </div>\n        </div>\n        <button id="calculate-probability" class="btn btn-primary">Calculate AI Probability</button>\n        <div class="result" id="probability-result">\n            <p>AI Generation Probability: <span id="ai-probability">0</span>%</p>\n        </div>\n    </div>\n</div>\n\n<style>\n.calculator-card {\n    background: linear-gradient(135deg, #ffffff, #f8f9fa);\n    border-radius: 16px;\n    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);\n    padding: 2rem;\n    margin: 2rem 0;\n    border: 1px solid #e9ecef;\n    transition: all 0.3s ease;\n}\n\n.calculator-card:hover {\n    transform: translateY(-5px);\n    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);\n}\n\n.calculator-card h3 {\n    margin-top: 0;\n    margin-bottom: 1.5rem;\n    color: #333333;\n    font-size: 1.5rem;\n    font-weight: 700;\n    text-align: center;\n    background: linear-gradient(135deg, #ff3333, #ff6666);\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    background-clip: text;\n}\n\n.calculator-card p {\n    margin-bottom: 1.5rem;\n    color: #666666;\n    font-size: 1.1rem;\n    text-align: center;\n}\n\n.calculator-content {\n    display: flex;\n    flex-direction: column;\n    gap: 1.5rem;\n}\n\n.form-group {\n    display: flex;\n    flex-direction: column;\n    gap: 0.8rem;\n}\n\n.form-group label {\n    font-weight: 600;\n    color: #333333;\n    font-size: 1.1rem;\n}\n\n.form-group input[type="number"] {\n    padding: 1rem 1.2rem;\n    border: 2px solid #e0e0e0;\n    border-radius: 12px;\n    font-size: 1.1rem;\n    font-weight: 500;\n    transition: all 0.3s ease;\n    background-color: #fafafa;\n}\n\n.form-group input[type="number"]:focus {\n    outline: none;\n    border-color: #ff3333;\n    box-shadow: 0 0 0 4px rgba(255, 51, 51, 0.1);\n    background-color: #ffffff;\n    transform: translateY(-2px);\n}\n\n.feature-options {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n    gap: 1rem;\n    margin-top: 0.8rem;\n}\n\n.feature-options label {\n    display: flex;\n    align-items: center;\n    gap: 0.8rem;\n    font-weight: 500;\n    cursor: pointer;\n    padding: 0.8rem 1rem;\n    border-radius: 10px;\n    border: 2px solid #e0e0e0;\n    transition: all 0.3s ease;\n    background-color: #ffffff;\n}\n\n.feature-options label:hover {\n    background-color: rgba(255, 51, 51, 0.05);\n    border-color: #ff3333;\n    transform: translateY(-2px);\n}\n\n.btn {\n    padding: 1rem 1.8rem;\n    border: none;\n    border-radius: 12px;\n    font-size: 1.1rem;\n    font-weight: 600;\n    cursor: pointer;\n    transition: all 0.3s ease;\n    position: relative;\n    overflow: hidden;\n}\n\n.btn-primary {\n    background: linear-gradient(135deg, #ff3333, #ff6666);\n    color: #ffffff;\n    box-shadow: 0 4px 12px rgba(255, 51, 51, 0.3);\n}\n\n.btn-primary:hover {\n    background: linear-gradient(135deg, #ff1a1a, #ff4d4d);\n    transform: translateY(-3px);\n    box-shadow: 0 6px 16px rgba(255, 51, 51, 0.4);\n}\n\n.result {\n    margin-top: 1.5rem;\n    padding: 1.5rem;\n    background: linear-gradient(135deg, #fafafa, #ffffff);\n    border-radius: 12px;\n    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);\n    border: 1px solid #e0e0e0;\n    position: relative;\n    transition: all 0.3s ease;\n}\n\n.result::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 4px;\n    background: linear-gradient(to right, #ff3333, #ff6666);\n    border-radius: 12px 12px 0 0;\n}\n\n.result:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);\n}\n\n.result p {\n    margin: 0;\n    font-size: 1.2rem;\n    color: #333333;\n    font-weight: 500;\n}\n\n.result span {\n    font-weight: 700;\n    color: #ff3333;\n    font-size: 1.4rem;\n    transition: all 0.5s ease;\n    display: inline-block;\n}\n\n.result.animate span {\n    animation: pulse 0.8s ease-in-out;\n}\n\n@keyframes pulse {\n    0% {\n        transform: scale(1);\n        opacity: 1;\n    }\n    50% {\n        transform: scale(1.3);\n        opacity: 0.8;\n    }\n    100% {\n        transform: scale(1);\n        opacity: 1;\n    }\n}\n\n.feature-options input[type="checkbox"] {\n    position: relative;\n    appearance: none;\n    width: 20px;\n    height: 20px;\n    border: 2px solid #e0e0e0;\n    border-radius: 4px;\n    background-color: #ffffff;\n    cursor: pointer;\n    transition: all 0.3s ease;\n}\n\n.feature-options input[type="checkbox"]:checked {\n    background-color: #ff3333;\n    border-color: #ff3333;\n}\n\n.feature-options input[type="checkbox"]:checked::after {\n    content: '✓';\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    color: white;\n    font-size: 14px;\n    font-weight: bold;\n}\n\n.feature-options input[type="checkbox"]:hover {\n    border-color: #ff3333;\n    transform: scale(1.1);\n}\n\n.form-group input[type="number"]::-webkit-inner-spin-button,\n.form-group input[type="number"]::-webkit-outer-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n}\n\n.form-group input[type="number"] {\n    -moz-appearance: textfield;\n    appearance: textfield;\n}\n\n@media (max-width: 768px) {\n    .calculator-card {\n        padding: 1.5rem;\n    }\n    \n    .feature-options {\n        grid-template-columns: 1fr;\n    }\n    \n    .btn {\n        padding: 0.9rem 1.5rem;\n    }\n}\n</style>\n`;
        
        if (content.split(' ').length < 800) {
            content += `\n<h2>The Impact of AI Slop on Creativity</h2>\n<p>The proliferation of AI-generated content isn't just an annoyance—it's a threat to human creativity. When AI slop dominates search results and social media feeds, it becomes harder for human artists, photographers, and designers to get their work seen.</p>\n<p>This creates a disincentive for creative professionals to continue producing original content, as their work is often overshadowed by AI-generated alternatives. The result is a homogenization of visual culture, where everything starts to look the same.</p>\n<p>Slop Killer helps level the playing field by giving human-created content the visibility it deserves. By filtering out AI slop, we're not just improving your browsing experience—we're supporting the creative community.</p>\n`;
        }
        
        return content;
    }

    generatePage(keywordData) {
        const { keyword, scenario } = keywordData;
        const title = this.generateTitle(keyword);
        const metaDescription = this.generateMetaDescription(keyword, scenario);
        const h1 = this.generateH1(keyword);
        const content = this.generateContent(keyword, scenario);
        
        const jsonLd = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Slop Killer",
  "description": "A tool to detect and filter AI-generated content",
  "url": "https://slopkiller.com",
  "applicationCategory": "Productivity",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "9.99",
    "priceCurrency": "USD",
    "priceValidUntil": "2027-12-31",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Slop Killer"
    }
  }
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Will Slop Killer completely eliminate all AI-generated content?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "While Slop Killer is highly effective, no system is 100% perfect. It will significantly reduce the amount of AI slop you see, but some edge cases may still slip through."
      }
    },
    {
      "@type": "Question",
      "name": "Does Slop Killer work on all platforms?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Slop Killer is designed to work across major browsers and platforms, including Chrome, Firefox, Safari, and mobile devices."
      }
    },
    {
      "@type": "Question",
      "name": "Will using Slop Killer slow down my browsing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, Slop Killer is optimized for performance and runs efficiently in the background without noticeable impact on your browsing speed."
      }
    },
    {
      "@type": "Question",
      "name": "How often is Slop Killer updated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The system receives regular updates to adapt to new AI generation techniques and improve detection accuracy."
      }
    },
    {
      "@type": "Question",
      "name": "Is Slop Killer free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Slop Killer offers a free version with basic filtering capabilities, and a pro version with advanced features for $9.99."
      }
    }
  ]
}
</script>
`;

        const script = `
<script>
    document.getElementById('calculate-time').addEventListener('click', function() {
        const dailySearches = parseInt(document.getElementById('daily-searches').value);
        const secondsWasted = parseInt(document.getElementById('seconds-wasted').value);
        const daysPerYear = 365;
        const hoursPerYear = (dailySearches * secondsWasted * daysPerYear) / 3600;
        
        const timeWastedElement = document.getElementById('time-wasted');
        const productivityStatusElement = document.getElementById('productivity-status');
        const timeResultElement = document.getElementById('time-result');
        
        timeResultElement.classList.add('animate');
        
        let currentValue = 0;
        const targetValue = hoursPerYear.toFixed(1);
        const duration = 1000;
        const step = targetValue / (duration / 16);
        
        // Update productivity status based on hours lost
        if (hoursPerYear > 100) {
            productivityStatusElement.textContent = 'Critical Productivity Drain';
        } else if (hoursPerYear > 50) {
            productivityStatusElement.textContent = 'Significant Productivity Loss';
        } else {
            productivityStatusElement.textContent = 'Moderate Productivity Impact';
        }
        
        const updateValue = function() {
            currentValue += step;
            if (currentValue < targetValue) {
                timeWastedElement.textContent = currentValue.toFixed(1);
                requestAnimationFrame(updateValue);
            } else {
                timeWastedElement.textContent = targetValue;
                setTimeout(function() {
                    timeResultElement.classList.remove('animate');
                }, 800);
            }
        };
        
        updateValue();
    });

    document.getElementById('calculate-probability').addEventListener('click', function() {
        const features = document.querySelectorAll('.feature:checked');
        let totalScore = 0;
        
        features.forEach(function(feature) {
            totalScore += parseInt(feature.value);
        });
        
        let probability = Math.min(totalScore, 100);
        
        const aiProbabilityElement = document.getElementById('ai-probability');
        const probabilityResultElement = document.getElementById('probability-result');
        
        probabilityResultElement.classList.add('animate');
        
        let currentValue = 0;
        const targetValue = probability;
        const duration = 1000;
        const step = targetValue / (duration / 16);
        
        const updateValue = function() {
            currentValue += step;
            if (currentValue < targetValue) {
                aiProbabilityElement.textContent = Math.round(currentValue);
                requestAnimationFrame(updateValue);
            } else {
                aiProbabilityElement.textContent = targetValue;
                setTimeout(function() {
                    probabilityResultElement.classList.remove('animate');
                }, 800);
            }
        };
        
        updateValue();
    });

    function updateCounter() {
        const today = new Date().toISOString().split('T')[0];
        
        let counter = localStorage.getItem('slop_killer_counter_' + today);
        if (!counter) {
            counter = Math.floor(10000 + Math.random() * 5000);
        } else {
            counter = parseInt(counter);
        }
        
        counter += Math.floor(Math.random() * 10) + 1;
        
        localStorage.setItem('slop_killer_counter_' + today, counter);
        
        const counterElements = document.querySelectorAll('.slop-counter');
        counterElements.forEach(element => {
            element.textContent = counter.toLocaleString();
        });
    }

    updateCounter();
    setInterval(updateCounter, 5000);

    function trackVisit() {
        const visits = localStorage.getItem('slop_killer_visits') || 0;
        localStorage.setItem('slop_killer_visits', parseInt(visits) + 1);
        
        const visitCount = parseInt(localStorage.getItem('slop_killer_visits'));
        const ctaElements = document.querySelectorAll('.cta-personalized');
        ctaElements.forEach(element => {
            if (visitCount === 1) {
                element.textContent = "Welcome! Try Slop Killer Pro for free today.";
            } else if (visitCount > 5) {
                element.textContent = "You've visited us multiple times. Ready to upgrade to Pro?";
            } else {
                element.textContent = "Get Slop Killer Pro for enhanced protection.";
            }
        });
    }

    trackVisit();
</script>
`;
        
        return {
            keyword,
            title,
            metaDescription,
            h1,
            content,
            script,
            jsonLd
        };
    }

    generateUniqueTable(keyword) {
        let seed = keyword.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        
        const random = (min, max) => {
            seed = (seed * 9301 + 49297) % 233280;
            return min + (seed / 233280) * (max - min);
        };
        
        const platforms = [
            'Google Images',
            'Pinterest',
            'Etsy',
            'ArtStation',
            'Shutterstock',
            'Unsplash',
            'Flickr',
            'DeviantArt'
        ];
        
        const tableData = platforms.map(platform => {
            const aiSlopDensity = Math.round(random(10, 90));
            const humanAccuracy = Math.round(random(70, 95));
            const aiPollutedAccuracy = Math.round(humanAccuracy - random(10, 40));
            
            return {
                platform,
                aiSlopDensity,
                humanAccuracy,
                aiPollutedAccuracy: Math.max(aiPollutedAccuracy, 10)
            };
        });
        
        let tableHtml = `\n## AI Slop Impact Data\n\nThis table shows the impact of AI-generated content on different platforms:\n\n<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">\n`;
        
        tableHtml += `  <tr style="background-color: #f2f2f2;">\n`;
        tableHtml += `    <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Platform</th>\n`;
        tableHtml += `    <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">AI Density</th>\n`;
        tableHtml += `    <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Authenticity Score</th>\n`;
        tableHtml += `    <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Filter Success Rate</th>\n`;
        tableHtml += `  </tr>\n`;
        
        tableData.forEach((row, index) => {
            const bgColor = index % 2 === 0 ? '#ffffff' : '#f9f9f9';
            tableHtml += `  <tr style="background-color: ${bgColor};">\n`;
            tableHtml += `    <td style="border: 1px solid #ddd; padding: 12px;">${row.platform}</td>\n`;
            tableHtml += `    <td style="border: 1px solid #ddd; padding: 12px;">${row.aiSlopDensity}%</td>\n`;
            tableHtml += `    <td style="border: 1px solid #ddd; padding: 12px;">${row.humanAccuracy}%</td>\n`;
            tableHtml += `    <td style="border: 1px solid #ddd; padding: 12px;">${Math.round((row.humanAccuracy / (row.aiPollutedAccuracy || 1)) * 100)}%</td>\n`;
            tableHtml += `  </tr>\n`;
        });
        
        tableHtml += `</table>\n`;
        
        return tableHtml;
    }

    generateAllPages() {
        return this.keywords.map(keywordData => this.generatePage(keywordData));
    }
}

const fs = require('fs');
const path = require('path');

const keywordsPath = path.join(__dirname, 'seo_keywords.json');
const keywords = JSON.parse(fs.readFileSync(keywordsPath, 'utf8'));

const generator = new PageGenerator(keywords);
const pages = generator.generateAllPages();

// 生成JSON数据
const outputPath = path.join(__dirname, 'generated_pages.json');
fs.writeFileSync(outputPath, JSON.stringify(pages, null, 2));

// 为每个关键词生成HTML文件
pages.forEach(page => {
    const filename = page.keyword.toLowerCase().replace(/\s+/g, '-') + '.html';
    const filePath = path.join(__dirname, filename);
    
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="google-site-verification" content="uTT2vLHXrvh44esSpln_EMc1QEFjkN0vjJZ04UgI0Qc" />
    <title>${page.title}</title>
    <meta name="description" content="${page.metaDescription}">
    ${page.jsonLd}
    <style>
        :root {
            --primary-color: #ff4e4e;
            --primary-hover: #ff3333;
            --secondary-color: #ff6666;
            --text-color: #333333;
            --text-light: #666666;
            --background-color: #ffffff;
            --card-bg: #f8f9fa;
            --border-color: #e9ecef;
            --shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            --shadow-hover: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: var(--text-color);
            background-color: var(--background-color);
        }

        header {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            padding: 2rem 0;
            text-align: center;
            box-shadow: var(--shadow);
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
        }

        h1 {
            font-size: 2rem;
            margin-bottom: 1rem;
            color: var(--text-color);
        }

        h2 {
            font-size: 1.5rem;
            margin: 2rem 0 1rem;
            color: var(--primary-color);
        }

        h3 {
            font-size: 1.2rem;
            margin: 1.5rem 0 1rem;
            color: var(--text-color);
        }

        p {
            margin-bottom: 1rem;
        }

        code {
            background-color: #f4f4f4;
            padding: 0.2rem 0.4rem;
            border-radius: 4px;
            font-family: 'Courier New', Courier, monospace;
        }

        pre {
            background-color: #f4f4f4;
            padding: 1rem;
            border-radius: 4px;
            overflow-x: auto;
            margin: 1rem 0;
        }

        pre code {
            background: none;
            padding: 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }

        th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }

        tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        .calculator-card {
            background: linear-gradient(135deg, #ffffff, #f8f9fa);
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            padding: 2rem;
            margin: 2rem 0;
            border: 1px solid #e9ecef;
            transition: all 0.3s ease;
        }

        .calculator-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
        }

        .calculator-card h3 {
            margin-top: 0;
            margin-bottom: 1.5rem;
            color: #333333;
            font-size: 1.5rem;
            font-weight: 700;
            text-align: center;
            background: linear-gradient(135deg, #ff4e4e, #ff6666);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .calculator-card p {
            margin-bottom: 1.5rem;
            color: #666666;
            font-size: 1.1rem;
            text-align: center;
        }

        .calculator-content {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
        }

        .form-group label {
            font-weight: 600;
            color: #333333;
            font-size: 1.1rem;
        }

        .form-group input[type="number"] {
            padding: 1rem 1.2rem;
            border: 2px solid #e0e0e0;
            border-radius: 12px;
            font-size: 1.1rem;
            font-weight: 500;
            transition: all 0.3s ease;
            background-color: #fafafa;
        }

        .form-group input[type="number"]:focus {
            outline: none;
            border-color: #ff4e4e;
            box-shadow: 0 0 0 4px rgba(255, 78, 78, 0.1);
            background-color: #ffffff;
            transform: translateY(-2px);
        }

        .feature-options {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 1rem;
            margin-top: 0.8rem;
        }

        .feature-options label {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            font-weight: 500;
            cursor: pointer;
            padding: 0.8rem 1rem;
            border-radius: 10px;
            border: 2px solid #e0e0e0;
            transition: all 0.3s ease;
            background-color: #ffffff;
        }

        .feature-options label:hover {
            background-color: rgba(255, 78, 78, 0.05);
            border-color: #ff4e4e;
            transform: translateY(-2px);
        }

        .btn {
            padding: 1rem 1.8rem;
            border: none;
            border-radius: 12px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .btn-primary {
            background: linear-gradient(135deg, #ff4e4e, #ff6666);
            color: #ffffff;
            box-shadow: 0 4px 12px rgba(255, 78, 78, 0.3);
        }

        .btn-primary:hover {
            background: linear-gradient(135deg, #ff3333, #ff4e4e);
            transform: translateY(-3px);
            box-shadow: 0 6px 16px rgba(255, 78, 78, 0.4);
        }

        .result {
            margin-top: 1.5rem;
            padding: 1.5rem;
            background: linear-gradient(135deg, #fafafa, #ffffff);
            border-radius: 12px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
            border: 1px solid #e0e0e0;
            position: relative;
            transition: all 0.3s ease;
        }

        .result::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(to right, #ff4e4e, #ff6666);
            border-radius: 12px 12px 0 0;
        }

        .result:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        .result p {
            margin: 0;
            font-size: 1.2rem;
            color: #333333;
            font-weight: 500;
        }

        .result span {
            font-weight: 700;
            color: #ff4e4e;
            font-size: 1.4rem;
            transition: all 0.5s ease;
            display: inline-block;
        }

        .result.animate span {
            animation: pulse 0.8s ease-in-out;
        }

        @keyframes pulse {
            0% {
                transform: scale(1);
                opacity: 1;
            }
            50% {
                transform: scale(1.3);
                opacity: 0.8;
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }

        .feature-options input[type="checkbox"] {
            position: relative;
            appearance: none;
            width: 20px;
            height: 20px;
            border: 2px solid #e0e0e0;
            border-radius: 4px;
            background-color: #ffffff;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .feature-options input[type="checkbox"]:checked {
            background-color: #ff4e4e;
            border-color: #ff4e4e;
        }

        .feature-options input[type="checkbox"]:checked::after {
            content: '✓';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-size: 14px;
            font-weight: bold;
        }

        .feature-options input[type="checkbox"]:hover {
            border-color: #ff4e4e;
            transform: scale(1.1);
        }

        .form-group input[type="number"]::-webkit-inner-spin-button,
        .form-group input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        .form-group input[type="number"] {
            -moz-appearance: textfield;
            appearance: textfield;
        }

        @media (max-width: 768px) {
            .container {
                padding: 1rem;
            }

            h1 {
                font-size: 1.8rem;
            }

            .calculator-card {
                padding: 1.5rem;
            }

            .feature-options {
                grid-template-columns: 1fr;
            }

            .btn {
            padding: 0.9rem 1.5rem;
        }
    }

    /* 页脚样式 */
    .footer {
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        padding: 2rem 0;
        text-align: center;
        margin-top: 4rem;
        margin-bottom: 80px;
    }

    .footer-content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
    }

    .footer-links {
        display: flex;
        justify-content: center;
        gap: 2rem;
        margin-bottom: 1rem;
        flex-wrap: wrap;
    }

    .footer-link {
        color: white;
        text-decoration: none;
        transition: color 0.3s ease;
    }

    .footer-link:hover {
        color: var(--text-color);
    }

    /* 为Site Map链接添加白色颜色 */
    .footer-content p a {
        color: white;
        text-decoration: none;
    }

    .footer-content p a:hover {
        color: var(--text-color);
        text-decoration: none;
    }

    /* 面包屑导航样式 */
    .breadcrumb {
        position: absolute;
        left: 2rem;
        top: 50%;
        transform: translateY(-50%);
        color: white;
        font-size: 0.9rem;
    }

    .breadcrumb a {
        color: white;
        text-decoration: none;
        margin: 0 0.5rem;
    }

    .breadcrumb a:hover {
        text-decoration: underline;
    }

    .breadcrumb::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        z-index: -1;
        opacity: 0.8;
    }
</style>
</head>
<body>
    <header>
        <div class="container" style="position: relative;">
            <div class="breadcrumb">
                <a href="index.html">Home</a> &gt; <a href="directory.html">Solutions Directory</a> &gt; ${page.keyword}
            </div>
            <h1>Slop Killer</h1>
            <p>Filter AI-Generated Content and Reclaim Your Internet</p>
        </div>
    </header>

    <div class="container">
        <h1>${page.h1}</h1>
        ${page.content}
    </div>

    ${page.script}

    <footer class="footer">
        <div class="footer-content">
            <div class="footer-links">
                <a href="https://www.wangdadi.xyz" class="footer-link">Home</a>
                <a href="directory.html" class="footer-link">Solutions Directory</a>
            </div>
            <p>&copy; 2026 Slop Killer. All rights reserved. | <a href="sitemap.html">Site Map</a> | Support: 457239850@qq.com</p>
        </div>
    </footer>
</body>
</html>`;
    
    fs.writeFileSync(filePath, htmlContent);
    console.log(`Generated HTML file: ${filename}`);
});

console.log(`Generated ${pages.length} SEO pages and saved to ${outputPath}`);
console.log(`Generated ${pages.length} HTML files`);
