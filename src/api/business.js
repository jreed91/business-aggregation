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

router.put('/:id', async (req, res) => {
  try {
    const {name} = req.body;
    if (!name || !req.params.id) {
      return res
        .status(400)
        .json({message: 'name and id must be provided'});
    }
    
    const business = await Business.update(req.params.id, name);

    return res.status(200).json(business);
  } catch (error) {
    console.error(
      `updateBusiness({ business: ${req.body.name} }) >> Error: ${error.stack}`
    );
    res.status(500).json();
  }
});

router.get('/:id', async (req, res) => {
    if (!req.params.id) {
        return res.sendStatus(400);
    }

    try {
        const business = await Business.find(req.params.id);
        if (!business) {
            return res.sendStatus(200);
        }
        res.json(business);
    } catch (error) {
        console.error(
        `GetBusiness(${req.id}) >> Error: ${error.stack}`
        );
        return res.sendStatus(500);
    }
});

router.get('/', async (req, res) => {
  try {
      const business = await Business.findAll();
      if (!business) {
          return res.sendStatus(200);
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
