const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

// Assuming you have a file named 'resumeData.json' to store the data
const DATA_FILE = 'resumeData.json';

// Read data from file when starting the server
let resumeData;
try {
  const data = fs.readFileSync(DATA_FILE, 'utf8');
  resumeData = JSON.parse(data);
} catch (err) {
  console.error("Error reading file:", err);
  resumeData = { "Experience": [], "Skills": [] }; // Default data if file read fails
}


app.get("/resume", (req, res) => {
    res.json(resumeData);
});

app.post("/resume", (req, res) => {
    resumeData = req.body;
    
    fs.writeFile(DATA_FILE, JSON.stringify(resumeData, null, 2), 'utf8', (err) => {
      if (err) {
        console.error("Error writing to file:", err);
        res.status(500).json({ message: "Error saving data" });
      } else {
        res.status(200).json({ message: "Resume data updated successfully" });
      }
    });
  });
  

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
