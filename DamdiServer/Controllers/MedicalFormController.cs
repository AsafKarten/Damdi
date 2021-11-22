using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DamdiServer.Models;

namespace DamdiServer.Controllers
{
    public class MedicalFormController : ApiController
    {
        //Add new mdical info donation to MedicalInfoDonation table.
        [HttpPost]
        [Route("api/post/info/medical")]
        public IHttpActionResult AddNewInfoDonation([FromBody] MedicalInfoDonation medInfo)
        {
            try
            {
                int res = Globals.MedicalInfoDAL.SetNewMedicalInfo(medInfo);
                Created(new Uri(Request.RequestUri.AbsoluteUri + medInfo), res);
                if (res == 1)
                {
                    return Ok("medical info added successfully");
                }
                return BadRequest("medical info not added");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("api/get/medical/info")]
        public IHttpActionResult GetMedicalInfoDonation([FromBody] User user)
        {
            try
            {
                MedicalInfoDonation existMedicalInfo = null;
                existMedicalInfo = Globals.MedicalInfoDAL.GetMedicalInfo(user);
                if (existMedicalInfo != null)
                    return Ok(existMedicalInfo);
                return Content(HttpStatusCode.NotFound, $"medical info of {user.Personal_id} not found in DB.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
