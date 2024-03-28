import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    favoriteSeason: 'Spring',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validations
    const firstNameRegex = /^[A-Za-z]+$/;
    const lastNameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    let errors = {};

    if (!firstNameRegex.test(formData.firstName)) {
      errors.firstName = 'First Name must contain only alphabets.';
    }

    if (!lastNameRegex.test(formData.lastName)) {
      errors.lastName = 'Last Name must contain only alphabets.';
    }

    if (!emailRegex.test(formData.email)) {
      errors.email = 'Invalid email format.';
    }

    if (!passwordRegex.test(formData.password)) {
      errors.password =
        'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number and one special character.';
    }

    if (Object.keys(errors).length === 0) {
      // All fields are valid, render profile page
      setSubmitted(true);
    } else {
      // Handle errors, you can display them to the user or perform any other action
      console.log('Form has errors:', errors);
    }
  };

  const renderProfilePage = () => {
    return (
      <div style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
        <h2 style={{ color: '#333' }}>Profile</h2>
        <p><strong>First Name:</strong> {formData.firstName}</p>
        <p><strong>Last Name:</strong> {formData.lastName}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Favorite Season:</strong> {formData.favoriteSeason}</p>
      </div>
    );
  };


  return (
    <div className="App" style={{ fontFamily: 'Arial, sans-serif' }}>
      {!submitted ? (
        <>
          <h1 style={{ textAlign: 'center', color: '#444' }}>Form</h1>
          <form onSubmit={handleSubmit} style={{ margin: '0 auto', maxWidth: '300px' }}>
            <div>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                pattern="[A-Za-z]+"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                pattern="[A-Za-z]+"
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                title="Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number and one special character."
                required
              />
            </div>
            <div>
              <label htmlFor="favoriteSeason">Favorite Season:</label>
              <select
                id="favoriteSeason"
                name="favoriteSeason"
                value={formData.favoriteSeason}
                onChange={handleChange}
                required
              >
                <option value="Spring">Spring</option>
                <option value="Fall">Fall</option>
                <option value="Winter">Winter</option>
              </select>
            </div>
            <button type="submit">Submit</button>
          </form>
        </>
      ) : (
        renderProfilePage()
      )}
    </div>
  );
}

export default App;
