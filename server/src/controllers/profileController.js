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
const updateProfile = (req, res) => {
    const userId = req.userId;
    const targetUserId = req.params.id || userId;

    if (userId !== targetUserId && !req.isAdmin) {
        return res.status(403).json({ message: 'Forbidden. You can only update your own profile.' });
    }

    const { firstName, lastName, email, birthday } = req.body;

    db.query(
        'UPDATE users SET firstName = ?, lastName = ?, email = ?, birthday = ? WHERE id = ?',
        [firstName, lastName, email, birthday, targetUserId],
        (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Database error' });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'Profile updated successfully' });
        }
    );
};

// Delete Profile
const deleteProfile = (req, res) => {
    const userId = req.userId;
    const targetUserId = req.params.id || userId; // Admin can target ANYTONEEEE

    // If the user is trying to delete their own profile or if the user is an admin deleting someone's profile
    if (userId !== targetUserId && !req.isAdmin) {
        return res.status(403).json({ message: 'Forbidden. You can only delete your own profile.' });
    }

    db.query('DELETE FROM users WHERE id = ?', [targetUserId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'Profile deleted successfully' });
    });
};

module.exports = { getProfile, updateProfile, deleteProfile };
