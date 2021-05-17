using System;
using System.Collections.Generic;
using System.Net;
using System.Web.Http;

namespace DamdiServer.Controllers
{
    public class MedicalDonorInfoController : ApiController
    {
        //Get Medical User info from MedicalInfoDonation table.
        [HttpPost]
        [Route("api/medical/info")]
        public IHttpActionResult GetMedicalInfo([FromBody] Models.MedicalInfoDonation mid)
        {
            try
            {
                List<Models.MedicalInfoDonation>  medicalForm = Globals.UserDAL.GetMedicalInfo(mid.Personal_id);
                if (medicalForm == null)
                    return Content(HttpStatusCode.NotFound, $"User info {mid.Personal_id} was not found");
                return Ok(medicalForm);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
