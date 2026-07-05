const reviewEmailTemplate = (review) => {
  return {
    subject: `⭐ New Review Submitted - ${review.name}`,

    html: `
      <div style="font-family: Arial, sans-serif; background:#f8f8f8; padding:30px;">

        <div style="max-width:650px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,.1);">

          <div style="background:#C9A227; padding:20px; color:#fff;">
            <h2 style="margin:0;">⭐ New Review Submitted</h2>
            <p style="margin:5px 0 0;">
              Saroj Kashi Travels
            </p>
          </div>

          <div style="padding:25px;">

            <table style="width:100%; border-collapse:collapse;">

              <tr>
                <td style="padding:10px; font-weight:bold;">Name</td>
                <td style="padding:10px;">${review.name}</td>
              </tr>

              <tr>
                <td style="padding:10px; font-weight:bold;">City</td>
                <td style="padding:10px;">${review.city}</td>
              </tr>

              <tr>
                <td style="padding:10px; font-weight:bold;">Rating</td>
                <td style="padding:10px;">⭐ ${review.rating}/5</td>
              </tr>

              <tr>
                <td style="padding:10px; font-weight:bold; vertical-align:top;">Review</td>
                <td style="padding:10px;">${review.review}</td>
              </tr>

              <tr>
                <td style="padding:10px; font-weight:bold;">Submitted On</td>
                <td style="padding:10px;">
                  ${new Date(review.createdAt).toLocaleString()}
                </td>
              </tr>

            </table>

            <br/>

            <a
              href="${process.env.WEBSITE_URL}/admin/reviews"
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
              View Reviews
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

export default reviewEmailTemplate;