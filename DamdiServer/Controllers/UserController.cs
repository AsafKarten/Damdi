using DamdiServer.DAL;
using DamdiServer.Models;
using System;
using System.Net;
using System.Web.Http;

namespace DamdiServer.Controllers
{
    public class UserController : ApiController
    {
        private static UserDAL userDAL = new UserDAL();

        //Get One User
        [Route("api/user/{id}")]
        public IHttpActionResult Get(int id)
        {
            try
            {
                User U = userDAL.GetUser(id);
                if (U == null)
                    return Content(HttpStatusCode.NotFound, $"User with id = {id} was not found :(");
                return Ok(U);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
