using MailKit.Net.Smtp;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.Services
{
    public class EmailService
    {
        public void SendEmail(string email, string password)
        {
            
            MimeMessage message = new MimeMessage();
            message.From.Add(new MailboxAddress("Scheduling", "scheduling1233@gmail.com")); //sender
            message.To.Add(new MailboxAddress("Scheduling", email)); //destination
            message.Subject = "Welcome to Scheduling"; //subject
            message.Body = new BodyBuilder() { HtmlBody = $"<div style=\"color: green;\">Password to your account {password}</div>" }.ToMessageBody(); //message body

            SmtpClient client = new SmtpClient();
            client.Connect("smtp.gmail.com", 465, true); 
            client.Authenticate("scheduling1233@gmail.com", "ismcourse123"); //sender's login and password
            client.Send(message);

            client.Disconnect(true);
            
            
        }

        public void SendRestorePasswordEmail(string email, string token)
        {

            MimeMessage message = new MimeMessage();
            message.From.Add(new MailboxAddress("Scheduling", "scheduling1233@gmail.com")); //sender
            message.To.Add(new MailboxAddress("Scheduling", email)); //destination
            message.Subject = "Restore password"; //subject
            message.Body = new BodyBuilder() { HtmlBody = $"<div>To reset your password, follow the <a href='https://localhost:44338/resetPassword/{token}'>link.</a></div>" }.ToMessageBody(); //message body

            SmtpClient client = new SmtpClient();
            client.Connect("smtp.gmail.com", 465, true);
            client.Authenticate("scheduling1233@gmail.com", "ismcourse123"); //sender's login and password
            client.Send(message);

            client.Disconnect(true);
            
        }
    }
}
