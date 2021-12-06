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

        //Add new donator to Donators table.
        [HttpPost]
        [Route("api/confirm/pos/one")]
        public IHttpActionResult AddQuestiner([FromBody] Donators donator)
        {
            try
            {
                int res = Globals.DonatorsDAL.SetNewQuestiner(donator);
                Created(new Uri(Request.RequestUri.AbsoluteUri + donator.Personal_id_worker), res);
                if (res == 1)
                {
                    return Ok("Questiner added successfully.");
                }
                return BadRequest("Questiner was not added");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("api/confirm/pos/two")]
        public IHttpActionResult AddHemoglobin([FromBody] MedicalInfoDonator med)
        {
            try
            {
                int res = Globals.DonatorsDAL.SetNewInfoHemoglobin(med);
                Created(new Uri(Request.RequestUri.AbsoluteUri + med), res);
                if (res == 1)
                {
                    return Ok("hemoglobin data added successfully.");
                }
                return BadRequest("hemoglobin was not add");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("api/confirm/pos/three")]
        public IHttpActionResult AddNewRestDataDonator([FromBody] MedicalInfoDonator med)
        {
            try
            {
                int res = Globals.DonatorsDAL.SetNewRestInfoDonator(med);
                Created(new Uri(Request.RequestUri.AbsoluteUri + med), res);
                if (res == 1)
                {
                    return Ok("hemoglobin data added successfully.");
                }
                return BadRequest("hemoglobin was not add");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("api/appointments/pos/one")]
        public IHttpActionResult GetAppointmentsPosOne()
        {
            try
            {
                List<Appointments> appointments = Globals.AppointmentsDAL.GetAppointmentsListFirstPos();
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

        [HttpGet]
        [Route("api/appointments/pos/two")]
        public IHttpActionResult GetAppointmentsPosTwo()
        {
            try
            {
                List<Appointments> appointments = Globals.AppointmentsDAL.GetAppointmentsListSecondPos();
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

        [HttpGet]
        [Route("api/appointments/pos/three")]
        public IHttpActionResult GetAppointmentsPosThree()
        {
            try
            {
                List<Appointments> appointments = Globals.AppointmentsDAL.GetAppointmentsListThirdPos();
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
