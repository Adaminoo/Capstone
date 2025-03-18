const db = require('../config/db');

const getProfile = (req, res) => {
    const user_id = req.user_id;
    db.query('SELECT * FROM users WHERE id = ?', [user_id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(results[0]); // Send the user's profile data
    });
};

// Update Profile
const updateProfile = (req, res) => {
    const user_id = req.user_id;
    const targetUser_id = req.params.id || user_id;

    // If the user is trying to update their own profile or if the user is an admin updating someone's profile
    if (user_id !== targetUser_id && !req.isAdmin) {
        return res.status(403).json({ message: 'Forbidden. You can only update your own profile.' });
    }

    const { firstName, lastName, email, birthday } = req.body;

    db.query(
        'UPDATE users SET firstName = ?, lastName = ?, email = ?, birthday = ? WHERE id = ?',
        [firstName, lastName, email, birthday, targetUser_id],
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
    const user_id = req.user_id;
    const targetUser_id = req.params.id || user_id; // Admin can target ANYTONEEEE

    // If the user is trying to delete their own profile or if the user is an admin deleting someone's profile
    if (user_id !== targetUser_id && !req.isAdmin) {
        return res.status(403).json({ message: 'Forbidden. You can only delete your own profile.' });
    }

    db.query('DELETE FROM users WHERE id = ?', [targetUser_id], (err, results) => {
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
