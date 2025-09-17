const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 3000;

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // The directory where files will be saved
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Serve static files (like our.html)
app.use(express.static(path.join(__dirname, 'public')));

// Handle form submission
app.post('/submit-application', upload.single('cv'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No CV file uploaded.' });
    }

    const { name, email, department } = req.body;

    console.log(`Received new application:`);
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Department: ${department}`);
    console.log(`CV saved at: ${req.file.path}`);

    // You would typically save this data to a database or send an email here

    res.json({ success: true, message: 'Thank you for your application! We will be in touch.' });
  } catch (error) {
    console.error('Error processing application:', error);
    res.status(500).json({ success: false, message: 'An error occurred during submission.' });
  }
});

// Create the 'uploads' directory if it doesn't exist
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});