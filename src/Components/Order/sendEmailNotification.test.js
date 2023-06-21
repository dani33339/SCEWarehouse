import emailjs from 'emailjs-com';
import { sendEmailNotification } from './sendEmailNotification';

jest.mock('emailjs-com', () => {
  return {
    send: jest.fn().mockResolvedValue({ text: 'Email sent successfully' }),
  };
});

describe('sendEmailNotification', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mock function calls before each test
  });

  it('should send an email notification successfully', async () => {
    console.log = jest.fn(); // Mock console.log
  
    await sendEmailNotification();
    expect(emailjs.send).toHaveBeenCalledWith(
      'service_n0fn62v',
      'template_gm2u9sn',
      {
        to_email: 'scewarehouse01@gmail.com',
        subject: 'New Reservation Notification',
        body: 'A new reservation has been made on your site. Click the link to view details: http://localhost:3000/Confirmation',
      },
      '9ABZeedZEMB4Gg5ad'
    );
});
  
  it('should handle error when sending email fails', async () => {
    console.error = jest.fn(); // Mock console.error
    emailjs.send.mockRejectedValueOnce(new Error('Email sending failed'));

    await sendEmailNotification();

    expect(emailjs.send).toHaveBeenCalledWith(
      'service_n0fn62v',
      'template_gm2u9sn',
      {
        to_email: 'scewarehouse01@gmail.com',
        subject: 'New Reservation Notification',
        body: 'A new reservation has been made on your site. Click the link to view details: http://localhost:3000/Confirmation',
      },
      '9ABZeedZEMB4Gg5ad'
    );
    expect(console.error).toHaveBeenCalledWith('Error sending email:', new Error('Email sending failed'));
  });
});
