using DamdiServer.Models;
using System;
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
                Created(new Uri(Request.RequestUri.AbsoluteUri + donator.Personal_id_worker), Globals.DonatorsDAL.SetNewDonator(donator));
                return Ok("Donator user created successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}
