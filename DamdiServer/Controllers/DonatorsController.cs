using System;
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
    }
}
