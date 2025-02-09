const express = require("express");
const router = new express.Router();
const userdb = require('../models/usermodel');
const tutordb = require("../models/tutormodel");


router.get("/admin/users", async (req, res) => {
  try {
    const users = await userdb.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get("/admin/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await userdb.findOne({ _id: id }, { password: 0 });
    // await userdb.findByIdAndDelete(id);
    return res.status(200).json(data);

  } catch (error) {
    res.json({ error: 'Internal server error' })

  }

})//for edit/getting data firstly of specefied id

router.patch("/admin/users/update/:id", async (req, res) => {

  try {
    const id = req.params.id;
    const updateUserdata = req.body;//all users chnged datat
    const updateUser = await userdb.updateOne({ _id: id }, { $set: updateUserdata });
    return res.status(200).json(updateUser);


  } catch (error) {
    res.json({ error: 'Internal server error' })

  }
})

router.delete("/admin/users/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await userdb.deleteOne({ _id: id });
    // await userdb.findByIdAndDelete(id);
    return res.status(200).json({ message: "user deleted successfully" })

  } catch (error) {
    res.json({ error: 'Internal server error' })

  }

})

router.post("/admin/users/new", async (req, res) => {
  const { name, email, password, } = req.body;
  if (!name || !email || !password ) {
    res.status(422).json({ error: "fill all the details" })
  }
  try {
    //already existing email
    const preuser = await userdb.findOne({ email: email });
    if (preuser) {
      res.status(422).json({ error: "this email already exist" });

    } 
    else {
      const finalUser = new userdb({
        name, email, password,
      });
      //password hashing
      const storeData = await finalUser.save();
      // console.log(storeData);
      res.status(201).json({ status: 201, storeData });
    }
  } catch (error) {
    res.status(422).json(error);
    console.log("catch block error");
  }
})


router.delete("/admin/users/deleteall", async (req, res) => {

  try {
    console.log("deleting")
    await userdb.deleteMany({});
    return res.status(200).json({ message: "All users deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });

  }
})

router.get("/admin/users/search/:searchTerm", async (req, res) => {
  try {
    const searchTerm = req.params.searchTerm;
    // console.log(searchTerm)
    const users = await userdb.find({ name: { $regex: searchTerm, $options: 'i' } }); // Case-insensitive search by name
    res.status(200).json(users);
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

router.get("/admin/user/count", async (req, res) => {
  console.log("Fetch Succesful")
  try {
    const count = await userdb.countDocuments({});
    console.log("here", count)
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error fetching user count:', error);
    res.status(500).json({ error: error.message });
  }
})
//tutor
router.get("/admin/tutors", async (req, res) => {
  try {
    const tutors = await tutordb.find();
    res.json(tutors);
  } catch (error) {
    console.error('Error fetching tutorss:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})



router.delete("/admin/tutors/delete/:id", async (req, res) => {
  try {
    console.log("in delelte func")
    const id = req.params.id;
    await tutordb.deleteOne({ _id: id });
    // await userdb.findByIdAndDelete(id);
    return res.status(200).json({ message: "tutor deleted successfully" })

  } catch (error) {
    res.json({ error: 'Internal server error' })

  }

})

router.get("/admin/tutors/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await tutordb.findOne({ _id: id }, { password: 0 });
    // await userdb.findByIdAndDelete(id);
    return res.status(200).json(data);

  } catch (error) {
    res.json({ error: 'Internal server error' })

  }

})//for edit/getting data firstly of specefied id

router.patch("/admin/tutors/update/:id", async (req, res) => {

  try {
    const id = req.params.id;
    const updateTutordata = req.body;//all users chnged datat
    const updateTutor = await tutordb.updateOne({ _id: id }, { $set: updateTutordata });
    return res.status(200).json(updateTutor);


  } catch (error) {
    res.json({ error: 'Internal server error' })

  }
})

router.post("/admin/tutors/new", async (req, res) => {
  const { name, email, subject, password, } = req.body;

  if (!name || !email || !subject || !password ) {
    res.status(422).json({ error: "fill all the details" })
  }

  try {
    //already existing email
    const preuser = await tutordb.findOne({ email: email, name: name });
    if (preuser) {
      res.status(422).json({ error: "this email already exist" });

    } else {
      const finalTutor = new tutordb({
        name, email, subject, password, 
      });

      //password hashing
      const storeData = await finalTutor.save();
      // console.log(storeData);
      res.status(201).json({ status: 201, storeData });
    }
  } catch (error) {
    res.status(422).json(error);
    console.log("catch block error");
  }
})

router.delete('/admin/tutors/deleteall', async (req, res) => {

  try {
    console.log("deleting")
    await tutordb.deleteMany({});
    return res.status(200).json({ message: "All tutors deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });

  }
})

router.get("/admin/tutors/search/:searchTerm", async (req, res) => {
  try {
    const searchTerm = req.params.searchTerm;
    //console.log(searchTerm)
    const users = await tutordb.find({ name: { $regex: searchTerm, $options: 'i' } }); // Case-insensitive search by name
    res.status(200).json(users);
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

router.get("/admin/tutor/count", async (req, res) => {
  try {
    const count = await tutordb.countDocuments({});
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error fetching tutor count:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/admin/users/profile/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    // Fetch user details and populate the tutorID field
    const user = await userdb.findById(userId).populate('tutorID');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching student profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//filetrr
router.get('/admin/filter', async (req, res) => {
  try {
    // Extract query parameters
    const { location, pincode, city, state, subject, gender, offlineClasses, onlineClasses, board, Class, atMyHome, atTheirHome } = req.query;
    // Construct filter object based on query parameters
    const filter = {};

    // Check if any query parameters exist, if not, return all tutors
    if (!Object.keys(req.query).length) {
      const allTutors = await tutordb.find({});
      return res.json(allTutors.map(tutor => ({ name: tutor.name, id:tutor._id }))); 
    }

    if (location) filter.location = { $regex: location, $options: 'i' };
    if (pincode) filter.pincode = parseInt(pincode);
    if (city) filter.city = { $regex: city, $options: 'i' };
    if (state) filter.state = { $regex: state, $options: 'i' };
    if (subject) filter.subject = { $regex: subject, $options: 'i' };
    if (gender) filter.gender = { $regex: gender, $options: 'i' };

    if (offlineClasses) filter.offlineClasses = offlineClasses === 'true'; // Convert string to boolean if needed
    if (onlineClasses) filter.onlineClasses = onlineClasses === 'true'; // Convert string to boolean if needed
    if (atMyHome) filter.atMyHome = atMyHome === 'true'; // Convert string to boolean if needed
    if (atTheirHome) filter.atTheirHome = atTheirHome === 'true'; // Convert string to boolean if needed

    if (board) filter.board = { $regex: board, $options: 'i' };
    if (Class) filter.Class = { $regex: Class, $options: 'i' };

    // Construct filter object based on query parameters for matching subject and location
    const subjectLocationFilter = {
      location: { $regex: location, $options: 'i' },
      subject: { $regex: subject, $options: 'i' }
    };

    // Query tutors collection with the constructed filter
    const tutors = await tutordb.find({
      $or: [
        filter,
        subjectLocationFilter
      ]
    });

    // Extract the emails of matching tutors
    const tutorData = tutors.map(tutor => ({ name: tutor.name, _id: tutor._id }));    
    res.json(tutorData);

  } catch (error) {
    console.error('Error filtering tutors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;
//add all users,tutors ,courses heres