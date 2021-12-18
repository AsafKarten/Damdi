using DamdiServer.Models;
using System;
using System.Net;
using System.Web.Http;

namespace DamdiServer.Controllers
{
    public class DonationController : ApiController
    {

        [HttpPost]
        [Route("api/last/donation/date")]
        public IHttpActionResult GetLastDonationDate([FromBody] User user)
        {
            try
            {
                Donations donation_info = null;
                donation_info = Globals.DonationDAL.GetLastDonationDateDB(user.Personal_id);
                if (donation_info != null)
                    return Ok(donation_info);
                return Content(HttpStatusCode.NotFound, $"Donation info of {user.Personal_id} not exist");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("api/number/donation")]
        public IHttpActionResult getNumberOfDonationsPerYear()
        {
            try
            {
                Donations total = Globals.DonationDAL.GetLastDonationsNumber();
                Created(new Uri(Request.RequestUri.AbsoluteUri), total);
                if (total != null)
                    return Ok(total);
                return BadRequest("no donations");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
