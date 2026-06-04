"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

const HEADER_OFFSET_PX = 112;

function scrollInstant(top: number) {
	window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
}

function scrollToHash(hash: string): boolean {
	const id = hash.replace(/^#/, "");
	if (!id) {
		scrollInstant(0);
		return true;
	}
	const el = document.getElementById(id);
	if (!el) return false;
	scrollInstant(el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET_PX);
	return true;
}

/** Instant scroll on route/hash change — no smooth-scroll wait. */
export function KpInstantScroll() {
	const pathname = usePathname();

	useLayoutEffect(() => {
		let retryId: ReturnType<typeof setInterval> | undefined;

		const clearRetry = () => {
			if (retryId !== undefined) {
				window.clearInterval(retryId);
				retryId = undefined;
			}
		};

		const run = () => {
			clearRetry();
			const { hash } = window.location;
			if (!hash) {
				scrollInstant(0);
				return;
			}
			if (scrollToHash(hash)) return;

			let attempts = 0;
			retryId = window.setInterval(() => {
				attempts += 1;
				if (scrollToHash(hash) || attempts >= 24) clearRetry();
			}, 50);
		};

		run();
		const raf = requestAnimationFrame(run);
		const onHashChange = () => run();
		window.addEventListener("hashchange", onHashChange);

		return () => {
			cancelAnimationFrame(raf);
			clearRetry();
			window.removeEventListener("hashchange", onHashChange);
		};
	}, [pathname]);

	return null;
}
