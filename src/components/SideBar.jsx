import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function SideBar() {
  // useEffect ve useState yerine useQuery kullanıyoruz
  const { data: contacts = [], isLoading } = useQuery({
    queryKey: ['contacts'], // Bu key sayesinde veriyi diğer componentlerden güncelleyebileceğiz
    queryFn: async () => {
      const res = await axios.get("https://688247fb66a7eb81224e18ff.mockapi.io/fihrist/api/contact");
      return res.data;
    }
  });

  return (
    <div id="sidebar" className="w-84 bg-stone-100 border-r border-stone-200 flex flex-col">
      <h1 className="text-xl font-medium m-0 pt-4 px-8">C2W Contacts</h1>
      <div className="px-8 flex items-center gap-2 py-4 border-b border-stone-300">
        <Link to="/contacts/new">
          <button type="submit">New</button>
        </Link>
        <Link to="/">
          <button type="submit">Home</button>
        </Link>
      </div>
      <nav className="px-8 flex-1 overflow-auto pt-4">
        {isLoading ? (
          <p><i>Yükleniyor...</i></p>
        ) : contacts.length ? (
          <ul className="contactList p-0 m-0 list-none">
            {contacts.map((contact) => (
              <li key={contact.id} className="my-1 mx-0">
                <NavLink
                  to={`/contacts/${contact.id}`}
                  data-testid="contact"
                  className={({ isActive, isPending }) =>
                    isActive ? "active" : isPending ? "pending" : ""
                  }
                >
                  {contact.first_name || contact.last_name ? (
                    <>
                      <span>{contact.first_name}</span>
                      <span className="ml-1">{contact.last_name}</span>
                    </>
                  ) : (
                    <i className="text-stone-500">No Name</i>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            <i>No contacts</i>
          </p>
        )}
      </nav>
    </div>
  );
}