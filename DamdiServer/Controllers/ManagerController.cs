using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;

namespace DamdiServer.Controllers
{
    public class ManagerController : ApiController
    {
        //Get manager from managers table.
        [HttpPost]
        [Route("api/manager")]
        public IHttpActionResult GetManagerFromDB([FromBody] Models.Manager m)
        {
            try
            {
                m = Globals.ManagerDAL.GetManager(m.Personal_id, m.Salted_hash);
                if (m == null)
                    return Content(HttpStatusCode.NotFound, $"Manager {m.Personal_id} or pass is incorrect");
                return Ok(m);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
