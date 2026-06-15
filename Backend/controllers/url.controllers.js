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


