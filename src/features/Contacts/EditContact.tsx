import React, { useEffect, useRef, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { contactsSelectors, updateContact } from "./contactsSlice"

function EditContact() {
  const { id } = useParams()
  const contact = useSelector((state) =>
    contactsSelectors.selectById(state, Number(id)),
  )
  const [name, setName] = useState<string>("")
  const [phone, setPhone] = useState<number>(0)
  const nameRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const dispatch = useDispatch()

  useEffect(() => {
    nameRef.current?.focus()
    if (contact) {
      setName(contact.name)
      setPhone(contact.phone)
    } else {
      navigate("/")
    }
  }, [contact, navigate])

  const formHandle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (name && phone) {
      dispatch(
        updateContact({
          id: Number(id),
          changes: {
            name,
            phone,
          },
        }),
      )
      navigate("/")
    } else {
      alert("Please fill all fields")
    }
  }

  return (
    <form
      className="sm:w-[500px] mx-auto "
      onSubmit={(event) => formHandle(event)}>
      <fieldset
        id="formSection"
        className="grid grid-cols-2 gap-2 relative border-2 border-black py-4 px-2 mt-10 ">
        <legend className="absolute -top-[14px] left-3 px-2 bg-white flex items-center">
          Edit Contact ({contact?.name})
        </legend>
        <div id="nameSection" className="">
          <label htmlFor="nameInput">Name: </label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="focus:border-black border rounded-md w-full"
            id="nameInput"
            type="text"
            ref={nameRef}
          />
        </div>
        <div id="phoneSection" className="">
          <label htmlFor="phoneInput">Phone: </label>
          <input
            value={phone}
            onChange={(event) => setPhone(Number(event.target.value))}
            className="focus:border-black border rounded-md w-full"
            id="phoneInput"
            type="text"
          />
        </div>
        <div className="flex flex-col my-2 col-span-2">
          <div className="flex gap-2">
            <button
              className="w-full border p-2 shadow-sm active:shadow-inner active:shadow-neutral-900 shadow-neutral-900"
              type="submit">
              {" "}
              Update{" "}
            </button>
          </div>
        </div>
      </fieldset>
    </form>
  )
}

export default EditContact
