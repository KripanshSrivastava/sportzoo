export interface AttributionData {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  landingPage: string;
  referrer: string;
}

const STORAGE_KEY = "elephant_attribution";

export function captureAttribution(): AttributionData {
  if (typeof window === "undefined") {
    return { utmSource: "", utmMedium: "", utmCampaign: "", landingPage: "", referrer: "" };
  }

  const params = new URLSearchParams(window.location.search);
  const hasUtm = params.has("utm_source") || params.has("utm_medium") || params.has("utm_campaign");

  if (hasUtm) {
    const fresh: AttributionData = {
      utmSource: params.get("utm_source") ?? "",
      utmMedium: params.get("utm_medium") ?? "",
      utmCampaign: params.get("utm_campaign") ?? "",
      landingPage: window.location.pathname,
      referrer: document.referrer ?? "",
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    return fresh;
  }

  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as AttributionData;
    } catch {
      // fall through
    }
  }

  const fallback: AttributionData = {
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
    landingPage: window.location.pathname,
    referrer: document.referrer ?? "",
  };
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fallback));
  return fallback;
}
