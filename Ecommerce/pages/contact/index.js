import HeadData from '~/components/Head';
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';
import Breadcrumb from '~/components/shopList/breadcrumb/Breadcrumb';
import ContactArea from '~/components/contact/ContactArea';
import ContactMapForm from '~/components/contact/ContactMapForm';

const Error500 = dynamic(() => import('~/components/error/500'));

const Contact = ({ data, error }) => {
  const { t } = useTranslation();
  return (
    <>
      {error ? (
        <Error500 />
      ) : (
        <>
          <HeadData title="Contact Us" />

          {/* breadcrumb-area-start */}
          <Breadcrumb title="Contact Us" />
          {/* breadcrumb-area-end */}

          {/* contact area start */}
          <ContactArea />
          {/* contact area end */}

          {/* contact map form start */}
          <ContactMapForm />
          {/* contact map form end */}
        </>
      )}
    </>
  );
};

export default Contact;
