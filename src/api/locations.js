const {Router} = require('express');
const Locations = require('../persistence/locations');
const Addresses = require('../persistence/addresses');
const HoursPersistence = require('../persistence/hours');


const router = new Router();

router.post('/', async (req, res) => {
  try {
    const {businessId, locationName, primaryPhone, website, storeCode, address, hours} = req.body;
    if (!businessId || !locationName || !primaryPhone || !website || !storeCode || !address) {
      return res
        .status(400)
        .json({message: 'All fields must be provided'});
    }
    const savedAddress = await Addresses.create(address.addressLine, address.locality, address.region, address.postalCode)
    const location = await Locations.create(businessId, locationName, primaryPhone, website, storeCode, savedAddress.id);
    const savedHours = await HoursPersistence.create(hours, location.id);

    if (!location) {
      return res.status(400).json({message: 'Location already exists'});
    }

    return res.status(200).json(location);
  } catch (error) {
    console.error(
      `createLocation({ location: ${req.body.locationName} }) >> Error: ${error.stack}`
    );
    res.status(500).json();
  }
});

router.get('/:id', async (req, res) => {
    if (!req.params.id) {
        return res.sendStatus(400);
    }

    try {
        const location = await Locations.find(req.params.id);
        location.address = await Addresses.find(location.address_id);

        if (!location) {
            return res.sendStatus(200);
        }
        res.json(location);
    } catch (error) {
        console.error(
        `GetLocation(${req.id}) >> Error: ${error.stack}`
        );
        return res.sendStatus(500);
    }
})

module.exports = router;
