import { FormEvent, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  addContact,
  contactsSelectors,
  removeAllContacts,
} from "./contactsSlice"
import List from "./List"

function Form() {
  const nameRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const total = useSelector(contactsSelectors.selectTotal)

  const dispatch = useDispatch()

  useEffect(() => {
    nameRef.current?.focus()
  }, [])

  const formHandle = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (
      nameRef.current?.value &&
      (Number(phoneRef.current?.value) ||
        Number(phoneRef.current?.value) > 1000000000)
    ) {
      dispatch(
        addContact({
          id: Date.now(),
          name: nameRef.current?.value as string,
          phone: Number(phoneRef.current?.value) as number,
        }),
      )
      event.currentTarget.reset()
      nameRef.current?.focus()
    } else {
      alert("Please fill all fields")
    }
  }
  const removeAllHandle = () => {
    if (window.confirm("Removing All Contacts...")) {
      dispatch(removeAllContacts())
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
          Add Contact ({total})
        </legend>
        <div id="nameSection" className="">
          <label htmlFor="nameInput">Name: </label>
          <input
            className="focus:border-black border rounded-md w-full"
            id="nameInput"
            type="text"
            ref={nameRef}
          />
        </div>
        <div id="phoneSection" className="">
          <label htmlFor="phoneInput">Phone: </label>
          <input
            className="focus:border-black border rounded-md w-full "
            id="phoneInput"
            type="number"
            ref={phoneRef}
          />
        </div>
        <div className="flex flex-col my-2 col-span-2">
          <div className="flex gap-2">
            <button
              className="w-full border p-2 shadow-sm active:shadow-inner active:shadow-neutral-900 shadow-neutral-900"
              type="submit">
              {" "}
              Submit{" "}
            </button>

            {total > 1 && (
              <button
                type="reset"
                onClick={() => removeAllHandle()}
                className="w-full border p-2 shadow-sm active:shadow-inner active:shadow-neutral-900 shadow-neutral-900">
                Remove All
              </button>
            )}
          </div>
          <List />
        </div>
      </fieldset>
    </form>
  )
}

export default Form
