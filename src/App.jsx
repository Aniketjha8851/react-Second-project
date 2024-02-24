import Navbar from "./components/navbar";
import { FiSearch } from "react-icons/fi";
import {AiFillPlusCircle} from "react-icons/ai"
import { useEffect , useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import {db} from "./config/firebase";
import { ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import ContactCard from "./components/ContactCard";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclouse from "./hooks/useDisclouse";
import NotFoundContact from "./components/NotFoundContact";
const App = () => {
  const [contacts , setContacts] = useState([]);
  const {isOpen,onClose,onOpen} = useDisclouse();
  
  
useEffect(() =>{
  const getContacts = async() =>{
    try {
      const contactsRef = collection(db,"contacts");
      onSnapshot(contactsRef,(snapshot) =>{

        const contactLists = snapshot.docs.map((doc) => {
        return{
          id: doc.id,
          ...doc.data(),
        };
        });
        setContacts(contactLists);
        return contactLists;
    
      });
    } catch (error) {
      console.log(error);
    }
  };
  getContacts();
  
},[]) 
  const filterContacts = (e) =>{
  const value = e.target.value;
  const contactsRef = collection(db,"contacts");
  onSnapshot(contactsRef,(snapshot) =>{

    const contactLists = snapshot.docs.map((doc) => {
    return{
      id: doc.id,
      ...doc.data(),
    };
    });
    const filteredContacts = contactLists.filter((contact) =>
    contact.name.tolowerCase().includes(value.tolowerCase())
    );

    setContacts(filteredContacts);
    return filterContacts;
  });
  };
      return (
        <>
  <div className="max-w-[370px] mx-auto">
      <Navbar/>

      <div className="flex gap-2">
      <div className="flex relative items-center flex-grow ">
      <FiSearch className="absolute ml-1 text-3xl text-white"/>
      <input
      onChange={filterContacts}
      type="text" 
      className="h-10 border border-white flex-grow rounded-md bg-transparent pl-9 text-white"
      />

    </div>
    <AiFillPlusCircle
    onClick={onOpen} 
    className="text-5xl cursor-pointer text-white"/>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {contacts.length <= 0 ? (
          <NotFoundContact/>
        ) :(
        contacts.map((contact) =>(
          <ContactCard key={contact.id} contact={contact}/>
          ))
          
          )}
      </div>
      </div> 
     <AddAndUpdateContact
     onClose={onClose}
     isOpen={isOpen}
     />
     <ToastContainer
     position="bottom-center"/>
      </>
  );
};

export default App;