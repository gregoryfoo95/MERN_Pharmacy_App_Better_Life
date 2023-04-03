const Location = require('../models/Location');

const createLocation = async(req,res) => {
    try {
        const location = new Location (req.body);
        await location.save();
        res.status (201).json({success: true,data: location});
    } catch (error){
        res.status(400).json({success: false, error: error.message});
    }
};

const getLocations = async (req, res) => {
    try {
      const locations = await Location.find();
      res.status(200).json({ success: true, data: locations });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
};

const getLocationById = async (req, res) => {
    try {
      const location = await Location.findById(req.params.id);
      if (!location) {
        return res.status(404).json({ success: false, error: 'Location not found' });
      }
      res.status(200).json({ success: true, data: location });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
};

const updateLocation = async (req, res) => {
    try {
      const location = await Location.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!location) {
        return res.status(404).json({ success: false, error: 'Location not found' });
      }
      res.status(200).json({ success: true, data: location });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
};

const deleteLocation = async (req, res) => {
    try {
      const location = await Location.findByIdAndDelete(req.params.id);
      if (!location) {
        return res.status(404).json({ success: false, error: 'Location not found' });
      }
      res.status(200).json({ success: true, data: {} });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
};


module.exports = {
    createLocation,
    getLocations,
    getLocationById,
    updateLocation,
    deleteLocation,
};
