import {useState} from 'react';
import {useTheme} from 'styled-components';

type SwitchProps = {
  onClick: () => void;
};

const Switch = (props: SwitchProps) => {
  const {onClick: onClickProps} = props;
  const [on, setOn] = useState(false);
  const theme = useTheme();
  const onClick = () => {
    setOn(pre => !pre);
    onClickProps();
  };

  const fill = on ? theme.color.primary.bgPink : theme.color.neutral[400];
  const transform = `translateX(${on ? '20px' : '0'})`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="51"
      height="31"
      viewBox="0 0 51 31"
      fill="none"
      onClick={onClick}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.857 0.0921522C17.597 -0.0078478 19.335 0.0001522 21.075 0.0001522C21.087 0.0001522 29.892 0.0001522 29.892 0.0001522C31.666 0.0001522 33.404 -0.0078478 35.143 0.0921522C36.724 0.182152 38.264 0.374152 39.797 0.803152C43.024 1.70515 45.842 3.58915 47.879 6.26015C49.904 8.91415 51 12.1632 51 15.4992C51 18.8392 49.904 22.0862 47.879 24.7402C45.842 27.4102 43.024 29.2952 39.797 30.1972C38.264 30.6262 36.724 30.8172 35.143 30.9082C33.404 31.0082 31.666 30.9992 29.926 30.9992C29.914 30.9992 21.107 31.0002 21.107 31.0002C19.335 30.9992 17.597 31.0082 15.857 30.9082C14.277 30.8172 12.737 30.6262 11.204 30.1972C7.977 29.2952 5.159 27.4102 3.122 24.7402C1.097 22.0862 0 18.8392 0 15.5002C0 12.1632 1.097 8.91415 3.122 6.26015C5.159 3.58915 7.977 1.70515 11.204 0.803152C12.737 0.374152 14.277 0.182152 15.857 0.0921522Z"
        fill={fill}
        fillOpacity="0.32"
      />
      <mask
        id="mask0_303_1402"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="51"
        height="31">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.857 0.0921522C17.597 -0.0078478 19.335 0.0001522 21.075 0.0001522C21.087 0.0001522 29.892 0.0001522 29.892 0.0001522C31.666 0.0001522 33.404 -0.0078478 35.143 0.0921522C36.724 0.182152 38.264 0.374152 39.797 0.803152C43.024 1.70515 45.842 3.58915 47.879 6.26015C49.904 8.91415 51 12.1632 51 15.4992C51 18.8392 49.904 22.0862 47.879 24.7402C45.842 27.4102 43.024 29.2952 39.797 30.1972C38.264 30.6262 36.724 30.8172 35.143 30.9082C33.404 31.0082 31.666 30.9992 29.926 30.9992C29.914 30.9992 21.107 31.0002 21.107 31.0002C19.335 30.9992 17.597 31.0082 15.857 30.9082C14.277 30.8172 12.737 30.6262 11.204 30.1972C7.977 29.2952 5.159 27.4102 3.122 24.7402C1.097 22.0862 0 18.8392 0 15.5002C0 12.1632 1.097 8.91415 3.122 6.26015C5.159 3.58915 7.977 1.70515 11.204 0.803152C12.737 0.374152 14.277 0.182152 15.857 0.0921522Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_303_1402)">
        <g
          filter="url(#filter0_dd_303_1402)"
          style={{
            transform,
            transition: 'transform 0.3s ease-in-out',
          }}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.5 29C22.9558 29 29 22.9558 29 15.5C29 8.04416 22.9558 2 15.5 2C8.04416 2 2 8.04416 2 15.5C2 22.9558 8.04416 29 15.5 29Z"
            fill="white"
          />
          <path
            d="M15.5 29.25C23.0939 29.25 29.25 23.0939 29.25 15.5C29.25 7.90609 23.0939 1.75 15.5 1.75C7.90609 1.75 1.75 7.90609 1.75 15.5C1.75 23.0939 7.90609 29.25 15.5 29.25Z"
            stroke="black"
            strokeOpacity="0.04"
            strokeWidth="0.5"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_dd_303_1402"
          x="-6.5"
          y="-3.5"
          width="44"
          height="44"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="0.5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_303_1402"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="4" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_303_1402"
            result="effect2_dropShadow_303_1402"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_303_1402"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Switch;
