import { render, screen } from '@testing-library/react';
import Button from './Button';

test('버튼이 텍스트를 잘 표시하는지 확인', () => {
  render(<Button text="테스트" />);
  expect(screen.getByText('테스트')).toBeInTheDocument();
});
