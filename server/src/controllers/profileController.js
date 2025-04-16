const db = require('../config/db');


const getProfile = async (req, res) => {
  const user_id = req.user_id;

  try {
    // Correct the query to use `user_id`
    const result = await db.query("SELECT * FROM users WHERE user_id = $1", [user_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];

    // Returning a clean response
    res.json({
      user_id: user.user_id,
      username: user.username,
      firstName: user.firstname,
      lastName: user.lastname,
      email: user.email,
      birthday: user.birthday,
      isAdmin: user.isadmin, 
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// Update Profile
const updateProfile = async (req, res) => {
    const userId = req.userId;
    const targetUserId = req.params.id || userId;

    if (userId !== targetUserId && !req.isAdmin) {
        return res.status(403).json({ message: 'Forbidden. You can only update your own profile.' });
    }

    const { firstName, lastName, email, birthday } = req.body;

    try {
        const result = await db.query(
            'UPDATE users SET firstName = $1, lastName = $2, email = $3, birthday = $4 WHERE user_id = $5 RETURNING *',
            [firstName, lastName, email, birthday, targetUserId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Profile updated successfully', user: result.rows[0] });
    } catch (err) {
        console.error("Update error:", err);
        res.status(500).json({ message: 'Database error' });
    }
};


// Delete Profile
const deleteProfile = async (req, res) => {
    const userId = req.userId;
    const targetUserId = req.params.id || userId;

    if (userId !== targetUserId && !req.isAdmin) {
        return res.status(403).json({ message: 'Forbidden. You can only delete your own profile.' });
    }

    try {
        const result = await db.query('DELETE FROM users WHERE user_id = $1', [targetUserId]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Profile deleted successfully' });
    } catch (err) {
        console.error("Delete error:", err);
        res.status(500).json({ message: 'Database error' });
    }
};


module.exports = { getProfile, updateProfile, deleteProfile };
