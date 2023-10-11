import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';

describe('Login Tests', () => {

  test('Main Flow: user can login with correct credentials', async () => {
    render(<App />);
    
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByText('Log In'));

    // Check that "Log Out" button is shown after logging in
    expect(screen.getByText('Log Out')).toBeInTheDocument();
  });

  test('Alternate Flow: user cannot login with incorrect credentials', async () => {
    render(<App />);
    
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'wrongpassword' },
    });
    fireEvent.click(screen.getByText('Log In'));

    // Check that error message is shown
    expect(screen.getByText('Not authorized')).toBeInTheDocument();
    // Check that "Log Out" button is not shown
    expect(screen.queryByText('Log Out')).not.toBeInTheDocument();
  });

  test('Main Flow: user can logout after logging in', async () => {
    render(<App />);
    
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByText('Log In'));

    // Check that "Log Out" button is shown
    const logoutButton = screen.getByText('Log Out');
    expect(logoutButton).toBeInTheDocument();

    // Log out
    fireEvent.click(logoutButton);
    
    // Check that "Log Out" button is not shown anymore
    expect(screen.queryByText('Log Out')).not.toBeInTheDocument();
    // Check that login dialog is shown again
    expect(screen.getByText('Log In')).toBeInTheDocument();
  });
});
