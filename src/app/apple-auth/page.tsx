"use client";

import { useEffect } from "react";

export default function AppleCallback() {
  useEffect(() => {
    // Optional: close popup immediately
    if (window.opener) {
      window.close();
    }
  }, []);

  return <div>Signing you in with Apple…</div>;
}
