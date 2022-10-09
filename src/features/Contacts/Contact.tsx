import { useDispatch } from "react-redux"
import { removeContact } from "./contactsSlice"
import { Link } from "react-router-dom"
type Props = {
  contact: {
    id: number
    name: string
    phone: number
  }
}

function Contact({ contact }: Props) {
  const dispatch = useDispatch()

  const removeHandle = (id: number) => {
    if (window.confirm("Are you sure?")) {
      dispatch(removeContact(id))
    }
  }

  const { name, phone, id } = contact
  return (
    <li className=" odd:bg-gray-100 py-2 px-1 flex justify-between">
      <span>
        {name} - {phone}
      </span>
      <div className="flex gap-3">
        <Link to={`/edit/${id}`}>
          <p className="text-blue-600">Edit</p>
        </Link>
        <button
          onClick={() => removeHandle(id)}
          className="bg-red-600 px-5 rounded-md active:shadow-inner active:shadow-neutral-900 shadow-neutral-900 shadow-sm"
          type="button">
          x
        </button>
      </div>
    </li>
  )
}

export default Contact
