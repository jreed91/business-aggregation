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

router.get('/:id', async (req, res) => {
    if (!req.params.id) {
        return res.sendStatus(404);
    }

    try {
        const business = await Business.find(req.params.id);
        if (!business) {
            return res.sendStatus(404);
        }
        res.json(business);
    } catch (error) {
        console.error(
        `GetBusiness(${req.id}) >> Error: ${error.stack}`
        );
        return res.sendStatus(500);
    }
})

module.exports = router;
