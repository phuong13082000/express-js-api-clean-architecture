import {saveImage} from "../../utils/uploadImageLocal.js";

const imageController = () => ({
    upload: async (req, res) => {
        try {
            const file = req.file;

            if (!file) {
                return res.status(400).json({status: "error", message: "No file uploaded"});
            }

            const imagePath = saveImage(file);

            return res.status(201).json({
                status: "success",
                data: {url: imagePath},
                message: "Image uploaded successfully",
            })
        } catch (e) {
            return res.status(500).json({status: "error", message: e.message});
        }
    }
})

export default imageController;
