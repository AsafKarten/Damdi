using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DamdiServer.Controllers
{
    public class StationsController : ApiController
    {
        //Add new user to users table.
        [HttpPost]
        [Route("api/station/post")]
        public IHttpActionResult AddNewStation([FromBody] Models.Stations station)
        {
            try
            {
                Created(new Uri(Request.RequestUri.AbsoluteUri + station.Station_code), Globals.StationsDAL.SetNewStation(station));
                return Ok("User created successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
