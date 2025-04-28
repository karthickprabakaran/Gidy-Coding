import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login'; // Adjust the path as needed
import { BrowserRouter as Router } from 'react-router-dom'; // Wrap in Router if you're using React Router

describe('Login Component', () => {
  test('renders login form', () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    
    // Check if the email and password input fields are rendered
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    
    // Check if the submit button is rendered
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('can type in email and password fields', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    // Check if the email and password fields are present
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);

    // Simulate typing into the email and password fields
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Assert that the input values are updated correctly
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('submitting form calls onSubmit function', () => {
    const handleSubmit = jest.fn(); // Mock the submit handler

    render(
      <Router>
        <Login />
      </Router>
    );

    // Fire a submit event on the form
    fireEvent.submit(screen.getByRole('form'));

    // Ensure the submit handler was called
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});