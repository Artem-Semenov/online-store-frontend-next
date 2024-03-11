"use client";
import { useEffect, useRef, useState } from "react";

export default () => {
	useEffect(() => {
		if (window.opener) {
			window.opener.postMessage({
				source: "google-login-popup",
				login: true,
			});
			window.close();
		}
	}, []);
	return <p>Please wait...</p>;
};
