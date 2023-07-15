const fs = require('fs').promises;
const path = require("path")
const { nanoid } = require('nanoid')
const contactsPath = path.join(__dirname, "contacts.json")

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8')
  return JSON.parse(data)
}

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const requestedContact = contacts.find(item => item.id === contactId)
  return requestedContact || null
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const contactIndex = contacts.findIndex(item => item.id === contactId)
  if (contactIndex === -1) {
    return null
  }
  const [contact] = contacts.splice(contactIndex, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return contact
}

const addContact = async (body) => {
  const contacts = await listContacts()
  const newContact = {
    id: nanoid(),
    ...body,
  }
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return newContact
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(item => item.id === contactId)
  if (idx === -1) {
    return null
  }
  contacts[idx] = { contactId, ...body }
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return contacts[idx]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
