// emailTemplates/verificationEmailTemplate.js
function resetPasswordEmailTemplate(userEmail, verificationLink) {
    return `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="https://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification Template</title>
          <style type="text/css">
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');
            body {
              margin: 0;
              padding: 0;
              background-color: rgb(231, 231, 231);
              font-family: 'Montserrat', sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
            }
            table {
              border-spacing: 0;
            }
            td {
              padding: 0;
            }
            img {
              border: 0;
            }
            .container {
              width: 100%;
              height: 100%;
              background-color: rgb(231, 231, 231);
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
            .container__child {
              width: 70%;
              margin: auto;
            }
            .table__top__cover {
              box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
              margin: 0 auto;
              width: 100%;
              max-width: 545px;
              /* height: 40px; */
              padding-top: 25px;
              padding-bottom: 25px;
              border-spacing: 0;
              background-color: gray;
            }
            .table__bottom__cover {
              box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
              margin: 0 auto;
              width: 100%;
              max-width: 545px;
              /* height: 40px; */
              padding-top: 25px;
              padding-bottom: 25px;
              padding-left: 100px;
              padding-right: 100px;
              border-spacing: 0;
              background-color: #e3e3e3;
            }
            .table__bottom__text{
              font-size: 14px;
            }
            .table__cover {
              box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
              margin: 0 auto;
              padding: 0 48px;
              width: 100%;
              max-width: 545px;
              border-spacing: 0;
              background-color: #fff;
              padding-top: 50px;
            }
            .table__parent__container {
              display: flex;
              justify-content: space-between;
              padding: 40px 0;
            }
            .table__child__container {
              max-width: 200px;
            }
            .right {
              max-width: 230px;
              text-align: right;
              font-size: 14px;
            }
            .link__button {
              background-color: #27BF5D;
              color: #fff;
              /* padding-left: 10px;
              padding-right: 10px;
              padding-bottom: 3px;
              padding-top: 3px; */
              padding: 15px;
              border-radius: 2px;
              margin-top: 30px;
              
            }
            @media screen and (max-width: 600px) {
              .table__parent__container {
                flex-direction: column;
                align-items: center;
              }
              .table__child__container, .right {
                max-width: 100%;
                text-align: center;
              }
            }
            .tooltip {
              position: relative;
              display: inline-block;
            }
            .tooltip .tooltiptext {
              visibility: hidden;
              width: 140px;
              background-color: #555;
              color: #fff;
              text-align: center;
              border-radius: 6px;
              padding: 5px;
              position: absolute;
              z-index: 1;
              bottom: 150%;
              left: 50%;
              margin-left: -75px;
              opacity: 0;
              transition: opacity 0.3s;
            }
            .tooltip .tooltiptext::after {
              content: "";
              position: absolute;
              top: 100%;
              left: 50%;
              margin-left: -5px;
              border-width: 5px;
              border-style: solid;
              border-color: #555 transparent transparent transparent;
            }
            .tooltip:hover .tooltiptext {
              visibility: visible;
              opacity: 1;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="container__child" >
              <table class="table__top__cover">
                <tr style="" >
                  <td style="text-align:center;">
                    <h4 style="color: #fff; text-transform: capitalize;">confirm your email</h4>
                  </td>
                </tr>
              </table>
              <table class="table__cover" width="100%">
                <tr>
                  <td>
                    <table width="100%">
                      <tr>
                        <td style="text-align:center;">
                          <!-- Add your logo here -->
                          <!-- <a href="#"><img src="img/logo-dowel.png" alt="Logo"></a> -->
                        </td>
                      </tr>
                      <tr>
                        <td style="text-align:center; border-radius: 100%;">
                          <img src="https://res.cloudinary.com/dhmvn4nnf/image/upload/v1721287832/mail-icon_yucf1z.png" alt="Mail Icon" height="80" width="80" class="img-thumbnail mb-2">
                        </td>
                      </tr>
                      <tr>
                        <td class="table__parent__container">
                          <table class="table__child__container">
                            <tr>
                              <td class="padding">
                                <!-- Left content here -->
                              </td>
                            </tr>
                          </table>
                          <table class="table__child__container right">
                            <tr>
                              <td class="padding">
                                <!-- Right content here -->
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="text-align:center;">
                          <h3 style="">You're one click away!</h3>
                          <p>Hi ${userEmail}! Kindly click on the link below to create your new password</p>
                          <p class="link__button">
                            <b>
                              <a href="${verificationLink}" target="_blank" style="text-decoration: none; color: #fff;">Verify Email</a>
                            </b>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="text-align:center;">
                          <h4>ResumeLink Team.</h4>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table class="table__bottom__cover">
                <tr style="" >
                  <td style="text-align:center;">
                    <p class="table__bottom__text">Copyright © 2024 ResumeLink.</p>
                    <p class="table__bottom__text">You are recieving this email because you opted in via our website.</p>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </body>
        </html>
    `;
  };


  module.exports = { resetPasswordEmailTemplate }
  