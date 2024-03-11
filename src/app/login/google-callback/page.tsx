"use client";
import { useEffect } from "react";

export default () => {
	useEffect(() => {
		if (window.opener && !window.messagePosted) {
			window.messagePosted = true;
			window.opener.postMessage({
				source: "google-login-popup",
				login: true,
			});
			window.close();
		}
	}, []);
	return <p>Please wait...</p>;
};
