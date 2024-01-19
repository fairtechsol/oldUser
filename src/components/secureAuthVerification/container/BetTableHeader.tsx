import React, { ReactNode } from "react";
import "./style.scss";
interface props {
  bgColor?: string;
  title: string;
  padding?: string | number;
  style?: React.CSSProperties;
  customClass?: string;
  rightComponent?:ReactNode;
  customTextClass?:string;
  
}

function BetTableHeader({
  title,
  padding,
  style,
  customClass,
  rightComponent,
  customTextClass
}: props) {
  const inlineStyle: React.CSSProperties = {
    ...style,
  };
  return (
    <div
      className={`tableHeader d-flex justify-content-between f600 ${padding ? padding : "px-2"} ${customClass ?? ""}
      `}
      style={{ ...inlineStyle }}
    >
      <span className={`text-white ${customTextClass??"title-14"}`}>{title}</span>
      
      {rightComponent}
    </div>
  );
}

export default BetTableHeader;
