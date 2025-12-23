import Progress from "../models/TransformationModel.js";
import multer from "multer";

// Configure Multer to store files in memory as buffers
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const addProgress = [
    upload.single('image'),  // Image field name in form data
    async (req, res) => {
        //console.log("File received:", req.file);
        const { weight, biceps, chest, waist, date } = req.body;
        if (!req.file) {
            return res.status(400).json({ message: "Image file is required" });
        }
        const image = req.file.buffer.toString('base64');
       // const image = req.file ? req.file.buffer : null; // Get the binary data from Multer

        try {
            // Create a new progress entry with the image as a buffer
            const savedProgress = await Progress.create({
                weight,
                biceps,
                chest,
                waist,
                date,
                image, // Store image as binary data
                imageType: req.file.mimetype, // Optionally store MIME type
                user: req.user._id,
            });

          //  res.status(201).json(savedProgress);
          res.status(201).json({
            ...savedProgress.toObject(),
            image, // Ensures `image` is sent as a base64 string
        });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
];

const getProgress = async (req, res) => {
    try {
      const progressEntries = await Progress.find({ user: req.user._id }); // Fetch all progress entries
      //res.status(200).json(progressEntries);
      const formattedEntries = progressEntries.map(entry => ({
        ...entry.toObject(), // Convert each Mongoose document to a plain object
        image: entry.image,  // Use stored base64 string directly
        imageType: entry.imageType
    }));
    res.status(200).json(formattedEntries);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve progress entries", error: error.message });
    }
  };  

const deleteProgress = async (req,res) => {
  try {
    const deleteProgress = await Progress.findByIdAndDelete(req.params.id)
    if(!deleteProgress) return res.status(404).json({message: 'Progress not found'})
    res.json({message: 'Progress deleted'})
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}

export {addProgress,getProgress,deleteProgress}
