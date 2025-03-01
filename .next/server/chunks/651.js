exports.id=651,exports.ids=[651],exports.modules={60651:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>ThirdPartyScript});var a=n(20997),s=n(6022),r=n(11163),o=n(4298),i=n.n(o),g=n(16689);let fpixel=function({id:e}){let t=(0,r.useRouter)(),pageView=()=>{window.fbq("track","PageView")};return((0,g.useEffect)(()=>{pageView();let handleRouteChange=()=>{pageView()};return t.events.on("routeChangeComplete",handleRouteChange),()=>{t.events.off("routeChangeComplete",handleRouteChange)}},[t.events]),e)?a.jsx(a.Fragment,{children:a.jsx(i(),{id:"FacebookPixelScript",strategy:"afterInteractive",dangerouslySetInnerHTML:{__html:`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${e});
          `}})}):null},gtag=({id:e})=>{let t=(0,r.useRouter)(),pageView=t=>{window.gtag("config",e,{page_path:t})};return((0,g.useEffect)(()=>{let handleRouteChange=e=>{pageView(e)};return t.events.on("routeChangeComplete",handleRouteChange),()=>{t.events.off("routeChangeComplete",handleRouteChange)}},[t.events]),e)?(0,a.jsxs)(a.Fragment,{children:[a.jsx(i(),{strategy:"afterInteractive",src:`https://www.googletagmanager.com/gtag/js?id=${e}`}),a.jsx(i(),{id:"gtag-init",strategy:"afterInteractive",dangerouslySetInnerHTML:{__html:`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${e}', {
              page_path: window.location.pathname,
            });
          `}})]}):null},messenger=function(e){return(0,a.jsxs)(a.Fragment,{children:[a.jsx("div",{id:"fb-root"}),a.jsx(i(),{id:"fb-custom-chat",strategy:"lazyOnload",dangerouslySetInnerHTML:{__html:`window.fbAsyncInit = function () {
        FB.init({
          xfbml: true,
          version: 'v13.0'
        });
      };

      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));`}}),a.jsx("div",{className:"fb-customerchat",attribution:"setup_tool",page_id:e.pageId})]})};function ThirdPartyScript(){let e=(0,s.useSelector)(e=>e.settings),t=e.settingsData.script.googleAnalyticsId,n=e.settingsData.script.facebookPixelId,r=e.settingsData.script.messengerPageId;return(0,a.jsxs)(a.Fragment,{children:[t&&a.jsx(gtag,{id:t}),n&&a.jsx(fpixel,{id:n}),r&&a.jsx(messenger,{pageId:r})]})}},4298:(e,t,n)=>{e.exports=n(85354)}};