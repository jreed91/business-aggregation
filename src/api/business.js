const {Router} = require('express');
const Business = require('../persistence/businesses');

const router = new Router();

router.post('/', async (req, res) => {
  try {
    const {name} = req.body;
    if (!name) {
      return res
        .status(400)
        .json({message: 'name must be provided'});
    }

    const business = await Business.create(name);
    if (!business) {
      return res.status(400).json({message: 'Business already exists'});
    }

    return res.status(200).json(business);
  } catch (error) {
    console.error(
      `createBuiness({ business: ${req.body.name} }) >> Error: ${error.stack}`
    );
    res.status(500).json();
  }
});

module.exports = router;
