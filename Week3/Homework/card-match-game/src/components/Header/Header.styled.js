import styled from '@emotion/styled';

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width: 80%;
  min-width: 1110px;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background-color: ${({ theme }) => theme.colors.header};
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fonts.lg};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const Button = styled.button`
  background-color: ${({ selected, theme }) => selected ? theme.colors.buttonActive : theme.colors.buttonInactive};
`;