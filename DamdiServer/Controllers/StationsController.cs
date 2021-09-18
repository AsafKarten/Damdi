using DamdiServer.Models;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace DamdiServer.Controllers
{
    public class StationsController : ApiController
    {
        //Add new station to station table.
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

        [HttpPost]
        [Route("api/search/stations")]
        public IHttpActionResult GetProfileFeed([FromBody] Stations s)
        {
            try
            {
                List<Stations> Stations = Globals.StationsDAL.GetStations(s.City, s.Start_time);
                Created(new Uri(Request.RequestUri.AbsoluteUri + s), Stations);
                if (Stations != null)
                {
                    return Ok(Stations);
                }
                throw new Exception("Staions not found");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
