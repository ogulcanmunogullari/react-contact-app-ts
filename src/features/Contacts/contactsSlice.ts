import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"

export type contactType = {
  id: number
  name: string
  phone: number
}
export const contactsAdaptor = createEntityAdapter<contactType>()

export const contactsSelectors = contactsAdaptor.getSelectors(
  (state: any) => state.contacts,
)

export const contactsSlice = createSlice({
  name: "contacts",
  initialState: contactsAdaptor.getInitialState(),
  reducers: {
    addContact: contactsAdaptor.addOne,
    removeContact: contactsAdaptor.removeOne,
    removeAllContacts: contactsAdaptor.removeAll,
    updateContact: contactsAdaptor.updateOne,
  },
})

export const { addContact, removeContact, removeAllContacts, updateContact } =
  contactsSlice.actions

export default contactsSlice.reducer
