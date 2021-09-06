using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DamdiServer.Controllers
{
    public class AppointmentsController : ApiController
    {
        //Add new appointment to Appointments table.
        [HttpPost]
        [Route("api/appointment/post")]
        public IHttpActionResult AddNewDonator([FromBody] Models.Appointments app)
        {
            try
            {
                Created(new Uri(Request.RequestUri.AbsoluteUri + app.Personal_id), Globals.AppointmentsDAL.SetNewAppointment(app));
                return Ok("Appointment created successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
