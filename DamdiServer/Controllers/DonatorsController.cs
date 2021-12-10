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
        public IHttpActionResult GetDonatorFromDB([FromBody] Donators donator)
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

        [HttpGet]
        [Route("api/all/donators")]
        public IHttpActionResult GetAllDonatorsFromDB()
        {
            try
            {
                List<Donators> donators = Globals.DonatorsDAL.GetDonatorsList();
                Created(new Uri(Request.RequestUri.AbsoluteUri), donators);
                if (donators != null)
                    return Ok(donators);
                return BadRequest("donators not found");
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
        public IHttpActionResult ConfirmUnit1([FromBody] Donators donator)
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
        public IHttpActionResult ConfirmUnit2([FromBody] MedicalInfoDonator med)
        {
            try
            {
                int res = Globals.DonatorsDAL.SetNewInfoHemoglobin(med);
                Created(new Uri(Request.RequestUri.AbsoluteUri + med), res);
                if (res == 1)
                {
                    return Ok("data added successfully.");
                }
                return BadRequest("data was not added successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("api/confirm/pos/three")]
        public IHttpActionResult ConfirmUnit3([FromBody] MedicalInfoDonator med)
        {
            try
            {
                int res = Globals.DonatorsDAL.SetNewRestInfoDonator(med);
                Created(new Uri(Request.RequestUri.AbsoluteUri + med), res);
                if (res == 1)
                {
                    return Ok("data added successfully.");
                }
                return BadRequest("data was not added successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("api/appointments/unit/one/{stationCode}")]
        public IHttpActionResult GetAppointmentsPosOne([FromUri] int stationCode)
        {
            try
            {
                List<Appointments> appointments = Globals.AppointmentsDAL.GetAppointmentsListFirstPos(stationCode);
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
        [Route("api/appointments/unit/two/${stationCode}")]
        public IHttpActionResult GetAppointmentsPosTwo([FromUri] int stationCode)
        {
            try
            {
                List<Appointments> appointments = Globals.AppointmentsDAL.GetAppointmentsListSecondPos(stationCode);
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
        [Route("api/appointments/unit/three/${stationCode}")]
        public IHttpActionResult GetAppointmentsPosThree([FromUri] int stationCode)
        {
            try
            {
                List<Appointments> appointments = Globals.AppointmentsDAL.GetAppointmentsListThirdPos(stationCode);
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
