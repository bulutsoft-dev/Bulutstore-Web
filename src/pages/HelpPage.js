import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PolicyIcon from '@mui/icons-material/Policy';
import ReplayIcon from '@mui/icons-material/Replay';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AppBreadcrumbs from '../components/common/Breadcrumbs';

const faqs = [
  {
    question: 'Uygulama indirmek için üyelik gerekli mi?',
    answer: 'Evet, uygulama indirmek ve kullanmak için ücretsiz bir üyelik oluşturmanız gerekmektedir.'
  },
  {
    question: 'Satın aldığım uygulamayı nasıl iade edebilirim?',
    answer: 'Satın alma işleminizden sonraki 14 gün içinde destek ekibimize ulaşarak iade talebinde bulunabilirsiniz.'
  },
  {
    question: 'Kişisel bilgilerim güvende mi?',
    answer: 'Evet, tüm kullanıcı bilgileriniz gizli tutulur ve üçüncü şahıslarla paylaşılmaz.'
  },
  {
    question: 'Destek ekibine nasıl ulaşabilirim?',
    answer: 'bulutsoftdev@gmail.com adresine e-posta gönderebilir veya iletişim formumuzu kullanabilirsiniz.'
  }
];

const HelpPage = () => (
  <Container maxWidth="md" sx={{ py: 6 }}>
    <AppBreadcrumbs extraLabels={[null, 'Yardım']} />
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
      <HelpOutlineIcon sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
      <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Yardım & Bilgilendirme
      </Typography>
    </Box>
    {/* FAQ Section */}
    <Box sx={{ mb: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center' }}>
        <HelpOutlineIcon sx={{ color: '#1976d2', mr: 1 }} /> Sıkça Sorulan Sorular
      </Typography>
      {faqs.map((faq, idx) => (
        <Accordion key={idx} sx={{ mb: 1, borderRadius: 2, boxShadow: 0, border: '1px solid #e0e0e0' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 500 }}>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
    {/* Customer Service Section */}
    <Box sx={{ mb: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center' }}>
        <EmailIcon sx={{ color: '#1976d2', mr: 1 }} /> Müşteri Hizmetleri
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Destek ekibimize ulaşmak için aşağıdaki butonu kullanabilir veya <b>bulutsoftdev@gmail.com</b> adresine e-posta gönderebilirsiniz. Size en kısa sürede yardımcı olacağız.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<EmailIcon />}
        href="mailto:bulutsoftdev@gmail.com"
        sx={{ borderRadius: 3 }}
      >
        E-posta Gönder
      </Button>
    </Box>
    {/* Refund Policy Section */}
    <Box sx={{ mb: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center' }}>
        <ReplayIcon sx={{ color: '#1976d2', mr: 1 }} /> İade Politikası
      </Typography>
      <Typography variant="body1">
        Satın aldığınız uygulamalarda bir sorun yaşarsanız, iade taleplerinizi <b>14 gün</b> içinde iletebilirsiniz. Detaylı bilgi ve iade süreci için destek ekibimizle iletişime geçin.
      </Typography>
    </Box>
    {/* Privacy Policy Section */}
    <Box sx={{ mb: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center' }}>
        <PolicyIcon sx={{ color: '#1976d2', mr: 1 }} /> Gizlilik Politikası
      </Typography>
      <Typography variant="body1">
        Kullanıcı bilgileriniz gizli tutulur ve üçüncü şahıslarla paylaşılmaz. Detaylı gizlilik politikamız için bu sayfayı inceleyebilirsiniz. Her türlü veri güvenliği sorunuz için bize ulaşabilirsiniz.
      </Typography>
    </Box>
  </Container>
);

export default HelpPage;
