import styled from 'styled-components';

import {Box, Link} from '@components/atom';
import {IconButton} from '@components/molecule';

export const SettingContainer = styled.div`
  display: flex;
  background-color: ${({theme}) => theme.color.primary.lightPink};
  padding: 18px 18px 0;
`;

export const Half = styled.div`
  padding: 20px 18px;
  background: linear-gradient(
    to bottom,
    ${({theme}) => theme.color.primary.lightPink} 50%,
    white 50%
  );
`;
export const Ol = styled.ol`
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 18px;
`;

export const Li = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const TrashIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const TrashPosition = styled.div`
  position: absolute;
  bottom: 40px;
  width: 100%;
`;

export const TrashContainer = styled.div`
  margin: 0 18px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${({theme}) => theme.color.black};
  padding: 16px 0 8px 0;
`;

export const Text = styled.h2`
  white-space: pre-line;
  font-size: 24px;
  font-weight: ${({theme}) => theme.typography.fontWeights.bold};
  line-height: 34px;
`;

export const TextContainer = styled.div`
  display: flex;
  color: ${({theme}) => theme.color.neutral[800]};
  align-items: center;
  justify-content: space-between;
  background-color: ${({theme}) => theme.color.primary.lightPink};
  padding: 40px 18px 0 18px;
`;

export const ShareLi = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: ${({theme}) => theme.color.text[700]};
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const EmailButton = styled(IconButton)`
  width: 129px;
  border-radius: 20px;
  font-size: ${({theme}) => theme.typography.fontSizes.xs}px;
  background-color: rgba(255, 255, 255, 0.3);
  color: ${({theme}) => theme.color.primary.pointPink};
`;

export const DashboardTitle = styled.strong`
  color: ${({theme}) => theme.color.primary.pointPink};
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
`;

export const Dashboard = styled(Box)`
  display: flex;
  gap: 5px;
  flex-direction: column;
  background-color: ${({theme}) => theme.color.white};
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  height: 105px;
  padding: 12px 25px 14px 25px;

  ${DashboardTitle} {
    align-self: flex-start;
  }
`;

export const DashboardSubTitle = styled.span`
  color: ${({theme}) => theme.color.neutral[400]};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
`;
