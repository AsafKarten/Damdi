using DamdiServer.DAL;
using DamdiServer.Models;
using System;
using System.Net;
using System.Web.Http;

namespace DamdiServer.Controllers
{
    public class UserController : ApiController
    {
        UserDAL userDAL = new UserDAL();
        //Get One User

        [HttpPost]
        [Route("api/user")]
        public IHttpActionResult Post([FromBody] User u)
        {
            try
            {
                u = userDAL.GetUser(u.GetPersonalId(), u.GetPass());
                if (u == null)
                    return Content(HttpStatusCode.NotFound, $"User {u.GetPersonalId()} or pass is incorrect");
                return Ok(u);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        //[HttpPost]
        //[Route("api/user/post")]
        //public IHttpActionResult AddUser([FromBody] User user)
        //{
        //    try
        //    {
        //        return Created(new Uri(Request.RequestUri.AbsoluteUri + user.GetPersonalId()),userDAL.SetNewUser(user));
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}
    }
}
