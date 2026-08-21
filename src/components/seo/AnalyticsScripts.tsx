import Script from "next/script";
import { siteConfig } from "@/config/site";

/**
 * Loads GA4 / GTM only when the relevant IDs are set via environment
 * variables. Nothing fires until NEXT_PUBLIC_GA4_ID or NEXT_PUBLIC_GTM_ID
 * is configured — see .env.example. Meta Pixel is prepared the same way
 * but intentionally not wired up until NEXT_PUBLIC_META_PIXEL_ID is set.
 */
export function AnalyticsScripts() {
  const { ga4Id, gtmId } = siteConfig.analytics;

  return (
    <>
      {gtmId && (
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `}
        </Script>
      )}
      {!gtmId && ga4Id && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga4Id}');
            `}
          </Script>
        </>
      )}
    </>
  );
}
