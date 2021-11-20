using DamdiServer.Models;
using System;
using System.Collections.Generic;
using System.Net;
using System.Web.Http;

namespace DamdiServer.Controllers
{
    public class StationsController : ApiController
    {
        //Add new station to station table.
        [HttpPost]
        [Route("api/station/post")]
        public IHttpActionResult AddNewStation([FromBody] Stations station)
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

        [HttpGet]
        [Route("api/all/stations")]
        public IHttpActionResult GetAllStations()
        {
            try
            {
                List<Stations> Stations = Globals.StationsDAL.GetStationList();
                Created(new Uri(Request.RequestUri.AbsoluteUri), Stations);
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

        [HttpPost]
        [Route("api/search/stations/city")]
        public IHttpActionResult GetStationsByCity(Stations s)
        {
            try
            {
                List<Stations> stations = Globals.StationsDAL.GetStationsByCity(s);
                if (stations != null)
                {
                    return Ok(stations);
                }
                return Content(HttpStatusCode.NotFound, "Stations not found");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("api/search/stations/code")]
        public IHttpActionResult GetStationsByCode(Stations s)
        {
            try
            {
                Stations station = null;
                station = Globals.StationsDAL.getStationCode(s);
                if (station != null)
                    return Ok(station);
                return Content(HttpStatusCode.NotFound, "Station name not found");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
