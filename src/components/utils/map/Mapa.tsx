"use client";

import dynamic from "next/dynamic";

export const MapSelector = dynamic(() => import("./MapSelector"), {
  ssr: false,
});