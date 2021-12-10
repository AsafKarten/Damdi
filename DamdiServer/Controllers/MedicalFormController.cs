using System;
using System.Net;
using System.Web.Http;
using DamdiServer.Models;

namespace DamdiServer.Controllers
{
    public class MedicalFormController : ApiController
    {
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

        //Add new mdical info donation to MedicalInfoDonation table.
        [HttpPost]
        [Route("api/add/valid_form")]
        public IHttpActionResult AddNewValidForm([FromBody] ValidForm validForm)
        {
            try
            {
                int res = Globals.ValidFormDAL.SetNewValidForm(validForm);
                Created(new Uri(Request.RequestUri.AbsoluteUri + validForm), res);
                if (res == 1)
                {
                    return Ok("form send successfully");
                }
                return BadRequest("valid form info not added");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("api/get/valid/info")]
        public IHttpActionResult GetValidlFormInfo([FromBody] User user)
        {
            try
            {
                ValidForm existValidFormInfo = null;
                existValidFormInfo = Globals.ValidFormDAL.GetValidForm(user);
                if (existValidFormInfo != null)
                    return Ok(existValidFormInfo);
                return Content(HttpStatusCode.NotFound, $"valid info of {user.Personal_id} not found in DB.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
