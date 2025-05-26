import styled from 'styled-components';

export const HeaderContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const TitleContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SubtitleWrapper = styled.div`
  margin-top: 0.25rem;
`;

export const ContextualContent = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
`; 