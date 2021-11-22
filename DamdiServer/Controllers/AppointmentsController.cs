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
                return BadRequest("Appointment not added");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("api/user/app")]
        public IHttpActionResult GetAppointmentById([FromBody] User user)
        {
            try
            {
                Appointments existApp = null;
                existApp = Globals.AppointmentsDAL.GetUserAppointment(user);
                if (existApp != null)
                    return Ok(existApp);
                return Content(HttpStatusCode.NotFound, "Appintment not found");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost]
        [Route("api/del/app")]
        public IHttpActionResult DeleteAppoByPersonalId([FromBody] Appointments app)
        {
            try
            {
                int res = Globals.AppointmentsDAL.DeleteExistApp(app);
                Created(new Uri(Request.RequestUri.AbsoluteUri + app), res);
                if (res == 1)
                    return Ok("Appointment deleted successfully");
                return BadRequest("Error, Appointment not deleted.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
