import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;

export const BottleContainer = styled.div`
  color: ${({theme}) => theme.color.primary.bgPink};
  align-items: center;
  justify-content: center;
  font-size: 96px;
  font-weight: 700;
  display: inline-flex;
  gap: 10px;
`;

export const ErrorMessageContainer = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  margin-top: 20px;
`;

export const ErrorMessageTitle = styled.h5`
  color: ${({theme}) => theme.color.neutral[600]};
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  margin-bottom: 4px;
`;
export const ErrorMessage = styled.h6`
  color: ${({theme}) => theme.color.neutral[600]};
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;
