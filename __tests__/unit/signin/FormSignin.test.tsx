import { render, screen, fireEvent, act } from '@testing-library/react';
//Internal app
import FormSignin from '@/app/[tenant]/(auth)/signin/UI/FormSignin';

describe('FormSignin', () => {
  it('renders email and password fields', async () => {
    await act(async () => {
      render(<FormSignin />);
    });
    expect(screen.getByLabelText('common.email')).toBeInTheDocument();
    expect(screen.getByLabelText('common.password')).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<FormSignin />);
    expect(screen.getByRole('button', { name: 'signin.signIn' })).toBeInTheDocument();
  });

  it('calls onSubmit when form is submitted', () => {
    render(<FormSignin />);
    const button = screen.getByRole('button', { name: 'signin.signIn' });
    fireEvent.click(button);
    // Puedes agregar más aserciones si mockeas useRouter o verificas navegación
  });
});
