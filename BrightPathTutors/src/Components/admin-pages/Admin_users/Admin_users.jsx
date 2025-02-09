import React from 'react'
import './Admin-users.css'
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../navbar/Navbar'
//import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '../contextprovider/ThemeContext'


import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'


const Admin_users = () => {

  //get users 
  const { isDarkMode } = useTheme();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');



  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/admin/users', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      console.log(response)
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log("Error fetching users:", error);

    }
  };



  //delete the user by delete button
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/admin/users/delete/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchUsers();
      }
      else {
        console.log(id)
        console.error("Failed to delete user");
      }



    } catch (error) {
      console.log(error);
    }

  };


  const deleteAll = async () => {

    try {
      const response = await fetch('http://localhost:5000/admin/users/deleteall', {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.ok) {
        fetchUsers();
      } else {
        console.error('Failed to delete all users');
      }

    } catch (error) {
      console.log(error);
    }
  };


  const fetchSearchedUsers = async (searchTerm) => {
    try {

      if (searchTerm.trim() === '') {
        // If search term is empty, fetch all users
        fetchUsers();
      }
      else {
        console.log("here")
        const response = await fetch(`http://localhost:5000/admin/users/search/${searchTerm}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });


        if (!response.ok) {
          throw new Error('Failed to fetch searched users');
        }
        const data = await response.json();

        //setUsers(data); // Update users state with search results
        setUsers(data && Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.log('Error fetching searched users:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    fetchSearchedUsers(event.target.value)
  };

  /**const handleSearchClick = () => {
    console.log("here")
    console.log(searchTerm)
    fetchSearchedUsers(searchTerm);
  };*/



  useEffect(() => {
    fetchUsers();
  }, []);




  ///





  return (
    <div className={`AD-list ${isDarkMode ? 'dark' : 'light'}`}>
      <Sidebar />
      <div className="AD-listContainer">
        <Navbar />

        <div className="AD-searchContainer">
          <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />



        </div>

        <button className='AD-addButton' onClick={deleteAll}>Delete All</button>
        <table className='AD-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>email</th>

              <th>update</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td  ><Link to={`/admin/users/profile/${user._id}`} className="AD-link">{user.name}</Link></td>
                <td>{user.email}</td>
                <td><Link to={`/admin/users/${user._id}`} className='AD-link'>edit</Link></td>
                <td><button className='AD-addButton'  onClick={() => deleteUser(user._id)} >delete</button></td>

              </tr>

            ))}

          </tbody>
        </table>
        <div className="AD-addButtonContainer">
          <button className="AD-addButton"><Link to={"/admin/users/new"}>add</Link></button>

        </div>

      </div>
    </div>


  )
}

export default Admin_users

//const newData = users.filter(user => user._id !== id);
//setUsers(newData);