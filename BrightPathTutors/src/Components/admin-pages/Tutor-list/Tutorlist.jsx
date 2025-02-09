import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../navbar/Navbar'
import './Tutorlist.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../contextprovider/ThemeContext'

const Tutorlist = () => {

  //get users 
  const { isDarkMode } = useTheme();
  const [tutors, setTutors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const fetchTutors = async () => {
    try {
      const response = await fetch('http://localhost:5000/admin/tutors', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch tutors');
      }
      console.log(response)
      const data = await response.json();
      setTutors(data);
    } catch (error) {
      console.log("Error fetching tutors:", error);
    }
  };
  //delete the user by delete button
  const deleteTutor = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/admin/tutors/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log(response)
        fetchTutors();
      }
      else {
        console.log(id)
        console.error("Failed to delete tutor");
      }

    } catch (error) {
      console.log(error);
    }
  };

  const deleteAll = async () => {

    try {
      const response = await fetch('http://localhost:5000/admin/tutors/deleteall', {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.ok) {
        fetchTutors();
      } else {
        console.error('Failed to delete all tutors');
      }

    } catch (error) {
      console.log(error);
    }
  };

  const fetchSearchedTutors = async (searchTerm) => {
    try {
      if (searchTerm.trim() === '') {
        fetchTutors();

      }
      else {
        const response = await fetch(`http://localhost:5000/admin/tutors/search/${searchTerm}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch searched users');
        }
        const data = await response.json();
        setTutors(data && Array.isArray(data) ? data : []);

      }

    }

    catch (error) {
      console.log('Error fetching searched users:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);

    fetchSearchedTutors(event.target.value);
  };

  useEffect(() => {
    fetchTutors();
  }, []);

  return (
    <div className={`list ${isDarkMode ? 'dark' : 'light'}`}>
      <Sidebar />
      <div className="listContainer">
        <Navbar />

        <div className="searchContainer">
          <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />
        </div>
        <button className="TL-addButton" onClick={deleteAll}>Delete All</button>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>email</th>
              <th>subject</th>
              <th>update</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {tutors.map(tutor => (
              <tr key={tutor._id}>
                <td>{tutor.name}</td>
                <td>{tutor.email}</td>
                <td>{tutor.subject.join(', ')}</td>

                <td><Link to={`/admin/tutors/${tutor._id}`} className="link">edit</Link></td>
                <td><button className="TL-addButton" onClick={() => deleteTutor(tutor._id)}>delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="addButtonContainer">
          <button className="TL-addButton"><Link to={"/admin/tutors/new"}>add</Link></button>

        </div>

      </div>
    </div>
  )
}

export default Tutorlist


