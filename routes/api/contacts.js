const express = require('express')


const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

const router = express.Router();



// router.get('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

router.get("/", ctrl.listContacts);

// router.get('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })


router.get("/:id", ctrl.getContactById);
// router.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);
// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })
router.delete("/:id", ctrl.removeContact);
// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })
router.put("/:id", validateBody(schemas.addSchema), ctrl.updateContact);
module.exports = router
