import React from 'react'
import { contactsSelectors } from './contactsSlice'
import { useSelector } from 'react-redux'
import Contact from './Contact'

function List() {
    const contacts = useSelector(contactsSelectors.selectAll)
    return (
        <div className={`${contacts.length >= 1 && "mt-5"}`}>
            <ul>
                {contacts.map((contact) => (
                    <Contact key={contact.id} contact={contact} />
                ))}
            </ul>
        </div>
    )
}

export default List