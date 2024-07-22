import React from "react";
import Sidenav from "./navbar";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Sidenav />
      <div className="pl-[76px] pb-8 ">{children}</div>
    </div>
  );
}
