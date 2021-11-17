using DamdiServer.Models;
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
        public IHttpActionResult AddNewAppointment([FromBody] Appointments app)
        {
            try
            {
                int res = Globals.AppointmentsDAL.SetNewAppointment(app);
                Created(new Uri(Request.RequestUri.AbsoluteUri + app.Personal_id), res);
                if (res == 1)
                {
                    return Ok("Appointment created successfully.");
                }
                throw new Exception("Appointment not add");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
