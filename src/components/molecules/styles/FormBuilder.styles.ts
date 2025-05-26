import styled from 'styled-components';

export const FormContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  width: 100%;
`;

export const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  
  & > * {
    flex: 1;
    min-width: 200px;
  }
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
  gap: 1rem;
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

export const SuccessMessage = styled.div`
  color: ${({ theme }) => theme.colors.success};
  background-color: ${({ theme }) => `${theme.colors.success}10`};
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: 1.5rem;
  font-weight: 500;
`; 