import { ReactElement, ReactNode } from "react";
import { PaletteKeyTypes, palette } from "../assets/styles/palette";
import styled, { css } from "styled-components";

// https://doiler.tistory.com/40
// https://summerr.tistory.com/106

interface ButtonStyle {
    $width?: string;
    $height?: string;
    $buttonColor?: PaletteKeyTypes;
    $fontColor?: PaletteKeyTypes;
    $borderRadius?: string;
    $fontSize?: string;
    $hasBorder?: boolean;
    $borderColor?: PaletteKeyTypes;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,
ButtonStyle {
    children: ReactNode;
    className?: string;
}

function Button({className, children, ...rest}:ButtonProps): ReactElement {
    return <ButtonStyled className={className} {...rest}>{children}</ButtonStyled>;
}

const ButtonStyled = styled.button<ButtonStyle>`
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  ${({
    $width = "80px",
    $height = "40px",
    $buttonColor = "white",
    $borderRadius = "30px",
    $fontColor = "white",
    $fontSize = "19px",
    $hasBorder = false,
    $borderColor = "black",
  }) => css`
    width: ${$width};
    height: ${$height};
    background-color: ${palette[$buttonColor]};
    border-radius: ${$borderRadius};
    color: ${palette[$fontColor]};
    font-size: ${$fontSize};
    border: ${$hasBorder ? `1px solid ${palette[$borderColor]}` : "none"};
    text-overflow: ellipsis;
    white-space: nowrap;
  `}

  &.postBtn {
    position: absolute;
    right: 30px;
    top: 20px;
  }

  &.unregister:active {
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
  }
  
  &.save:active {
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
  }
`;

export default Button;
