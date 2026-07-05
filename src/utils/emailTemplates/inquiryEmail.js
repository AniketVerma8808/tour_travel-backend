const inquiryEmailTemplate = (inquiry) => {
  return {
    subject: `📩 New Inquiry - ${inquiry.name}`,

    html: `
      <div style="font-family: Arial, sans-serif; background:#f8f8f8; padding:30px;">

        <div style="max-width:650px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,.1);">

          <div style="background:#C9A227; padding:20px; color:#fff;">
            <h2 style="margin:0;">📩 New Inquiry Received</h2>
            <p style="margin:5px 0 0;">
              Saroj Kashi Travels
            </p>
          </div>

          <div style="padding:25px;">

            <table style="width:100%; border-collapse:collapse;">

              <tr>
                <td style="padding:10px; font-weight:bold;">Name</td>
                <td style="padding:10px;">${inquiry.name}</td>
              </tr>

              <tr>
                <td style="padding:10px; font-weight:bold;">Phone</td>
                <td style="padding:10px;">${inquiry.phone}</td>
              </tr>

              <tr>
                <td style="padding:10px; font-weight:bold;">Email</td>
                <td style="padding:10px;">
                  ${inquiry.email || "-"}
                </td>
              </tr>

              <tr>
                <td style="padding:10px; font-weight:bold;">Message</td>
                <td style="padding:10px;">
                  ${inquiry.message || "-"}
                </td>
              </tr>

              <tr>
                <td style="padding:10px; font-weight:bold;">Submitted On</td>
                <td style="padding:10px;">
                  ${new Date(inquiry.createdAt).toLocaleString()}
                </td>
              </tr>

            </table>

            <br/>

            <a
              href="${process.env.WEBSITE_URL}/admin/inquiries"
              style="
                display:inline-block;
                background:#C9A227;
                color:#fff;
                text-decoration:none;
                padding:12px 24px;
                border-radius:6px;
                font-weight:bold;
              "
            >
              View Inquiry
            </a>

          </div>

          <div
            style="
              background:#f4f4f4;
              padding:15px;
              text-align:center;
              color:#777;
              font-size:13px;
            "
          >
            © ${new Date().getFullYear()} ${process.env.WEBSITE_NAME}
            <br/>
            ${process.env.WEBSITE_URL}
          </div>

        </div>

      </div>
    `,
  };
};

export default inquiryEmailTemplate;