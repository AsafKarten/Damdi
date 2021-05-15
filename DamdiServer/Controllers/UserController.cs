using System;
using System.Net;
using System.Web.Http;

namespace DamdiServer.Controllers
{
    public class UserController : ApiController
    {
        //Get One User from users table.
        [HttpPost]
        [Route("api/user")]
        public IHttpActionResult GetUserFromDB([FromBody] Models.User u)
        {
            try
            {
                u = Globals.UserDAL.GetUser(u.Personal_id, u.Pass);
                if (u == null)
                    return Content(HttpStatusCode.NotFound, $"User {u.Personal_id} or pass is incorrect");
                return Ok(u);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Add new user to users table.
        [HttpPost]
        [Route("api/user/post")]
        public IHttpActionResult AddNewUser([FromBody] Models.User user)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid data.");
                }
                Created(new Uri(Request.RequestUri.AbsoluteUri + user.Personal_id), Globals.UserDAL.SetNewUser(user));
                return Ok("User created successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Get User info from users table.
        [HttpPost]
        [Route("api/user/info")]
        public IHttpActionResult GetUserInfoFromDB([FromBody] Models.UserInfo ui)
        {
            try
            {
                ui = Globals.UserDAL.GetUserInfo(ui.Personal_id);
                if (ui == null)
                    return Content(HttpStatusCode.NotFound, $"User info {ui.Personal_id} was not found");
                return Ok(ui);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

