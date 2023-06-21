import emailjs from 'emailjs-com';

export async function sendEmailNotification() {
    const templateParams = {
      to_email: 'scewarehouse01@gmail.com',
      subject: 'New Reservation Notification',
      body: 'A new reservation has been made on your site. Click the link to view details: http://localhost:3000/Confirmation',
    };
  
    try {
      const response = await emailjs.send(
        'service_n0fn62v',
        'template_gm2u9sn',
        templateParams,
        '9ABZeedZEMB4Gg5ad'
      );
  
      if (response && response.text) {
        console.log('Email sent successfully:', response.text);
      } else {
        console.error('Error sending email: Invalid response');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
  