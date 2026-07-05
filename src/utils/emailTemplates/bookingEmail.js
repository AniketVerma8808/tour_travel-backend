const bookingEmailTemplate = (booking) => {
  return {
    subject: `🚖 New Booking - ${booking.bookingNumber}`,

    html: `
      <div style="font-family:Arial,sans-serif;padding:20px">

        <h2 style="color:#C9A227">
          New Booking Received
        </h2>

        <hr/>

        <table cellpadding="8">

          <tr>
            <td><b>Booking No</b></td>
            <td>${booking.bookingNumber}</td>
          </tr>

          <tr>
            <td><b>Name</b></td>
            <td>${booking.name}</td>
          </tr>

          <tr>
            <td><b>Phone</b></td>
            <td>${booking.phone}</td>
          </tr>

          <tr>
            <td><b>Email</b></td>
            <td>${booking.email || "-"}</td>
          </tr>

          <tr>
            <td><b>Pickup</b></td>
            <td>${booking.pickup}</td>
          </tr>

          <tr>
            <td><b>Drop</b></td>
            <td>${booking.drop || "-"}</td>
          </tr>

          <tr>
            <td><b>Travel Date</b></td>
            <td>${new Date(booking.travelDate).toLocaleDateString()}</td>
          </tr>

          <tr>
            <td><b>Vehicle</b></td>
            <td>${booking.vehicle}</td>
          </tr>

          <tr>
            <td><b>Package</b></td>
            <td>${booking.packageSnapshot?.title || "Custom Booking"}</td>
          </tr>

        </table>

        <br/>

        <a
          href="${process.env.WEBSITE_URL}/admin/bookings"
          style="
            background:#C9A227;
            color:white;
            padding:12px 20px;
            border-radius:6px;
            text-decoration:none;
          "
        >
          View Booking
        </a>

      </div>
    `,
  };
};

export default bookingEmailTemplate;