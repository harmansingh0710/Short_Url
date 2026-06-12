import mongoose from 'mongoose';    
const urlSchema = new mongoose.Schema({
  shortenUrl: {
    type: String,
    required: true,
  },
  shortCode: {
    type: String,
    required: true,
    unique: true
  }
},{timestamps:true});

const Url = mongoose.model('Url', urlSchema);
export default Url;


