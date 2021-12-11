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

        [HttpPost]
        [Route("api/data/unit/one")]
        public IHttpActionResult SetDonorDataUnitOne([FromBody] MedicalInfoDonator donator)
        {
            try
            {
                int res = Globals.DonatorsDAL.SetDataConfirmOne(donator);
                Created(new Uri(Request.RequestUri.AbsoluteUri + donator), res);
                if (res == 1)
                {
                    return Ok("data unit one added successfully.");
                }
                return BadRequest("data unit one was not added");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("api/confirm/unit/one")]
        public IHttpActionResult ConfirmUnitOne([FromBody] Appointments app)
        {
            try
            {
                int res = Globals.DonatorsDAL.SetConfirmOneTrue(app);
                Created(new Uri(Request.RequestUri.AbsoluteUri + app.Personal_id), res);
                if (res == 1)
                {
                    return Ok("unit one confirm successfully.");
                }
                return BadRequest("unit one confirm was not added");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("api/data/unit/two")]
        public IHttpActionResult SetDonorDataUnitTwo([FromBody] MedicalInfoDonator med)
        {
            try
            {
                int res = Globals.DonatorsDAL.SetDataConfirmTwo(med);
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
        [Route("api/confirm/unit/two")]
        public IHttpActionResult ConfirmUnitTwo([FromBody] Appointments app)
        {
            try
            {
                int res = Globals.DonatorsDAL.SetConfirmTwoTrue(app);
                Created(new Uri(Request.RequestUri.AbsoluteUri + app.Personal_id), res);
                if (res == 1)
                {
                    return Ok("unit two confirm successfully.");
                }
                return BadRequest("unit two confirm was not added");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("api/data/unit/three")]
        public IHttpActionResult SetDonorDataUnitThree([FromBody] MedicalInfoDonator med)
        {
            try
            {
                int res = Globals.DonatorsDAL.SetDataConfirmThree(med);
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
        [Route("api/confirm/unit/three")]
        public IHttpActionResult ConfirmUnitThree([FromBody] Appointments app)
        {
            try
            {
                int res = Globals.DonatorsDAL.SetConfirmThreeTrue(app);
                Created(new Uri(Request.RequestUri.AbsoluteUri + app.Personal_id), res);
                if (res == 1)
                {
                    return Ok("unit three confirm successfully.");
                }
                return BadRequest("unit three confirm was not added");
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
