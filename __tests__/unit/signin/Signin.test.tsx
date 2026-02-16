import { render } from '@testing-library/react';
//Internal app
import SigninPage from '@/app/[tenant]/signin/page';

// Mock the UI components directly
jest.mock('@/app/[tenant]/signin/UI', () => ({
  DescriptionBanner: () => <div data-testid="description-banner">DescriptionBanner</div>,
  Signin: () => <div data-testid="signin">Signin</div>,
}));

jest.mock('@mui/material', () => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Grid2: ({ children, sx, container, className, ...props }: any) => (
    <div data-testid="grid2" className={className} style={sx} {...props}>
      {children}
    </div>
  ),
  Box: ({ children, sx, ...props }: any) => (
    <div data-testid="box" style={sx} {...props}>
      {children}
    </div>
  ),
}));

describe('Signin Page', () => {
  it('renders DescriptionBanner when Signin', () => {
    const { getByTestId, getByText } = render(<SigninPage />);
    expect(getByTestId('description-banner')).toBeInTheDocument();
    expect(getByText('DescriptionBanner')).toBeInTheDocument();
  });

  it('renders Signin component', () => {
    const { getByTestId, getByText } = render(<SigninPage />);
    expect(getByTestId('signin')).toBeInTheDocument();
    expect(getByText('Signin')).toBeInTheDocument();
  });
});
