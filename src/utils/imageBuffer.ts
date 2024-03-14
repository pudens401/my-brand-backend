const PNG = require('pngjs').PNG;

// Your binary image data
const binaryImageData = "000111000\n111000111\n000111000";

// Define image dimensions
const imageWidth = 3;
const imageHeight = 3;

// Create a PNG instance
const png = new PNG({ width: imageWidth, height: imageHeight });

// Fill PNG data based on binary image data
for (let y = 0; y < imageHeight; y++) {
    for (let x = 0; x < imageWidth; x++) {
        const idx = (png.width * y + x) << 2;
        const pixelValue = parseInt(binaryImageData[y * imageWidth + x]);
        const color = pixelValue === 1 ? 255 : 0; // 255 for white, 0 for black
        png.data[idx] = color; // Red
        png.data[idx + 1] = color; // Green
        png.data[idx + 2] = color; // Blue
        png.data[idx + 3] = 255; // Alpha (fully opaque)
    }
}

// Convert PNG to buffer
export const pngBuffer = PNG.sync.write(png);

// Display the buffer
console.log(pngBuffer);

// Export the buffer

