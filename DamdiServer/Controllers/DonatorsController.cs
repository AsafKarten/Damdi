using DamdiServer.Models;
using System;
using System.Collections.Generic;
using System.Net;
using System.Web.Http;

namespace DamdiServer.Controllers
{
    public class DonatorsController : ApiController
    {
        [HttpPost]
        [Route("api/donator")]
        public IHttpActionResult GetUserFromDB([FromBody] Donators donator)
        {
            try
            {
                Donators checked_donator = null;
                checked_donator = Globals.DonatorsDAL.GetDonator(donator);
                if (checked_donator != null)
                    return Ok(checked_donator);
                return Content(HttpStatusCode.NotFound, $"User {donator.Personal_id_worker} details is incorrect");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Add new donator to Donators table.
        [HttpPost]
        [Route("api/donators/post")]
        public IHttpActionResult AddNewDonator([FromBody] Donators donator)
        {
            try
            {
                int res = Globals.DonatorsDAL.SetNewDonator(donator);
                Created(new Uri(Request.RequestUri.AbsoluteUri + donator.Personal_id_worker), res);
                if (res == 1)
                {
                    return Ok("donator user created successfully.");
                }
                return BadRequest("donator was not created");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("api/all/appointments")]
        public IHttpActionResult GetAllAppointments()
        {
            try
            {
                List<Appointments> appointments = Globals.AppointmentsDAL.GetAppointmentsList();
                Created(new Uri(Request.RequestUri.AbsoluteUri), appointments);
                if (appointments != null)
                    return Ok(appointments);
                return BadRequest("appointments not found");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }




    }
}
