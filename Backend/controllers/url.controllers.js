import Url from "../models/url.model.js";
import shortid from "shortid";  
export const createShortenUrl = async (req,res) => {
  try {
    const { shortenUrl } = req.body;
    if (!shortenUrl) {
      return res.status(400).json({ message: "Original URL is required" });
    }
    const shortCode = shortid.generate();
    const url = await Url.create({
      shortenUrl,
      shortCode,
    })
    res.status(201).json({shorturl:`http://localhost:8000/api/${shortCode}`})
     
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: " internal Server Error" });
  }
}


export const getoriginalUrl = async (req,res) => {
  try {
         const {shortCode}=req.params;
    const originalUrl = await Url.findOne({
      shortCode
    })
    if(!originalUrl){
      return res.status(400).json({message:"url not found"})
    }
  res.redirect(originalUrl.shortenUrl)

  } catch (error) {
    console.error( error);
    return res.status(500).json({ message: "Server Error" });
  }
};




// import Url from "../models/url.model.js";
// import { nanoid } from "nanoid";

// // CREATE SHORT URL
// export const createShortUrl = async (req, res) => {
//   try {
//     const { originalUrl } = req.body;

//     if (!originalUrl) {
//       return res.status(400).json({ message: "Original URL required" });
//     }

//     const shortCode = nanoid(6);

//     const newUrl = await Url.create({
//       originalUrl,
//       shortCode
//     });

//     res.status(201).json({
//       shortUrl: `${req.protocol}://${req.get("host")}/${shortCode}`
//     });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // REDIRECT TO ORIGINAL URL
// export const getOriginalUrl = async (req, res) => {
//   try {
//     const { shortCode } = req.params;

//     const url = await Url.findOne({ shortCode });

//     if (!url) {
//       return res.status(404).json({ message: "URL not found" });
//     }

//     res.redirect(url.originalUrl);

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
