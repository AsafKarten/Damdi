using DamdiServer.Models;
using System;
using System.Net;
using System.Web.Http;

namespace DamdiServer.Controllers
{
    public class DonatorsController : ApiController
    {
        //Add new donator to Donators table.
        [HttpPost]
        [Route("api/donators/post")]
        public IHttpActionResult AddNewDonator([FromBody] Models.Donators d)
        {
            try
            {
                Created(new Uri(Request.RequestUri.AbsoluteUri + d.Personal_id_worker), Globals.DonatorsDAL.SetNewDonator(d));
                return Ok("Donator user created successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

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
                return Content(HttpStatusCode.NotFound, $"User {donator.Personal_id_worker} or pass or email is incorrect");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
