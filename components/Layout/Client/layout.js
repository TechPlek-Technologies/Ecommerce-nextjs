import { useEffect, useState } from "react";
import ScrollToTop from "~/components/ScrollToTop";
import data from "~/data.json";
import useWindowDimensions from "~/lib/useWindowDimensions";
// import Footer from "./footer";
import c from "./layout.module.css";
import MobileNav from "./mobileNavbar";
import NavBar from "./navbar";
import FooterMobile from "./mobileFooterNav";
import Header from "~/components/navbar/Header";
import Footer from "~/components/footer/Footer";

const ClientLayout = (props) => {
  const footerVisibility =
    typeof props.footer == "undefined" ? true : props.footer;
  const [mobileNav, setMobileNav] = useState(false);
  const dimension = useWindowDimensions();
  useEffect(() => {
    if (dimension.width !== 0 && dimension.width <= 991) {
      return setMobileNav(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {/* {mobileNav ? <MobileNav /> : <NavBar />} */}
      <Header/>
      <main>{props.children}</main>
      {/* <Footer visibility={footerVisibility} /> */}
      <Footer/>
      <ScrollToTop />
      {mobileNav && <FooterMobile />}
    </>
  );
};

export default ClientLayout;
