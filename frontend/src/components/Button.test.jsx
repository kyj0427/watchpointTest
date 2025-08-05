import { render } from '@testing-library/react';
import Button from './Button';

test('버튼이 잘 렌더링되는지 확인', () => {
  render(<Button text="클릭" />);
});