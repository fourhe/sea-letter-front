import styled from 'styled-components';

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
`;

export const Title = styled.div`
  font-size: 22px;
  font-weight: ${({theme}) => theme.typography.fontWeights.medium};
  white-space: pre-line;
  line-height: 30px;
`;

export const SubTitle = styled.div`
  font-size: ${({theme}) => theme.typography.fontSizes.sm}px;
  color: ${({theme}) => theme.color.neutral[500]};
`;

export const EmailForm = styled.form`
  height: 75vh;
`;

export const EmailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ErrorMessageBox = styled.li`
  display: flex;
  align-items: flex-start;
  font-size: ${({theme}) => theme.typography.fontSizes.xs}px;
`;

export const BulletPoint = styled.div<{$isError: boolean}>`
  color: ${({theme, $isError}) =>
    $isError ? theme.color.neutral[500] : theme.color.primary.pointPink};
  margin: 0 0.3em;
`;

export const ErrorMessage = styled.div<{$isError: boolean}>`
  white-space: pre-line;
  color: ${({theme, $isError}) =>
    $isError ? theme.color.neutral[500] : theme.color.primary.pointPink};
  line-height: ${({theme}) => theme.typography.lineHeights.xs}px;
`;

export const EmailInput = styled.input`
  display: flex;
  padding: ${({theme}) => theme.size[4]}px ${({theme}) => theme.size[3]}px;
  border: none;
  border-radius: 4px;
  font-size: ${({theme}) => theme.typography.fontSizes.lg}px;
  font-weight: ${({theme}) => theme.typography.fontWeights.normal};
  background-color: ${({theme}) => theme.color.neutral[100]};

  &::placeholder {
    color: ${({theme}) => theme.color.neutral[400]};
    font-size: ${({theme}) => theme.typography.fontSizes.sm}px;
    line-height: ${({theme}) => theme.typography.lineHeights.sm}px;
  }
`;
